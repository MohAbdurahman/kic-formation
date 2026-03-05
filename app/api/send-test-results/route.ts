import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    console.log('=== API SEND-TEST-RESULTS CALLED ===');

    const body = await request.json();
    console.log('Request body:', body);

    const { firstName, email, language, level, score, totalQuestions, percentage } = body;

    // Validate required fields
    if (!firstName || !email || !language || !level) {
      console.error('Missing required fields:', { firstName, email, language, level });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not configured. Email not sent.');
      return NextResponse.json({
        success: false,
        message: 'Email service not configured'
      }, { status: 503 });
    }

    const languageLabel = language === 'francais' ? 'Français' : 'Anglais';
    console.log('Language label:', languageLabel);
    console.log('Sending email to:', email);
    console.log('From:', process.env.EMAIL_FROM || 'KIC-FORMATIONS <onboarding@resend.dev>');

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'KIC-FORMATIONS <onboarding@resend.dev>',
      to: [email],
      subject: `Résultats de votre test de niveau ${languageLabel} - KIC-FORMATIONS`,
      html: generateHTMLEmail(firstName, languageLabel, level, score, totalQuestions, percentage),
    });

    if (error) {
      console.error('Resend error:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: 'Failed to send email', details: error },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);

    // Send admin notification to KIC
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'KIC-FORMATIONS <onboarding@resend.dev>',
      to: [process.env.EMAIL_TO || 'info@kic-formations.ch'],
      replyTo: email,
      subject: `Nouveau test de niveau ${languageLabel} - ${firstName} (${level})`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #25318D 0%, #4F46E5 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .info-box { background: white; padding: 16px; border-radius: 8px; margin: 16px 0; border-left: 4px solid #25318D; }
              .label { font-weight: bold; color: #25318D; }
              .level-badge { display: inline-block; background: linear-gradient(135deg, #25318D 0%, #4F46E5 100%); color: white; padding: 6px 16px; border-radius: 16px; font-weight: bold; font-size: 16px; }
              .footer { text-align: center; margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Nouveau test de niveau passé</h1>
              <p>${languageLabel} · Niveau obtenu : <strong>${level}</strong></p>
            </div>
            <div class="content">
              <div class="info-box">
                <p><span class="label">Prénom :</span> ${firstName}</p>
                <p><span class="label">Email :</span> <a href="mailto:${email}">${email}</a></p>
                <p><span class="label">Langue testée :</span> ${languageLabel}</p>
                <p><span class="label">Niveau recommandé :</span> <span class="level-badge">${level}</span></p>
                <p><span class="label">Score :</span> ${score ?? '—'}/${totalQuestions ?? '—'} (${percentage ?? '—'}%)</p>
              </div>
              <p style="color:#6b7280; font-size:13px;">Vous pouvez répondre directement à cet email pour contacter l'étudiant(e).</p>
            </div>
            <div class="footer">
              <p>Notification automatique depuis kic-formations.ch</p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      data
    });

  } catch (error) {
    console.error('Error sending test results email:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: 'Failed to send email', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Helper function to generate HTML email (to be enhanced)
function generateHTMLEmail(
  firstName: string,
  languageLabel: string,
  level: string,
  score: number,
  totalQuestions: number,
  percentage: number
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #25318D 0%, #4F46E5 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background: #f9fafb;
            padding: 30px;
            border-radius: 0 0 8px 8px;
          }
          .result-box {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #25318D;
          }
          .level-badge {
            display: inline-block;
            background: linear-gradient(135deg, #25318D 0%, #4F46E5 100%);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 18px;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 6px;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎓 Résultats de votre test de niveau</h1>
          <p>KIC-FORMATIONS - Centre de formation à Genève</p>
        </div>

        <div class="content">
          <p>Bonjour <strong>${firstName}</strong>,</p>

          <p>Merci d'avoir passé le test de niveau en ${languageLabel} chez KIC-FORMATIONS !</p>

          <div class="result-box">
            <h2>Vos résultats :</h2>
            <p><strong>Niveau recommandé :</strong> <span class="level-badge">${level}</span></p>
            <p><strong>Score :</strong> ${score}/${totalQuestions} questions correctes (${percentage}%)</p>
          </div>

          <p>Nous vous recommandons de consulter nos formations de niveau <strong>${level}</strong> pour continuer votre apprentissage.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://www.kic-formations.ch/formations?categorie=langues" class="button">
              Découvrir nos formations
            </a>
          </div>

          <h3>📞 Besoin d'aide ou de conseils ?</h3>
          <p>Notre équipe est à votre disposition pour répondre à vos questions et vous conseiller sur la formation la plus adaptée à vos besoins.</p>

          <ul>
            <li>📧 Email : <a href="mailto:info@kic-formations.ch">info@kic-formations.ch</a></li>
            <li>📱 Téléphone : <a href="tel:+41772112323">+41 77 211 23 23</a></li>
            <li>📍 Adresse : Rue des Pâquis 11, 1201 Genève</li>
          </ul>

          <p><strong>Horaires :</strong><br>
          Lundi-Vendredi : 9h-18h<br>
          Samedi : 9h-12h</p>
        </div>

        <div class="footer">
          <p>© 2025 KIC-FORMATIONS. Tous droits réservés.</p>
          <p style="font-size: 12px;">Rue des Pâquis 11, 1201 Genève, Suisse</p>
        </div>
      </body>
    </html>
  `;
}

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, subject, formation, message } = body;

    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Champs obligatoires manquants' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Service email non configuré' },
        { status: 503 }
      );
    }

    const subjectLabels: Record<string, string> = {
      information: "Demande d'information",
      inscription: 'Question sur une inscription',
      partenariat: 'Partenariat / Entreprise',
      reclamation: 'Réclamation',
      autre: 'Autre',
    };

    const formationLabels: Record<string, string> = {
      'francais-a1': 'Français A1',
      'francais-a2': 'Français A2',
      'francais-b1': 'Français B1',
      'francais-b2': 'Français B2',
      'anglais-a1-a2': 'Anglais A1/A2',
      'anglais-b1': 'Anglais B1',
      'anglais-b2': 'Anglais B2',
      'bureautique': 'Bureautique ECDL',
      'informatique': 'Découverte Numérique',
      'autre': 'Autre',
    };

    const subjectLabel = subjectLabels[subject] || subject;
    const formationLabel = formation ? (formationLabels[formation] || formation) : 'Non spécifiée';

    // Send notification email to KIC
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'KIC-FORMATIONS <onboarding@resend.dev>',
      to: [process.env.EMAIL_TO || 'info@kic-formations.ch'],
      replyTo: email,
      subject: `Nouveau message de contact - ${subjectLabel}`,
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
              .message-box { background: white; padding: 20px; border-radius: 8px; margin: 16px 0; border: 1px solid #e5e7eb; white-space: pre-wrap; }
              .footer { text-align: center; margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Nouveau message de contact</h1>
              <p>${subjectLabel}</p>
            </div>
            <div class="content">
              <div class="info-box">
                <p><span class="label">Nom :</span> ${firstName} ${lastName}</p>
                <p><span class="label">Email :</span> <a href="mailto:${email}">${email}</a></p>
                <p><span class="label">Téléphone :</span> ${phone || 'Non renseigné'}</p>
                <p><span class="label">Sujet :</span> ${subjectLabel}</p>
                <p><span class="label">Formation :</span> ${formationLabel}</p>
              </div>
              <h3>Message :</h3>
              <div class="message-box">${message}</div>
            </div>
            <div class="footer">
              <p>Message envoyé depuis le formulaire de contact du site kic-formations.ch</p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'KIC-FORMATIONS <onboarding@resend.dev>',
      to: [email],
      subject: 'Nous avons bien reçu votre message - KIC-FORMATIONS',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #25318D 0%, #4F46E5 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
              .footer { text-align: center; margin-top: 20px; padding-top: 16px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Merci pour votre message !</h1>
              <p>KIC-FORMATIONS - Centre de formation à Genève</p>
            </div>
            <div class="content">
              <p>Bonjour <strong>${firstName}</strong>,</p>
              <p>Nous avons bien reçu votre message concernant : <strong>${subjectLabel}</strong>.</p>
              <p>Notre équipe vous répondra dans les <strong>24 heures ouvrées</strong>.</p>
              <p>En attendant, n'hésitez pas à nous contacter directement :</p>
              <ul>
                <li>Email : <a href="mailto:info@kic-formations.ch">info@kic-formations.ch</a></li>
                <li>Téléphone : <a href="tel:+41772112323">+41 77 211 23 23</a></li>
                <li>Adresse : Rue des Pâquis 11, 1201 Genève</li>
              </ul>
              <p>Cordialement,<br><strong>L'équipe KIC-FORMATIONS</strong></p>
            </div>
            <div class="footer">
              <p>&copy; 2025 KIC-FORMATIONS. Tous droits réservés.</p>
              <p>Rue des Pâquis 11, 1201 Genève, Suisse</p>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending contact email:', error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi", message: error instanceof Error ? error.message : 'Erreur inconnue' },
      { status: 500 }
    );
  }
}

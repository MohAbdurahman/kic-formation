'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

type Language = 'francais' | 'anglais' | null;
type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  level: Level;
}

const frenchQuestions: Question[] = [
  // Questions A1
  {
    id: 1,
    question: "Comment vous appelez-vous ?",
    options: ["Je m'appelle Marie.", "J'ai 25 ans.", "Je suis française.", "J'habite à Paris."],
    correctAnswer: 0,
    level: 'A1',
  },
  {
    id: 2,
    question: "Quelle est la bonne forme ? \"Elle ___ française.\"",
    options: ["suis", "es", "est", "sont"],
    correctAnswer: 2,
    level: 'A1',
  },
  {
    id: 3,
    question: "Quel est le pluriel de \"un livre\" ?",
    options: ["des livres", "les livre", "un livres", "de livres"],
    correctAnswer: 0,
    level: 'A1',
  },
  // Questions A2
  {
    id: 4,
    question: "Hier, je ___ au cinéma.",
    options: ["vais", "allé", "suis allé", "irai"],
    correctAnswer: 2,
    level: 'A2',
  },
  {
    id: 5,
    question: "Il faut que tu ___ tes devoirs.",
    options: ["fais", "fasses", "faire", "fait"],
    correctAnswer: 1,
    level: 'A2',
  },
  {
    id: 6,
    question: "Je cherche un appartement ___ est proche du centre.",
    options: ["que", "qui", "où", "dont"],
    correctAnswer: 1,
    level: 'A2',
  },
  // Questions B1
  {
    id: 7,
    question: "Si j'avais le temps, je ___ plus souvent.",
    options: ["voyage", "voyagerai", "voyagerais", "voyageais"],
    correctAnswer: 2,
    level: 'B1',
  },
  {
    id: 8,
    question: "C'est le livre ___ je t'ai parlé.",
    options: ["que", "qui", "où", "dont"],
    correctAnswer: 3,
    level: 'B1',
  },
  {
    id: 9,
    question: "Bien qu'il ___ malade, il est venu travailler.",
    options: ["est", "soit", "était", "serait"],
    correctAnswer: 1,
    level: 'B1',
  },
  // Questions B2
  {
    id: 10,
    question: "Il aurait réussi s'il ___ plus travaillé.",
    options: ["a", "avait", "aurait", "ait"],
    correctAnswer: 1,
    level: 'B2',
  },
  {
    id: 11,
    question: "Quoi qu'il ___, je lui fais confiance.",
    options: ["dit", "dise", "dira", "disait"],
    correctAnswer: 1,
    level: 'B2',
  },
  {
    id: 12,
    question: "Cette décision, aussi difficile ___-elle, était nécessaire.",
    options: ["fut", "fût", "soit", "est"],
    correctAnswer: 1,
    level: 'B2',
  },
  // Questions C1
  {
    id: 13,
    question: "Il n'eût pas été surprenant qu'il ___.",
    options: ["échoue", "échouât", "échouait", "échoua"],
    correctAnswer: 1,
    level: 'C1',
  },
  {
    id: 14,
    question: "Dût-il en ___, il maintiendra sa position.",
    options: ["souffrir", "souffrant", "souffert", "souffrît"],
    correctAnswer: 0,
    level: 'C1',
  },
  {
    id: 15,
    question: "L'eussé-je su, je ___ différemment.",
    options: ["agis", "agissais", "eusse agi", "aurais agi"],
    correctAnswer: 2,
    level: 'C1',
  },
];

const englishQuestions: Question[] = [
  // Questions A1
  {
    id: 1,
    question: "What ___ your name?",
    options: ["is", "are", "am", "be"],
    correctAnswer: 0,
    level: 'A1',
  },
  {
    id: 2,
    question: "She ___ a student.",
    options: ["am", "is", "are", "be"],
    correctAnswer: 1,
    level: 'A1',
  },
  {
    id: 3,
    question: "I ___ from Switzerland.",
    options: ["is", "are", "am", "be"],
    correctAnswer: 2,
    level: 'A1',
  },
  // Questions A2
  {
    id: 4,
    question: "I ___ to the cinema yesterday.",
    options: ["go", "went", "gone", "going"],
    correctAnswer: 1,
    level: 'A2',
  },
  {
    id: 5,
    question: "She has ___ her homework.",
    options: ["do", "did", "done", "doing"],
    correctAnswer: 2,
    level: 'A2',
  },
  {
    id: 6,
    question: "If it rains, I ___ stay home.",
    options: ["will", "would", "am", "was"],
    correctAnswer: 0,
    level: 'A2',
  },
  // Questions B1
  {
    id: 7,
    question: "If I had more time, I ___ travel more.",
    options: ["will", "would", "can", "shall"],
    correctAnswer: 1,
    level: 'B1',
  },
  {
    id: 8,
    question: "The book ___ I bought is very interesting.",
    options: ["who", "which", "what", "whose"],
    correctAnswer: 1,
    level: 'B1',
  },
  {
    id: 9,
    question: "By the time she arrived, we ___ already left.",
    options: ["have", "has", "had", "having"],
    correctAnswer: 2,
    level: 'B1',
  },
  // Questions B2
  {
    id: 10,
    question: "Had I known, I ___ have acted differently.",
    options: ["will", "would", "could", "should"],
    correctAnswer: 1,
    level: 'B2',
  },
  {
    id: 11,
    question: "Not only ___ he late, but he also forgot the documents.",
    options: ["is", "was", "has", "did"],
    correctAnswer: 1,
    level: 'B2',
  },
  {
    id: 12,
    question: "The project, ___ completion took two years, was a success.",
    options: ["who", "which", "whose", "that"],
    correctAnswer: 2,
    level: 'B2',
  },
  // Questions C1
  {
    id: 13,
    question: "Scarcely had he arrived ___ the meeting started.",
    options: ["than", "when", "that", "as"],
    correctAnswer: 1,
    level: 'C1',
  },
  {
    id: 14,
    question: "Were it not for his help, we ___ have succeeded.",
    options: ["wouldn't", "couldn't", "shouldn't", "won't"],
    correctAnswer: 0,
    level: 'C1',
  },
  {
    id: 15,
    question: "So ___ was his performance that the audience gave a standing ovation.",
    options: ["remarkable", "remarkably", "remark", "remarking"],
    correctAnswer: 0,
    level: 'C1',
  },
];

function getRecommendedLevel(score: number, totalQuestions: number): { level: Level; description: string } {
  const percentage = (score / totalQuestions) * 100;

  if (percentage < 20) {
    return {
      level: 'A1',
      description: 'Vous êtes débutant. Nous vous recommandons de commencer par le niveau A1 pour acquérir les bases.',
    };
  } else if (percentage < 40) {
    return {
      level: 'A2',
      description: 'Vous avez des bases solides. Le niveau A2 vous permettra de consolider vos acquis.',
    };
  } else if (percentage < 60) {
    return {
      level: 'B1',
      description: 'Vous avez un niveau intermédiaire. Le niveau B1 vous aidera à gagner en autonomie.',
    };
  } else if (percentage < 80) {
    return {
      level: 'B2',
      description: 'Vous avez un bon niveau. Le niveau B2 vous permettra de perfectionner vos compétences.',
    };
  } else {
    return {
      level: 'C1',
      description: 'Excellent ! Vous avez un niveau avancé. Le niveau C1 vous permettra d\'atteindre l\'excellence.',
    };
  }
}

export default function TestNiveauPage() {
  const [userInfo, setUserInfo] = useState({ firstName: '', email: '', rgpdAccepted: false });
  const [isUserInfoSubmitted, setIsUserInfoSubmitted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const questions = selectedLanguage === 'francais' ? frenchQuestions : englishQuestions;

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUserInfoSubmitted(true);
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(answerIndex);
    setIsAnswered(true);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const sendTestResultsEmail = async (finalScore: number) => {
    try {
      const percentage = Math.round((finalScore / questions.length) * 100);
      const recommendedLevel = getRecommendedLevel(finalScore, questions.length);

      const response = await fetch('/api/send-test-results', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: userInfo.firstName,
          email: userInfo.email,
          language: selectedLanguage,
          level: recommendedLevel.level,
          score: finalScore,
          totalQuestions: questions.length,
          percentage,
        }),
      });

      if (response.ok) {
        setIsEmailSent(true);
        setEmailError(null);
      } else {
        setEmailError('Une erreur est survenue lors de l\'envoi de l\'email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setEmailError('Une erreur est survenue lors de l\'envoi de l\'email.');
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
      // Send email with results
      sendTestResultsEmail(score);
    }
  };

  const handleRestart = () => {
    setSelectedLanguage(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
    // Note: We keep isUserInfoSubmitted and userInfo to avoid re-entering info
  };

  const result = showResult ? getRecommendedLevel(score, questions.length) : null;
  const languageLabel = selectedLanguage === 'francais' ? 'Français' : 'Anglais';
  const languageSlug = selectedLanguage === 'francais' ? 'langues' : 'langues';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white pt-32 pb-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Test de Niveau
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Évaluez votre niveau en quelques minutes et découvrez la formation adaptée à vos besoins.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          {/* Formulaire d'information utilisateur */}
          {!isUserInfoSubmitted && (
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                  Vos informations
                </h2>
                <p className="text-gray-600">
                  Veuillez renseigner vos informations avant de commencer le test. Nous vous enverrons les résultats par email.
                </p>
              </div>

              <form onSubmit={handleUserInfoSubmit} className="space-y-5">
                {/* Prénom */}
                <div>
                  <label htmlFor="firstName" className="label">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={userInfo.firstName}
                    onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                    className="input"
                    placeholder="Votre prénom"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="label">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    className="input"
                    placeholder="votre.email@example.com"
                  />
                </div>

                {/* RGPD */}
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={userInfo.rgpdAccepted}
                    onChange={(e) => setUserInfo({ ...userInfo, rgpdAccepted: e.target.checked })}
                    className="mt-1 w-4 h-4 text-primary-600 focus:ring-primary-500 rounded"
                  />
                  <span className="ml-3 text-sm text-gray-700">
                    J'accepte le traitement de mes données personnelles conformément à la politique de confidentialité *
                  </span>
                </label>

                {/* Submit */}
                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Commencer le test
                </Button>
              </form>
            </div>
          )}

          {/* Sélection de la langue */}
          {isUserInfoSubmitted && !selectedLanguage && (
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                  Quelle langue souhaitez-vous tester ?
                </h2>
                <p className="text-gray-600">
                  Choisissez la langue pour laquelle vous souhaitez évaluer votre niveau.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleLanguageSelect('francais')}
                  className="group p-8 bg-[#25318D]/10 hover:bg-[#25318D]/15 rounded-2xl border-2 border-[#25318D]/20 hover:border-[#25318D]/40 transition-all text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                    <svg viewBox="0 0 48 48" className="w-full h-full">
                      <rect x="0" y="0" width="16" height="48" fill="#002395"/>
                      <rect x="16" y="0" width="16" height="48" fill="#FFFFFF"/>
                      <rect x="32" y="0" width="16" height="48" fill="#ED2939"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Français</h3>
                  <p className="text-sm text-gray-600">15 questions • 10 min</p>
                </button>

                <button
                  onClick={() => handleLanguageSelect('anglais')}
                  className="group p-8 bg-red-50 hover:bg-red-100 rounded-2xl border-2 border-red-200 hover:border-red-400 transition-all text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                    <svg viewBox="0 0 60 30" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                      <clipPath id="s">
                        <path d="M0,0 v30 h60 v-30 z"/>
                      </clipPath>
                      <clipPath id="t">
                        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
                      </clipPath>
                      <g clipPath="url(#s)">
                        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
                        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
                      </g>
                    </svg>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-2">Anglais</h3>
                  <p className="text-sm text-gray-600">15 questions • 10 min</p>
                </button>
              </div>
            </div>
          )}

          {/* Quiz en cours */}
          {isUserInfoSubmitted && selectedLanguage && !showResult && (
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Question {currentQuestion + 1} sur {questions.length}</span>
                  <span>Niveau {questions[currentQuestion].level}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-heading font-bold text-gray-900 mb-6">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all ";

                    if (isAnswered) {
                      if (index === questions[currentQuestion].correctAnswer) {
                        buttonClass += "border-green-500 bg-green-50 text-green-800";
                      } else if (index === selectedAnswer && index !== questions[currentQuestion].correctAnswer) {
                        buttonClass += "border-red-500 bg-red-50 text-red-800";
                      } else {
                        buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                      }
                    } else {
                      buttonClass += "border-gray-200 hover:border-primary-400 hover:bg-primary-50 cursor-pointer";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={isAnswered}
                        className={buttonClass}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Feedback et bouton suivant */}
              {isAnswered && (
                <div className="flex flex-col items-center gap-4">
                  <p className={`text-lg font-medium ${selectedAnswer === questions[currentQuestion].correctAnswer ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedAnswer === questions[currentQuestion].correctAnswer
                      ? '✓ Bonne réponse !'
                      : `✗ La bonne réponse était : ${questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}`
                    }
                  </p>
                  <Button onClick={handleNextQuestion} variant="primary" size="lg">
                    {currentQuestion < questions.length - 1 ? 'Question suivante' : 'Voir les résultats'}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Résultats */}
          {isUserInfoSubmitted && showResult && result && (
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              {/* Email confirmation message */}
              {isEmailSent && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-green-800 font-medium">Résultats envoyés !</p>
                    <p className="text-green-700 text-sm">Vos résultats ont été envoyés à {userInfo.email}</p>
                  </div>
                </div>
              )}

              {/* Email error message */}
              {emailError && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <p className="text-yellow-800 font-medium">Attention</p>
                    <p className="text-yellow-700 text-sm">{emailError}</p>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-white text-3xl font-bold mb-6">
                  {result.level}
                </div>

                <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                  Votre niveau en {languageLabel} : {result.level}
                </h2>

                <p className="text-gray-600 mb-6">
                  Vous avez obtenu <strong>{score} bonnes réponses</strong> sur {questions.length} questions ({Math.round((score / questions.length) * 100)}%)
                </p>

                <div className="bg-primary-50 rounded-xl p-6 mb-8">
                  <p className="text-primary-800">
                    {result.description}
                  </p>
                </div>

                {/* Barre de progression visuelle */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <span>A1</span>
                    <span>A2</span>
                    <span>B1</span>
                    <span>B2</span>
                    <span>C1</span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-gradient-to-r from-[#25318D] via-green-500 to-purple-500 transition-all duration-500"
                      style={{ width: `${(score / questions.length) * 100}%` }}
                    />
                    {/* Marqueurs */}
                    <div className="absolute top-0 left-[20%] w-0.5 h-full bg-white/50"></div>
                    <div className="absolute top-0 left-[40%] w-0.5 h-full bg-white/50"></div>
                    <div className="absolute top-0 left-[60%] w-0.5 h-full bg-white/50"></div>
                    <div className="absolute top-0 left-[80%] w-0.5 h-full bg-white/50"></div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href={`/formations?categorie=${languageSlug}`}
                  variant="primary"
                  size="lg"
                >
                  Voir les formations {languageLabel} {result.level}
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-600 mb-4">
                  Vous souhaitez en savoir plus sur nos formations ?
                </p>
                <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-semibold">
                  Contactez-nous pour un conseil personnalisé →
                </Link>
              </div>
            </div>
          )}

          {/* Bouton retour */}
          {isUserInfoSubmitted && selectedLanguage && !showResult && (
            <div className="text-center mt-6">
              <button
                onClick={handleRestart}
                className="text-gray-600 hover:text-gray-900 text-sm"
              >
                ← Changer de langue
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

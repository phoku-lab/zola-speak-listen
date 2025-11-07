import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Award } from "lucide-react";
import LessonCard from "@/components/LessonCard";
import QuizQuestion from "@/components/QuizQuestion";
import { Progress } from "@/components/ui/progress";

const Learn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const language = location.state?.language || "Zulu";
  
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  // Language-specific lesson data
  const lessonData: Record<string, any> = {
    "Zulu": {
      lessons: [
        { word: "Sawubona", translation: "Hello", pronunciation: "sah-woo-BOH-nah", example: "Sawubona! Unjani?", exampleTranslation: "Hello! How are you?" },
        { word: "Yebo", translation: "Yes", pronunciation: "YEH-boh", example: "Yebo, ngiyaphila.", exampleTranslation: "Yes, I am well." },
        { word: "Ngiyabonga", translation: "Thank you", pronunciation: "ngee-yah-BONG-ah", example: "Ngiyabonga kakhulu!", exampleTranslation: "Thank you very much!" }
      ],
      quiz: [
        { question: "How do you say 'Hello' in Zulu?", options: ["Yebo", "Sawubona", "Ngiyabonga", "Hamba kahle"], correctAnswer: 1 },
        { question: "What does 'Ngiyabonga' mean?", options: ["Goodbye", "Yes", "Thank you", "Hello"], correctAnswer: 2 }
      ]
    },
    "Xhosa": {
      lessons: [
        { word: "Molo", translation: "Hello", pronunciation: "MOH-loh", example: "Molo! Unjani?", exampleTranslation: "Hello! How are you?" },
        { word: "Ewe", translation: "Yes", pronunciation: "EH-weh", example: "Ewe, ndiyaphila.", exampleTranslation: "Yes, I am well." },
        { word: "Enkosi", translation: "Thank you", pronunciation: "en-KOH-see", example: "Enkosi kakhulu!", exampleTranslation: "Thank you very much!" }
      ],
      quiz: [
        { question: "How do you say 'Hello' in Xhosa?", options: ["Ewe", "Molo", "Enkosi", "Hamba kakuhle"], correctAnswer: 1 },
        { question: "What does 'Enkosi' mean?", options: ["Goodbye", "Yes", "Thank you", "Hello"], correctAnswer: 2 }
      ]
    },
    "Afrikaans": {
      lessons: [
        { word: "Hallo", translation: "Hello", pronunciation: "HAH-loh", example: "Hallo! Hoe gaan dit?", exampleTranslation: "Hello! How are you?" },
        { word: "Ja", translation: "Yes", pronunciation: "YAH", example: "Ja, dit gaan goed.", exampleTranslation: "Yes, I am well." },
        { word: "Dankie", translation: "Thank you", pronunciation: "DAHN-kee", example: "Baie dankie!", exampleTranslation: "Thank you very much!" }
      ],
      quiz: [
        { question: "How do you say 'Hello' in Afrikaans?", options: ["Ja", "Hallo", "Dankie", "Totsiens"], correctAnswer: 1 },
        { question: "What does 'Dankie' mean?", options: ["Goodbye", "Yes", "Thank you", "Hello"], correctAnswer: 2 }
      ]
    },
    "English": {
      lessons: [
        { word: "Hello", translation: "Hello", pronunciation: "heh-LOH", example: "Hello! How are you?", exampleTranslation: "Hello! How are you?" },
        { word: "Yes", translation: "Yes", pronunciation: "YEHS", example: "Yes, I am well.", exampleTranslation: "Yes, I am well." },
        { word: "Thank you", translation: "Thank you", pronunciation: "THANK yoo", example: "Thank you very much!", exampleTranslation: "Thank you very much!" }
      ],
      quiz: [
        { question: "How do you say 'Hello' in English?", options: ["Yes", "Hello", "Thank you", "Goodbye"], correctAnswer: 1 },
        { question: "What does 'Thank you' mean?", options: ["Goodbye", "Yes", "Thank you", "Hello"], correctAnswer: 2 }
      ]
    },
    "Northern Sotho": {
      lessons: [
        { word: "Thobela", translation: "Hello", pronunciation: "toh-BEH-lah", example: "Thobela! O kae?", exampleTranslation: "Hello! How are you?" },
        { word: "Ee", translation: "Yes", pronunciation: "EH-eh", example: "Ee, ke phela gabotse.", exampleTranslation: "Yes, I am well." },
        { word: "Ke a leboga", translation: "Thank you", pronunciation: "keh ah leh-BOH-gah", example: "Ke a leboga kudu!", exampleTranslation: "Thank you very much!" }
      ],
      quiz: [
        { question: "How do you say 'Hello' in Northern Sotho?", options: ["Ee", "Thobela", "Ke a leboga", "Sala gabotse"], correctAnswer: 1 },
        { question: "What does 'Ke a leboga' mean?", options: ["Goodbye", "Yes", "Thank you", "Hello"], correctAnswer: 2 }
      ]
    },
    "Tswana": {
      lessons: [
        { word: "Dumela", translation: "Hello", pronunciation: "doo-MEH-lah", example: "Dumela! O tsogile jang?", exampleTranslation: "Hello! How are you?" },
        { word: "Ee", translation: "Yes", pronunciation: "EH-eh", example: "Ee, ke tsogile sentle.", exampleTranslation: "Yes, I am well." },
        { word: "Ke a leboga", translation: "Thank you", pronunciation: "keh ah leh-BOH-gah", example: "Ke a leboga thata!", exampleTranslation: "Thank you very much!" }
      ],
      quiz: [
        { question: "How do you say 'Hello' in Tswana?", options: ["Ee", "Dumela", "Ke a leboga", "Sala sentle"], correctAnswer: 1 },
        { question: "What does 'Ke a leboga' mean?", options: ["Goodbye", "Yes", "Thank you", "Hello"], correctAnswer: 2 }
      ]
    },
    "Southern Sotho": {
      lessons: [
        { word: "Lumela", translation: "Hello", pronunciation: "loo-MEH-lah", example: "Lumela! U phela joang?", exampleTranslation: "Hello! How are you?" },
        { word: "E", translation: "Yes", pronunciation: "EH", example: "E, ke phela hantle.", exampleTranslation: "Yes, I am well." },
        { word: "Kea leboha", translation: "Thank you", pronunciation: "KEH-ah leh-BOH-hah", example: "Kea leboha haholo!", exampleTranslation: "Thank you very much!" }
      ],
      quiz: [
        { question: "How do you say 'Hello' in Southern Sotho?", options: ["E", "Lumela", "Kea leboha", "Sala hantle"], correctAnswer: 1 },
        { question: "What does 'Kea leboha' mean?", options: ["Goodbye", "Yes", "Thank you", "Hello"], correctAnswer: 2 }
      ]
    },
    "Tsonga": {
      lessons: [
        { word: "Avuxeni", translation: "Hello", pronunciation: "ah-voo-SHEH-nee", example: "Avuxeni! Ku njhani?", exampleTranslation: "Hello! How are you?" },
        { word: "Ina", translation: "Yes", pronunciation: "EE-nah", example: "Ina, ndzi kona.", exampleTranslation: "Yes, I am well." },
        { word: "Ndza khensa", translation: "Thank you", pronunciation: "n-dzah KHEN-sah", example: "Ndza khensa swinene!", exampleTranslation: "Thank you very much!" }
      ],
      quiz: [
        { question: "How do you say 'Hello' in Tsonga?", options: ["Ina", "Avuxeni", "Ndza khensa", "Hambanani kahle"], correctAnswer: 1 },
        { question: "What does 'Ndza khensa' mean?", options: ["Goodbye", "Yes", "Thank you", "Hello"], correctAnswer: 2 }
      ]
    },
    "Swati": {
      lessons: [
        { word: "Sawubona", translation: "Hello", pronunciation: "sah-woo-BOH-nah", example: "Sawubona! Unjani?", exampleTranslation: "Hello! How are you?" },
        { word: "Yebo", translation: "Yes", pronunciation: "YEH-boh", example: "Yebo, ngikhona.", exampleTranslation: "Yes, I am well." },
        { word: "Ngiyabonga", translation: "Thank you", pronunciation: "ngee-yah-BONG-ah", example: "Ngiyabonga kakhulu!", exampleTranslation: "Thank you very much!" }
      ],
      quiz: [
        { question: "How do you say 'Hello' in Swati?", options: ["Yebo", "Sawubona", "Ngiyabonga", "Hamba kahle"], correctAnswer: 1 },
        { question: "What does 'Ngiyabonga' mean?", options: ["Goodbye", "Yes", "Thank you", "Hello"], correctAnswer: 2 }
      ]
    },
    "Venda": {
      lessons: [
        { word: "Ndaa", translation: "Hello", pronunciation: "n-DAH", example: "Ndaa! Vho vuwa hani?", exampleTranslation: "Hello! How are you?" },
        { word: "Ee", translation: "Yes", pronunciation: "EH-eh", example: "Ee, ndi khou vuwa.", exampleTranslation: "Yes, I am well." },
        { word: "Ndo livhuwa", translation: "Thank you", pronunciation: "n-doh lee-VOO-wah", example: "Ndo livhuwa nga maanda!", exampleTranslation: "Thank you very much!" }
      ],
      quiz: [
        { question: "How do you say 'Hello' in Venda?", options: ["Ee", "Ndaa", "Ndo livhuwa", "Kha vha sale"], correctAnswer: 1 },
        { question: "What does 'Ndo livhuwa' mean?", options: ["Goodbye", "Yes", "Thank you", "Hello"], correctAnswer: 2 }
      ]
    },
    "Ndebele": {
      lessons: [
        { word: "Lotjhani", translation: "Hello", pronunciation: "loh-CHAH-nee", example: "Lotjhani! Kunjani?", exampleTranslation: "Hello! How are you?" },
        { word: "Yebo", translation: "Yes", pronunciation: "YEH-boh", example: "Yebo, ngikhona.", exampleTranslation: "Yes, I am well." },
        { word: "Ngiyathokoza", translation: "Thank you", pronunciation: "ngee-yah-toh-KOH-zah", example: "Ngiyathokoza kakhulu!", exampleTranslation: "Thank you very much!" }
      ],
      quiz: [
        { question: "How do you say 'Hello' in Ndebele?", options: ["Yebo", "Lotjhani", "Ngiyathokoza", "Hhamba khahle"], correctAnswer: 1 },
        { question: "What does 'Ngiyathokoza' mean?", options: ["Goodbye", "Yes", "Thank you", "Hello"], correctAnswer: 2 }
      ]
    }
  };

  const lessons = lessonData[language]?.lessons || lessonData["Zulu"].lessons;
  const quizQuestions = lessonData[language]?.quiz || lessonData["Zulu"].quiz;

  const handleNext = () => {
    if (currentStep < lessons.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowQuiz(true);
      setCurrentStep(0); // Reset for quiz questions
    }
  };

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1);
    }
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Quiz completed
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const progress = showQuiz 
    ? ((currentStep + 1) / quizQuestions.length) * 100
    : ((currentStep + 1) / lessons.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-secondary" />
              <span className="font-bold text-lg">{score}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Learning {language}</span>
              <span className="text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {!showQuiz ? (
            <div className="space-y-6">
              <LessonCard {...lessons[currentStep]} />
              <Button
                onClick={handleNext}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
                size="lg"
              >
                Continue
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <QuizQuestion
                {...quizQuestions[currentStep]}
                onAnswer={handleAnswer}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Learn;

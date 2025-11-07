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

  // Sample lesson data - would come from a database in production
  const lessons = [
    {
      word: "Sawubona",
      translation: "Hello",
      pronunciation: "sah-woo-BOH-nah",
      example: "Sawubona! Unjani?",
      exampleTranslation: "Hello! How are you?"
    },
    {
      word: "Yebo",
      translation: "Yes",
      pronunciation: "YEH-boh",
      example: "Yebo, ngiyaphila.",
      exampleTranslation: "Yes, I am well."
    },
    {
      word: "Ngiyabonga",
      translation: "Thank you",
      pronunciation: "ngee-yah-BONG-ah",
      example: "Ngiyabonga kakhulu!",
      exampleTranslation: "Thank you very much!"
    }
  ];

  const quizQuestions = [
    {
      question: "How do you say 'Hello' in Zulu?",
      options: ["Yebo", "Sawubona", "Ngiyabonga", "Hamba kahle"],
      correctAnswer: 1
    },
    {
      question: "What does 'Ngiyabonga' mean?",
      options: ["Goodbye", "Yes", "Thank you", "Hello"],
      correctAnswer: 2
    }
  ];

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

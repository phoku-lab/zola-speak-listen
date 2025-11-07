import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";

interface QuizQuestionProps {
  question: string;
  options: string[];
  correctAnswer: number;
  onAnswer: (correct: boolean) => void;
  audioEnabled?: boolean;
}

const QuizQuestion = ({ 
  question, 
  options, 
  correctAnswer, 
  onAnswer,
  audioEnabled = true 
}: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    const correct = index === correctAnswer;
    
    setTimeout(() => {
      onAnswer(correct);
      setSelectedAnswer(null);
      setShowResult(false);
    }, 1500);
  };

  const playAudio = () => {
    // Placeholder for audio playback
    console.log("Playing audio:", question);
  };

  return (
    <Card className="p-8 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-foreground">{question}</h3>
        {audioEnabled && (
          <Button
            variant="outline"
            size="icon"
            onClick={playAudio}
            className="shrink-0 hover:bg-primary hover:text-primary-foreground hover:border-primary"
          >
            <Volume2 className="w-5 h-5" />
          </Button>
        )}
      </div>

      <div className="grid gap-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === correctAnswer;
          const showCorrect = showResult && isCorrect;
          const showIncorrect = showResult && isSelected && !isCorrect;

          return (
            <Button
              key={index}
              variant="outline"
              className={`h-auto p-4 text-left justify-start text-base font-medium transition-all ${
                showCorrect ? 'bg-success text-success-foreground border-success' :
                showIncorrect ? 'bg-destructive text-destructive-foreground border-destructive' :
                isSelected ? 'bg-primary text-primary-foreground border-primary' :
                'hover:bg-muted'
              }`}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
            >
              <span className="flex-1">{option}</span>
              {showCorrect && <CheckCircle className="w-5 h-5 ml-2" />}
              {showIncorrect && <XCircle className="w-5 h-5 ml-2" />}
            </Button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuizQuestion;

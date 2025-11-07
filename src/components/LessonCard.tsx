import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, CheckCircle } from "lucide-react";
import { useState } from "react";

interface LessonCardProps {
  word: string;
  translation: string;
  pronunciation?: string;
  example?: string;
  exampleTranslation?: string;
  audioUrl?: string;
}

const LessonCard = ({ 
  word, 
  translation, 
  pronunciation, 
  example, 
  exampleTranslation,
  audioUrl 
}: LessonCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    // Placeholder for audio playback - can be integrated with TTS later
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 1000);
  };

  return (
    <Card className="p-6 space-y-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-foreground">{word}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={playAudio}
              className={`hover:bg-primary hover:text-primary-foreground ${isPlaying ? 'bg-primary text-primary-foreground' : ''}`}
            >
              <Volume2 className="w-5 h-5" />
            </Button>
          </div>
          {pronunciation && (
            <p className="text-sm text-muted-foreground italic mb-1">/{pronunciation}/</p>
          )}
          <p className="text-lg text-accent font-medium">{translation}</p>
        </div>
      </div>
      
      {example && (
        <div className="pt-4 border-t border-border space-y-2">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <p className="text-foreground font-medium">{example}</p>
              <p className="text-muted-foreground text-sm mt-1">{exampleTranslation}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={playAudio}
              className="hover:bg-primary hover:text-primary-foreground"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default LessonCard;

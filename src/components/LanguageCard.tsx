import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

interface LanguageCardProps {
  name: string;
  nativeName: string;
  icon: string;
  greeting: string;
  progress?: number;
  onClick: () => void;
}

const LanguageCard = ({ name, nativeName, icon, greeting, progress = 0, onClick }: LanguageCardProps) => {
  return (
    <Card 
      className="p-6 hover:shadow-lg transition-all cursor-pointer group border-2 hover:border-primary"
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="text-6xl">{icon}</div>
        <div>
          <h3 className="font-bold text-xl text-foreground">{name}</h3>
          <p className="text-muted-foreground">{nativeName}</p>
          <p className="text-primary font-semibold mt-2 text-lg">{greeting}</p>
          <p className="text-xs text-muted-foreground">Learn greetings, phrases & more</p>
        </div>
        {progress > 0 && (
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground">
          Start Learning
        </Button>
      </div>
    </Card>
  );
};

export default LanguageCard;

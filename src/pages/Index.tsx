import { useNavigate } from "react-router-dom";
import LanguageCard from "@/components/LanguageCard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const navigate = useNavigate();

  const languages = [
    { name: "Zulu", nativeName: "isiZulu", icon: "🇿🇦", greeting: "Sawubona", progress: 0 },
    { name: "Xhosa", nativeName: "isiXhosa", icon: "🇿🇦", greeting: "Molo", progress: 0 },
    { name: "Afrikaans", nativeName: "Afrikaans", icon: "🇿🇦", greeting: "Hallo", progress: 0 },
    { name: "English", nativeName: "English", icon: "🇿🇦", greeting: "Hello", progress: 0 },
    { name: "Northern Sotho", nativeName: "Sepedi", icon: "🇿🇦", greeting: "Thobela", progress: 0 },
    { name: "Tswana", nativeName: "Setswana", icon: "🇿🇦", greeting: "Dumela", progress: 0 },
    { name: "Southern Sotho", nativeName: "Sesotho", icon: "🇿🇦", greeting: "Lumela", progress: 0 },
    { name: "Tsonga", nativeName: "Xitsonga", icon: "🇿🇦", greeting: "Avuxeni", progress: 0 },
    { name: "Swati", nativeName: "siSwati", icon: "🇿🇦", greeting: "Sawubona", progress: 0 },
    { name: "Venda", nativeName: "Tshivenda", icon: "🇿🇦", greeting: "Ndaa", progress: 0 },
    { name: "Ndebele", nativeName: "isiNdebele", icon: "🇿🇦", greeting: "Lotjhani", progress: 0 },
  ];

  const handleLanguageSelect = (language: string) => {
    navigate("/learn", { state: { language } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Learn South African Languages
              </h1>
              <p className="text-xl text-muted-foreground">
                Master Zulu, Xhosa, Afrikaans, and more with interactive lessons, 
                audio pronunciation, and fun quizzes.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6"
                  onClick={() => handleLanguageSelect("Zulu")}
                >
                  Start Learning
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 hover:bg-muted"
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Learn South African Languages" 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Our App?</h2>
            <p className="text-xl text-muted-foreground">Learn languages the South African way</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4 p-6">
              <div className="text-5xl">🎧</div>
              <h3 className="text-2xl font-bold text-foreground">Audio Learning</h3>
              <p className="text-muted-foreground">
                Perfect pronunciation with native speaker audio for every word and phrase
              </p>
            </div>
            <div className="text-center space-y-4 p-6">
              <div className="text-5xl">🎯</div>
              <h3 className="text-2xl font-bold text-foreground">Interactive Quizzes</h3>
              <p className="text-muted-foreground">
                Test your knowledge with engaging quizzes and track your progress
              </p>
            </div>
            <div className="text-center space-y-4 p-6">
              <div className="text-5xl">🌍</div>
              <h3 className="text-2xl font-bold text-foreground">Cultural Context</h3>
              <p className="text-muted-foreground">
                Learn languages with real South African cultural context and examples
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">Choose Your Language</h2>
            <p className="text-xl text-muted-foreground">Start your journey with any of our South African languages</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {languages.map((language) => (
              <LanguageCard
                key={language.name}
                {...language}
                onClick={() => handleLanguageSelect(language.name)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

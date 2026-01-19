import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import PartsOfSpeechGallery from '@/components/PartsOfSpeechGallery';
import AvatarCreator from '@/components/AvatarCreator';

const Index = () => {
  const [showCreator, setShowCreator] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <header className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center transform rotate-12 animate-float">
              <Icon name="Sparkles" size={24} className="text-white -rotate-12" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Части речи
            </h1>
          </div>
          <Button 
            onClick={() => setShowCreator(!showCreator)}
            size="lg"
            className="rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Icon name={showCreator ? "BookOpen" : "Sparkles"} size={20} className="mr-2" />
            {showCreator ? 'Галерея' : 'Создать аватарку'}
          </Button>
        </div>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
          Изучай части речи весело и творчески! Создавай уникальные аватарки для каждой части речи.
        </p>
      </header>

      <main className="container mx-auto px-4 pb-16">
        {showCreator ? (
          <AvatarCreator />
        ) : (
          <PartsOfSpeechGallery />
        )}
      </main>

      <footer className="container mx-auto px-4 py-8 mt-16 border-t">
        <div className="text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-2">
            <Icon name="Heart" size={16} className="text-accent" />
            Учи русский язык с удовольствием
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

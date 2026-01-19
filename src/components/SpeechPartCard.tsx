import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { SpeechPart } from '@/types/speech-parts';

interface SpeechPartCardProps {
  speechPart: SpeechPart;
  onGenerateAvatar: (speechPart: SpeechPart) => void;
}

export default function SpeechPartCard({ speechPart, onGenerateAvatar }: SpeechPartCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000">
      <Card
        className={`relative overflow-hidden transition-all duration-500 transform hover:scale-105 cursor-pointer border-2 ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        style={{
          borderColor: `var(--${speechPart.color})`,
          transformStyle: 'preserve-3d',
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`${isFlipped ? 'hidden' : 'block'}`}>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-5xl animate-float">{speechPart.emoji}</span>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: `var(--${speechPart.color})` }}>
                    {speechPart.name}
                  </h3>
                </div>
              </div>
            </div>

            {speechPart.avatar && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden">
                <img
                  src={speechPart.avatar}
                  alt={`Аватар ${speechPart.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <p className="text-muted-foreground text-sm">{speechPart.description}</p>

            <Button
              onClick={(e) => {
                e.stopPropagation();
                onGenerateAvatar(speechPart);
              }}
              className="w-full"
              style={{
                backgroundColor: `var(--${speechPart.color})`,
                color: 'white',
              }}
            >
              <Icon name="Sparkles" className="mr-2" size={16} />
              Создать аватар
            </Button>
          </CardContent>
        </div>

        <div className={`${isFlipped ? 'block' : 'hidden'} rotate-y-180`}>
          <CardContent className="p-6 space-y-4 h-full">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Icon name="BookOpen" size={20} />
              Примеры
            </h4>
            <div className="flex flex-wrap gap-2">
              {speechPart.examples.map((example, idx) => (
                <Badge
                  key={idx}
                  variant="secondary"
                  className="text-sm px-3 py-1"
                  style={{
                    backgroundColor: `var(--${speechPart.color})20`,
                    color: `var(--${speechPart.color})`,
                    borderColor: `var(--${speechPart.color})`,
                  }}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

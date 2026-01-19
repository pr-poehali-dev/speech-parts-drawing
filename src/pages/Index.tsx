import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface PartOfSpeech {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  examples: string[];
}

const partsOfSpeech: PartOfSpeech[] = [
  {
    id: 'noun',
    name: 'Существительное',
    description: 'Обозначает предмет, лицо или явление',
    color: 'noun',
    icon: 'Box',
    examples: ['кот', 'дом', 'радость', 'учитель']
  },
  {
    id: 'verb',
    name: 'Глагол',
    description: 'Обозначает действие или состояние',
    color: 'verb',
    icon: 'Zap',
    examples: ['бегать', 'думать', 'рисовать', 'спать']
  },
  {
    id: 'adjective',
    name: 'Прилагательное',
    description: 'Описывает признак предмета',
    color: 'adjective',
    icon: 'Sparkles',
    examples: ['красивый', 'большой', 'умный', 'яркий']
  },
  {
    id: 'adverb',
    name: 'Наречие',
    description: 'Описывает признак действия',
    color: 'adverb',
    icon: 'Wind',
    examples: ['быстро', 'хорошо', 'вчера', 'очень']
  },
  {
    id: 'pronoun',
    name: 'Местоимение',
    description: 'Указывает на предмет, не называя его',
    color: 'pronoun',
    icon: 'Users',
    examples: ['я', 'ты', 'он', 'этот']
  },
  {
    id: 'preposition',
    name: 'Предлог',
    description: 'Выражает связь между словами',
    color: 'preposition',
    icon: 'Link',
    examples: ['в', 'на', 'под', 'для']
  },
  {
    id: 'conjunction',
    name: 'Союз',
    description: 'Связывает слова и предложения',
    color: 'conjunction',
    icon: 'GitMerge',
    examples: ['и', 'но', 'или', 'что']
  },
  {
    id: 'interjection',
    name: 'Междометие',
    description: 'Выражает эмоции и чувства',
    color: 'interjection',
    icon: 'MessageCircle',
    examples: ['ах!', 'ура!', 'ой!', 'эх!']
  }
];

export default function Index() {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Рисуем части речи
          </h1>
          <p className="text-xl text-muted-foreground font-handwriting text-2xl">
            Изучай грамматику через творчество и игру! ✨
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {partsOfSpeech.map((part, index) => (
            <Card
              key={part.id}
              className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in border-2 ${
                selectedPart === part.id ? 'ring-4 ring-offset-2' : ''
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                borderColor: `var(--${part.color})`,
                backgroundColor: hoveredCard === part.id ? `color-mix(in srgb, var(--${part.color}) 10%, white)` : 'white',
                ...(selectedPart === part.id && { ringColor: `var(--${part.color})` })
              }}
              onClick={() => setSelectedPart(selectedPart === part.id ? null : part.id)}
              onMouseEnter={() => setHoveredCard(part.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="p-3 rounded-xl transition-transform duration-300 hover:scale-110 hover:rotate-12"
                  style={{ backgroundColor: `var(--${part.color})` }}
                >
                  <Icon name={part.icon} size={28} className="text-white" />
                </div>
                <Badge 
                  variant="outline" 
                  className="font-handwriting text-lg"
                  style={{ borderColor: `var(--${part.color})`, color: `var(--${part.color})` }}
                >
                  {part.name}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">
                {part.description}
              </p>

              <div 
                className={`transition-all duration-300 overflow-hidden ${
                  selectedPart === part.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: `var(--${part.color})` }}>
                    Примеры:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {part.examples.map((example, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-sm font-medium text-white animate-scale-in hover:scale-110 transition-transform cursor-pointer"
                        style={{ 
                          backgroundColor: `var(--${part.color})`,
                          animationDelay: `${idx * 50}ms`
                        }}
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-primary/20 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-primary to-accent rounded-2xl animate-float">
                <Icon name="Palette" size={32} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">Творческое обучение</h2>
                <p className="text-muted-foreground font-handwriting text-lg">
                  Нажимай на карточки, чтобы увидеть примеры!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {partsOfSpeech.slice(0, 4).map((part) => (
                <div
                  key={part.id}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:scale-105 transition-transform cursor-pointer"
                  style={{ backgroundColor: `color-mix(in srgb, var(--${part.color}) 15%, white)` }}
                >
                  <Icon name={part.icon} size={24} style={{ color: `var(--${part.color})` }} />
                  <span className="text-xs font-medium text-center">{part.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 rounded-2xl">
              <p className="text-center font-handwriting text-2xl text-gray-700">
                {selectedPart 
                  ? `Ты выбрал: ${partsOfSpeech.find(p => p.id === selectedPart)?.name}! 🎨`
                  : 'Выбери часть речи, чтобы начать изучение! 🚀'
                }
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
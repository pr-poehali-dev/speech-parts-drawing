import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface PartOfSpeech {
  id: string;
  name: string;
  description: string;
  examples: string[];
  color: string;
  icon: string;
  emoji: string;
}

const partsOfSpeech: PartOfSpeech[] = [
  {
    id: 'noun',
    name: 'Существительное',
    description: 'Обозначает предмет, человека или явление',
    examples: ['книга', 'учитель', 'счастье'],
    color: 'bg-[#9b87f5]',
    icon: 'Box',
    emoji: '📦'
  },
  {
    id: 'verb',
    name: 'Глагол',
    description: 'Обозначает действие или состояние',
    examples: ['читать', 'бежать', 'думать'],
    color: 'bg-[#F97316]',
    icon: 'Zap',
    emoji: '⚡'
  },
  {
    id: 'adjective',
    name: 'Прилагательное',
    description: 'Описывает признаки предмета',
    examples: ['красный', 'большой', 'умный'],
    color: 'bg-[#0EA5E9]',
    icon: 'Palette',
    emoji: '🎨'
  },
  {
    id: 'adverb',
    name: 'Наречие',
    description: 'Описывает признак действия',
    examples: ['быстро', 'весело', 'громко'],
    color: 'bg-[#D946EF]',
    icon: 'Gauge',
    emoji: '🚀'
  },
  {
    id: 'pronoun',
    name: 'Местоимение',
    description: 'Указывает на предмет, не называя его',
    examples: ['я', 'ты', 'он', 'она'],
    color: 'bg-[#8B5CF6]',
    icon: 'Users',
    emoji: '👤'
  },
  {
    id: 'preposition',
    name: 'Предлог',
    description: 'Связывает слова в предложении',
    examples: ['в', 'на', 'под', 'над'],
    color: 'bg-[#0FA0CE]',
    icon: 'Link',
    emoji: '🔗'
  },
  {
    id: 'conjunction',
    name: 'Союз',
    description: 'Соединяет слова и предложения',
    examples: ['и', 'а', 'но', 'или'],
    color: 'bg-[#ea384c]',
    icon: 'Plus',
    emoji: '➕'
  },
  {
    id: 'interjection',
    name: 'Междометие',
    description: 'Выражает эмоции и чувства',
    examples: ['ах!', 'ой!', 'ура!', 'эх!'],
    color: 'bg-[#FEC6A1]',
    icon: 'MessageCircle',
    emoji: '💬'
  }
];

const PartsOfSpeechGallery = () => {
  return (
    <div className="space-y-8 mt-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Галерея частей речи</h2>
        <p className="text-muted-foreground">Нажми на карточку, чтобы узнать больше</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {partsOfSpeech.map((part, index) => (
          <Card 
            key={part.id}
            className="p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2 animate-fade-in border-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className={`w-20 h-20 ${part.color} rounded-3xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                <span className="text-4xl">{part.emoji}</span>
              </div>
              
              <div className="space-y-2 w-full">
                <h3 className="text-xl font-bold">{part.name}</h3>
                <Badge variant="secondary" className="text-xs">
                  {part.id}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {part.description}
              </p>

              <div className="w-full pt-2 border-t">
                <p className="text-xs text-muted-foreground mb-2">Примеры:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {part.examples.map((example, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className={`w-full h-1 ${part.color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-8 bg-white/50 backdrop-blur rounded-3xl border-2">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Icon name="Lightbulb" size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Интересный факт!</h3>
            <p className="text-muted-foreground leading-relaxed">
              В русском языке 10 частей речи: 6 самостоятельных (существительное, прилагательное, числительное, местоимение, глагол, наречие) 
              и 4 служебных (предлог, союз, частица, междометие). Каждая часть речи играет свою уникальную роль в построении предложений!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartsOfSpeechGallery;

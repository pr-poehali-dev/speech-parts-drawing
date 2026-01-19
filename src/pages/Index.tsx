import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PartsOfSpeechGallery from '@/components/PartsOfSpeechGallery';
import AvatarCreator from '@/components/AvatarCreator';
import DrawingCanvas from '@/components/DrawingCanvas';
import Icon from '@/components/ui/icon';

const partsOfSpeech = [
  {
    id: 'noun',
    name: 'Существительное',
    color: '#9b87f5',
    avatar: 'https://cdn.poehali.dev/projects/2fbc329a-fe34-490b-86cd-3a838e76f486/files/ab84f329-b17f-4bf0-8afc-5774cff08256.jpg'
  },
  {
    id: 'verb',
    name: 'Глагол',
    color: '#F97316',
    avatar: 'https://cdn.poehali.dev/projects/2fbc329a-fe34-490b-86cd-3a838e76f486/files/fc32c1aa-2d31-4ba2-acab-7fbc5102ebd2.jpg'
  },
  {
    id: 'adjective',
    name: 'Прилагательное',
    color: '#0EA5E9',
    avatar: 'https://cdn.poehali.dev/projects/2fbc329a-fe34-490b-86cd-3a838e76f486/files/433109b1-1178-412a-b0b2-41e6be028451.jpg'
  },
  {
    id: 'adverb',
    name: 'Наречие',
    color: '#D946EF',
    avatar: 'https://cdn.poehali.dev/projects/2fbc329a-fe34-490b-86cd-3a838e76f486/files/8a9666af-7e62-45e4-bcc5-b941ac9c1fd9.jpg'
  },
  {
    id: 'pronoun',
    name: 'Местоимение',
    color: '#8B5CF6',
    avatar: 'https://cdn.poehali.dev/projects/2fbc329a-fe34-490b-86cd-3a838e76f486/files/30af46df-3be6-49ca-bd8d-aafc4759fc23.jpg'
  },
  {
    id: 'preposition',
    name: 'Предлог',
    color: '#0FA0CE',
    avatar: 'https://cdn.poehali.dev/projects/2fbc329a-fe34-490b-86cd-3a838e76f486/files/795966d1-3730-4731-8f9b-4ec010b387b6.jpg'
  },
  {
    id: 'conjunction',
    name: 'Союз',
    color: '#ea384c',
    avatar: 'https://cdn.poehali.dev/projects/2fbc329a-fe34-490b-86cd-3a838e76f486/files/415972b4-8e93-4f82-b0e0-404ef63024c4.jpg'
  },
  {
    id: 'interjection',
    name: 'Междометие',
    color: '#FEC6A1',
    avatar: 'https://cdn.poehali.dev/projects/2fbc329a-fe34-490b-86cd-3a838e76f486/files/17132a3d-6ad8-482d-8c84-a3b42f363d62.jpg'
  }
];

export default function Index() {
  const [selectedPart, setSelectedPart] = useState(partsOfSpeech[0]);
  const [savedDrawings, setSavedDrawings] = useState<Array<{id: string; image: string; part: string}>>([]);

  const handleSaveDrawing = (imageData: string) => {
    setSavedDrawings([...savedDrawings, {
      id: Date.now().toString(),
      image: imageData,
      part: selectedPart.name
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <header className="container mx-auto px-4 py-8 border-b">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center transform rotate-12 animate-float">
            <Icon name="Sparkles" size={24} className="text-white -rotate-12" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Рисуем части речи
            </h1>
            <p className="text-muted-foreground">Изучай русский язык творчески!</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="gallery" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Icon name="Users" size={16} />
              Аватарки частей речи
            </TabsTrigger>
            <TabsTrigger value="draw" className="flex items-center gap-2">
              <Icon name="Paintbrush" size={16} />
              Рисовать
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Icon name="Sparkles" size={16} />
              Создать
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery">
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">Познакомься с персонажами!</h2>
                <p className="text-muted-foreground">Каждая часть речи имеет своего уникального героя</p>
              </div>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {partsOfSpeech.map((part, index) => (
                  <div
                    key={part.id}
                    className="group cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className="p-6 rounded-3xl border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white"
                      style={{ borderColor: part.color }}
                    >
                      <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-white to-gray-50">
                        <img
                          src={part.avatar}
                          alt={part.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-center" style={{ color: part.color }}>
                        {part.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="draw">
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-4 flex-wrap">
                {partsOfSpeech.map((part) => (
                  <button
                    key={part.id}
                    onClick={() => setSelectedPart(part)}
                    className={`px-6 py-3 rounded-full font-medium transition-all ${
                      selectedPart.id === part.id
                        ? 'ring-2 ring-offset-2 scale-110 text-white'
                        : 'hover:scale-105 bg-white'
                    }`}
                    style={{
                      backgroundColor: selectedPart.id === part.id ? part.color : undefined,
                      borderColor: part.color,
                      color: selectedPart.id === part.id ? 'white' : part.color,
                      border: selectedPart.id === part.id ? 'none' : `2px solid ${part.color}`
                    }}
                  >
                    {part.name}
                  </button>
                ))}
              </div>

              <DrawingCanvas
                partOfSpeech={selectedPart.name}
                color={selectedPart.color}
                onSave={handleSaveDrawing}
              />

              {savedDrawings.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <Icon name="Image" size={24} className="text-primary" />
                    Твои рисунки
                  </h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {savedDrawings.map((drawing) => (
                      <div key={drawing.id} className="p-4 bg-white rounded-xl border-2">
                        <img
                          src={drawing.image}
                          alt={drawing.part}
                          className="w-full rounded-lg mb-2"
                        />
                        <p className="text-sm font-medium text-center">{drawing.part}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="create">
            <AvatarCreator />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
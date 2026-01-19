import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const partsOfSpeechOptions = [
  { value: 'noun', label: 'Существительное', color: '#9b87f5', emoji: '📦' },
  { value: 'verb', label: 'Глагол', color: '#F97316', emoji: '⚡' },
  { value: 'adjective', label: 'Прилагательное', color: '#0EA5E9', emoji: '🎨' },
  { value: 'adverb', label: 'Наречие', color: '#D946EF', emoji: '🚀' },
  { value: 'pronoun', label: 'Местоимение', color: '#8B5CF6', emoji: '👤' },
  { value: 'preposition', label: 'Предлог', color: '#0FA0CE', emoji: '🔗' },
  { value: 'conjunction', label: 'Союз', color: '#ea384c', emoji: '➕' },
  { value: 'interjection', label: 'Междометие', color: '#FEC6A1', emoji: '💬' }
];

interface AvatarData {
  id: string;
  partOfSpeech: string;
  name: string;
  description: string;
  emoji: string;
  color: string;
  createdAt: Date;
}

const emojiOptions = [
  '😀', '😎', '🤓', '🥳', '🤩', '😇', '🤠', '🥰', '😊', '🙂',
  '🐶', '🐱', '🦊', '🐻', '🐼', '🦁', '🐯', '🐨', '🐰', '🦄',
  '🌟', '⭐', '✨', '💫', '🌈', '🎨', '🎭', '🎪', '🎯', '🎲',
  '📚', '📖', '✏️', '🖍️', '🖊️', '📝', '🎓', '🏆', '🎁', '🎉'
];

const AvatarCreator = () => {
  const { toast } = useToast();
  const [selectedPart, setSelectedPart] = useState('');
  const [avatarName, setAvatarName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [savedAvatars, setSavedAvatars] = useState<AvatarData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedPartData = partsOfSpeechOptions.find(p => p.value === selectedPart);

  const handleGenerateRandom = () => {
    if (!selectedPart) {
      toast({
        title: 'Выбери часть речи',
        description: 'Сначала нужно выбрать часть речи для аватарки',
        variant: 'destructive'
      });
      return;
    }

    const randomEmoji = emojiOptions[Math.floor(Math.random() * emojiOptions.length)];
    const randomNames = ['Супер', 'Мега', 'Крутой', 'Весёлый', 'Умный', 'Быстрый', 'Яркий'];
    const randomName = `${randomNames[Math.floor(Math.random() * randomNames.length)]} ${selectedPartData?.label}`;
    
    setSelectedEmoji(randomEmoji);
    setAvatarName(randomName);
    setDescription(`Уникальная аватарка для части речи "${selectedPartData?.label}"`);
  };

  const handleSave = () => {
    if (!selectedPart || !avatarName || !selectedEmoji) {
      toast({
        title: 'Заполни все поля',
        description: 'Выбери часть речи, имя и эмодзи для аватарки',
        variant: 'destructive'
      });
      return;
    }

    const newAvatar: AvatarData = {
      id: Date.now().toString(),
      partOfSpeech: selectedPartData?.label || '',
      name: avatarName,
      description,
      emoji: selectedEmoji,
      color: selectedPartData?.color || '#9b87f5',
      createdAt: new Date()
    };

    setSavedAvatars([newAvatar, ...savedAvatars]);
    
    toast({
      title: '🎉 Аватарка создана!',
      description: `${avatarName} добавлен в галерею`
    });

    setAvatarName('');
    setDescription('');
    setSelectedEmoji('');
  };

  const handleDelete = (id: string) => {
    setSavedAvatars(savedAvatars.filter(a => a.id !== id));
    toast({
      title: 'Удалено',
      description: 'Аватарка удалена из галереи'
    });
  };

  return (
    <div className="space-y-8 mt-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Создай аватарку для части речи</h2>
        <p className="text-muted-foreground">Выбери часть речи и создай уникального персонажа</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="part-select">Часть речи</Label>
            <Select value={selectedPart} onValueChange={setSelectedPart}>
              <SelectTrigger id="part-select">
                <SelectValue placeholder="Выбери часть речи" />
              </SelectTrigger>
              <SelectContent>
                {partsOfSpeechOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className="flex items-center gap-2">
                      <span>{option.emoji}</span>
                      <span>{option.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatar-name">Имя аватарки</Label>
            <Input
              id="avatar-name"
              placeholder="Например: Весёлый Глагол"
              value={avatarName}
              onChange={(e) => setAvatarName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание (необязательно)</Label>
            <Textarea
              id="description"
              placeholder="Расскажи о своей аватарке..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Выбери эмодзи</Label>
            <div className="grid grid-cols-10 gap-2 p-4 bg-muted/30 rounded-xl max-h-48 overflow-y-auto">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedEmoji(emoji)}
                  className={`text-2xl hover:scale-125 transition-transform p-2 rounded-lg ${
                    selectedEmoji === emoji ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-primary/10'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleGenerateRandom} variant="outline" className="flex-1">
              <Icon name="Shuffle" size={18} className="mr-2" />
              Случайная
            </Button>
            <Button onClick={handleSave} className="flex-1">
              <Icon name="Save" size={18} className="mr-2" />
              Сохранить
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Icon name="Eye" size={20} />
              Предпросмотр
            </h3>
            
            {selectedPart && selectedEmoji ? (
              <div className="flex flex-col items-center space-y-4 p-6 bg-muted/30 rounded-2xl">
                <div 
                  className="w-32 h-32 rounded-3xl flex items-center justify-center shadow-xl animate-scale-in"
                  style={{ backgroundColor: selectedPartData?.color }}
                >
                  <span className="text-6xl">{selectedEmoji}</span>
                </div>
                
                <div className="text-center space-y-2">
                  <h4 className="text-2xl font-bold">{avatarName || 'Имя аватарки'}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedPartData?.label}
                  </p>
                  {description && (
                    <p className="text-sm text-muted-foreground pt-2 border-t">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Icon name="ImageOff" size={48} className="mb-4 opacity-30" />
                <p>Выбери часть речи и эмодзи</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {savedAvatars.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Icon name="Sparkles" size={24} className="text-primary" />
            Твои аватарки
          </h3>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {savedAvatars.map((avatar) => (
              <Card key={avatar.id} className="p-6 group hover:shadow-lg transition-all">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div 
                    className="w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: avatar.color }}
                  >
                    <span className="text-4xl">{avatar.emoji}</span>
                  </div>
                  
                  <div className="space-y-1 w-full">
                    <h4 className="font-bold">{avatar.name}</h4>
                    <p className="text-xs text-muted-foreground">{avatar.partOfSpeech}</p>
                    {avatar.description && (
                      <p className="text-xs text-muted-foreground pt-2 border-t">
                        {avatar.description}
                      </p>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(avatar.id)}
                    className="w-full"
                  >
                    <Icon name="Trash2" size={14} className="mr-2" />
                    Удалить
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarCreator;

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { SpeechPart } from '@/types/speech-parts';
import { useToast } from '@/hooks/use-toast';

interface AvatarGeneratorProps {
  speechPart: SpeechPart | null;
  isOpen: boolean;
  onClose: () => void;
  onAvatarGenerated: (speechPartId: string, avatarUrl: string) => void;
}

export default function AvatarGenerator({
  speechPart,
  isOpen,
  onClose,
  onAvatarGenerated,
}: AvatarGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!speechPart || !prompt.trim()) return;

    setIsGenerating(true);

    try {
      const fullPrompt = `Создай яркую креативную аватарку для части речи "${speechPart.name}". ${prompt}. Стиль: современный, красочный, образовательный`;

      const response = await fetch('/backend/generate-avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          speechPartId: speechPart.id,
          prompt: fullPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка генерации');
      }

      const data = await response.json();

      if (data.avatarUrl) {
        onAvatarGenerated(speechPart.id, data.avatarUrl);
        toast({
          title: '✨ Аватар создан!',
          description: `Аватар для ${speechPart.name} успешно сгенерирован`,
        });
        setPrompt('');
        onClose();
      }
    } catch (error) {
      toast({
        title: '❌ Ошибка',
        description: 'Не удалось создать аватар. Попробуйте ещё раз.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (!speechPart) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-3xl">{speechPart.emoji}</span>
            Создать аватар для «{speechPart.name}»
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="prompt">Опишите желаемый образ</Label>
            <Input
              id="prompt"
              placeholder="Например: милый кот в очках с книгой"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <p className="text-xs text-muted-foreground">
              Добавьте детали, чтобы аватар был уникальным
            </p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="text-sm font-medium flex items-center gap-2">
              <Icon name="Lightbulb" size={16} />
              Подсказка
            </p>
            <p className="text-xs text-muted-foreground">{speechPart.description}</p>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full"
            style={{
              backgroundColor: `var(--${speechPart.color})`,
              color: 'white',
            }}
          >
            {isGenerating ? (
              <>
                <Icon name="Loader2" className="mr-2 animate-spin" size={16} />
                Генерация...
              </>
            ) : (
              <>
                <Icon name="Sparkles" className="mr-2" size={16} />
                Создать аватар
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

import { useRef, useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface DrawingCanvasProps {
  partOfSpeech: string;
  color: string;
  onSave?: (imageData: string) => void;
}

const DrawingCanvas = ({ partOfSpeech, color, onSave }: DrawingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(5);
  const [currentColor, setCurrentColor] = useState(color);
  const { toast } = useToast();

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    toast({
      title: 'Холст очищен',
      description: 'Начни рисовать заново!'
    });
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL('image/png');
    if (onSave) {
      onSave(imageData);
    }
    
    toast({
      title: '🎨 Рисунок сохранён!',
      description: `Твой ${partOfSpeech} добавлен в галерею`
    });
  };

  const colors = [
    '#9b87f5', '#F97316', '#0EA5E9', '#D946EF', 
    '#8B5CF6', '#0FA0CE', '#ea384c', '#FEC6A1',
    '#000000', '#FFFFFF', '#FF6B6B', '#4ECDC4'
  ];

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Icon name="Paintbrush" size={20} />
          Нарисуй {partOfSpeech}
        </h3>
        <div className="flex gap-2">
          <Button onClick={clearCanvas} variant="outline" size="sm">
            <Icon name="Eraser" size={16} className="mr-2" />
            Очистить
          </Button>
          <Button onClick={saveDrawing} size="sm">
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full border-2 rounded-xl cursor-crosshair bg-white shadow-lg"
          style={{ borderColor: color, touchAction: 'none' }}
        />

        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
          <div className="flex items-center gap-2">
            <Icon name="Palette" size={18} />
            <span className="text-sm font-medium">Цвет:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setCurrentColor(c)}
                className={`w-8 h-8 rounded-lg transition-all ${
                  currentColor === c ? 'ring-2 ring-offset-2 scale-110' : 'hover:scale-105'
                }`}
                style={{ 
                  backgroundColor: c,
                  ringColor: c,
                  border: c === '#FFFFFF' ? '1px solid #ddd' : 'none'
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
          <div className="flex items-center gap-2">
            <Icon name="Circle" size={18} />
            <span className="text-sm font-medium">Размер кисти:</span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm font-mono w-8 text-center">{brushSize}</span>
        </div>
      </div>
    </Card>
  );
};

export default DrawingCanvas;

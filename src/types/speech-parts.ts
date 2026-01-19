export interface SpeechPart {
  id: string;
  name: string;
  description: string;
  color: string;
  examples: string[];
  emoji: string;
  avatar?: string;
}

export const speechParts: SpeechPart[] = [
  {
    id: 'noun',
    name: 'Существительное',
    description: 'Обозначает предмет, человека или явление',
    color: 'noun',
    emoji: '🎨',
    examples: ['дом', 'кошка', 'радость', 'учитель']
  },
  {
    id: 'verb',
    name: 'Глагол',
    description: 'Обозначает действие или состояние',
    color: 'verb',
    emoji: '⚡',
    examples: ['бежать', 'читать', 'думать', 'спать']
  },
  {
    id: 'adjective',
    name: 'Прилагательное',
    description: 'Описывает признак предмета',
    color: 'adjective',
    emoji: '🌈',
    examples: ['красивый', 'большой', 'умный', 'весёлый']
  },
  {
    id: 'adverb',
    name: 'Наречие',
    description: 'Описывает признак действия',
    color: 'adverb',
    emoji: '✨',
    examples: ['быстро', 'хорошо', 'вчера', 'очень']
  },
  {
    id: 'pronoun',
    name: 'Местоимение',
    description: 'Указывает на предмет, не называя его',
    color: 'pronoun',
    emoji: '👤',
    examples: ['я', 'ты', 'он', 'этот', 'мой']
  },
  {
    id: 'preposition',
    name: 'Предлог',
    description: 'Выражает отношение между словами',
    color: 'preposition',
    emoji: '🔗',
    examples: ['в', 'на', 'под', 'над', 'из']
  },
  {
    id: 'conjunction',
    name: 'Союз',
    description: 'Связывает слова и предложения',
    color: 'conjunction',
    emoji: '🤝',
    examples: ['и', 'но', 'или', 'потому что', 'чтобы']
  },
  {
    id: 'interjection',
    name: 'Междометие',
    description: 'Выражает эмоции и чувства',
    color: 'interjection',
    emoji: '💫',
    examples: ['ах!', 'ура!', 'ой!', 'браво!', 'ух!']
  }
];

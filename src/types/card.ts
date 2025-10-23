export type Locale = 'zh' | 'ja' | 'en';

export interface CardLocaleContent {
  question: string;
  answer: string;
}

export interface Card {
  id: string;
  category: string;
  tags?: string[];
  zh: CardLocaleContent;
  ja: CardLocaleContent;
  en: CardLocaleContent;
}

'use client';

import { create } from 'zustand';
import type { Card, Locale } from '@/types/card';

interface State {
  locale: Locale;
  cards: Card[];
  favorites: Set<string>;
  reviewed: Record<string, number>; // cardId -> score/ease
}

interface Actions {
  setLocale: (l: Locale) => void;
  setCards: (c: Card[]) => void;
  toggleFavorite: (id: string) => void;
  markReviewed: (id: string, score: number) => void;
}

export const useCardStore = create<State & Actions>((set, get) => ({
  locale: 'zh',
  cards: [],
  favorites: new Set(),
  reviewed: {},

  setLocale: (l) => set({ locale: l }),
  setCards: (c) => set({ cards: c }),
  toggleFavorite: (id) => {
    const fav = new Set(get().favorites);
    if (fav.has(id)) fav.delete(id); else fav.add(id);
    set({ favorites: fav });
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(Array.from(fav)));
    }
  },
  markReviewed: (id, score) => {
    const reviewed = { ...get().reviewed, [id]: score };
    set({ reviewed });
    if (typeof window !== 'undefined') {
      localStorage.setItem('reviewed', JSON.stringify(reviewed));
    }
  }
}));

// Rehydrate from localStorage on client
export const rehydrateLocal = () => {
  if (typeof window === 'undefined') return;
  try {
    const fav = JSON.parse(localStorage.getItem('favorites') || '[]');
    const reviewed = JSON.parse(localStorage.getItem('reviewed') || '{}');
    useCardStore.setState({
      favorites: new Set<string>(fav),
      reviewed
    }, false, 'rehydrate');
  } catch {}
};

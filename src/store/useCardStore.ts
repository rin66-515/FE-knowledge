'use client';

import { create } from 'zustand';
import type { Card, Locale } from '@/types/card';

interface State {
  locale: Locale;
  cards: Card[];
  favorites: Set<string>;
  reviewed: Record<string, number>;
  _hydrated: boolean;
}

interface Actions {
  setLocale: (l: Locale) => void;
  setCards: (c: Card[]) => void;
  toggleFavorite: (id: string) => void;
  markReviewed: (id: string, score: number) => void;
  _setHydrated: () => void;
}

// 延迟 localStorage 访问，避免阻塞首屏
const deferredWrite = (key: string, value: string) => {
  if (typeof window === 'undefined') return;
  
  // 使用 requestIdleCallback 或 setTimeout
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      localStorage.setItem(key, value);
    });
  } else {
    setTimeout(() => {
      localStorage.setItem(key, value);
    }, 0);
  }
};

export const useCardStore = create<State & Actions>((set, get) => ({
  locale: 'ja',
  cards: [],
  favorites: new Set(),
  reviewed: {},
  _hydrated: false,

  setLocale: (l) => set({ locale: l }),
  setCards: (c) => set({ cards: c }),
  
  toggleFavorite: (id) => {
    const fav = new Set(get().favorites);
    if (fav.has(id)) fav.delete(id); else fav.add(id);
    set({ favorites: fav });
    deferredWrite('favorites', JSON.stringify(Array.from(fav)));
  },
  
  markReviewed: (id, score) => {
    const reviewed = { ...get().reviewed, [id]: score };
    set({ reviewed });
    deferredWrite('reviewed', JSON.stringify(reviewed));
  },
  
  _setHydrated: () => set({ _hydrated: true })
}));

// 异步恢复 localStorage，不阻塞渲染
export const rehydrateLocal = () => {
  if (typeof window === 'undefined') return;
  
  // 延迟到空闲时恢复
  const restore = () => {
    try {
      const fav = localStorage.getItem('favorites');
      const reviewed = localStorage.getItem('reviewed');
      
      useCardStore.setState({
        favorites: fav ? new Set(JSON.parse(fav)) : new Set(),
        reviewed: reviewed ? JSON.parse(reviewed) : {},
        _hydrated: true
      });
    } catch (e) {
      useCardStore.getState()._setHydrated();
    }
  };
  
  // 使用最低优先级
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(restore, { timeout: 1000 });
  } else {
    setTimeout(restore, 50);
  }
};

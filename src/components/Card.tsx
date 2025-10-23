'use client';

import { useState } from 'react';
import { useCardStore } from '@/store/useCardStore';
import type { Card } from '@/types/card';

export default function CardView({ card }: { card: Card }) {
  const [flipped, setFlipped] = useState(false);
  const locale = useCardStore(s => s.locale);
  const toggleFavorite = useCardStore(s => s.toggleFavorite);
  const favorites = useCardStore(s => s.favorites);
  const markReviewed = useCardStore(s => s.markReviewed);

  const loc = card[locale];
  const fav = favorites.has(card.id);

  return (
    <div className="card relative overflow-hidden">
      <div className="absolute right-3 top-3 flex gap-2">
        <span className="chip">{card.category}</span>
        {card.tags?.map(t => <span key={t} className="chip">{t}</span>)}
      </div>
      <div className="mt-2">
        <div className="text-sm text-slate-300 mb-2">#{card.id}</div>
        <div className="text-lg font-semibold">{flipped ? 'Answer / 解答 / 回答' : 'Question / 题面 / 問題'}</div>
        <p className="mt-2 text-slate-200">{flipped ? loc.answer : loc.question}</p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <button className="btn" onClick={() => setFlipped(v => !v)}>
          {flipped ? 'Show Question' : 'Show Answer'}
        </button>
        <button className="btn" onClick={() => toggleFavorite(card.id)}>
          {fav ? '★ Favorited' : '☆ Favorite'}
        </button>
        <button className="btn" onClick={() => markReviewed(card.id, 3)}>Mark Easy</button>
        <button className="btn" onClick={() => markReviewed(card.id, 2)}>Mark Good</button>
        <button className="btn" onClick={() => markReviewed(card.id, 1)}>Mark Hard</button>
      </div>
    </div>
  );
}

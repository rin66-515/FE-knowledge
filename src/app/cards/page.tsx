'use client';

import { useEffect, useState } from 'react';
import { loadAllCards } from '@/lib/dataLoader';
import CardView from '@/components/Card';
import { useCardStore } from '@/store/useCardStore';

export default function CardsPage() {
  const [loading, setLoading] = useState(true);
  const setCards = useCardStore(s => s.setCards);
  const cards = useCardStore(s => s.cards);

  useEffect(() => {
    (async () => {
      try {
        const data = await loadAllCards();
        setCards(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [setCards]);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Cards</h1>
      {loading ? <div className="text-slate-300">Loading...</div> : null}
      <div className="grid md:grid-cols-2 gap-4">
        {cards.map(c => <CardView key={c.id} card={c} />)}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCardStore } from '@/store/useCardStore';
import { loadAllCards } from '@/lib/dataLoader';
import { getDueCards } from '@/lib/reviewScheduler';
import CardView from '@/components/Card';
import ReviewStats from '@/components/ReviewStats';

export default function ReviewPage() {
  const [loading, setLoading] = useState(true);
  const setCards = useCardStore(s => s.setCards);
  const cards = useCardStore(s => s.cards);
  const reviewed = useCardStore(s => s.reviewed);

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

  const due = useMemo(() => {
    const ids = cards.map(c => c.id);
    const d = getDueCards(ids, reviewed);
    return cards.filter(c => d.includes(c.id));
  }, [cards, reviewed]);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Review</h1>
      <ReviewStats />
      {loading ? <div className="text-slate-300">Loading...</div> : null}
      <div className="grid md:grid-cols-2 gap-4">
        {due.map(c => <CardView key={c.id} card={c} />)}
      </div>
      {(!loading && due.length === 0) ? (
        <div className="card text-slate-300">All caught up! 🎉</div>
      ) : null}
    </div>
  );
}

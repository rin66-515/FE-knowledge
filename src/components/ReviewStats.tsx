'use client';

import { useMemo } from 'react';
import { useCardStore } from '@/store/useCardStore';

export default function ReviewStats() {
  const cards = useCardStore(s => s.cards);
  const reviewed = useCardStore(s => s.reviewed);
  const stats = useMemo(() => {
    const total = cards.length;
    const done = Object.keys(reviewed).length;
    const hard = Object.values(reviewed).filter(v => v <= 1).length;
    return { total, done, hard };
  }, [cards, reviewed]);

  return (
    <div className="card">
      <div className="text-lg font-semibold mb-2">Progress</div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-slate-400">Cards</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.done}</div>
          <div className="text-slate-400">Reviewed</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.hard}</div>
          <div className="text-slate-400">Need Work</div>
        </div>
      </div>
    </div>
  );
}

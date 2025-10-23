'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCardStore } from '@/store/useCardStore';
import { loadAllCards } from '@/lib/dataLoader';
import { getDueCards } from '@/lib/reviewScheduler';
import CardView from '@/components/Card';
import ReviewStats from '@/components/ReviewStats';

// 卡片骨架屏组件
function CardSkeleton({ index }: { index: number }) {
  return (
    <div 
      className="card-skeleton stagger-item"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="card-skeleton-header"></div>
      <div className="card-skeleton-title"></div>
      <div className="card-skeleton-content">
        <div className="card-skeleton-line"></div>
        <div className="card-skeleton-line"></div>
        <div className="card-skeleton-line"></div>
      </div>
      <div className="card-skeleton-buttons">
        <div className="card-skeleton-button"></div>
        <div className="card-skeleton-button"></div>
      </div>
    </div>
  );
}

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
    <div className="grid gap-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
          Daily Review
        </h1>
        <p className="text-slate-400 mt-2">
          Review your due cards using spaced repetition / 使用间隔重复法复习卡片
        </p>
      </div>

      {/* 复习统计 */}
      <div className="fade-in" style={{ animationDelay: '100ms' }}>
        <ReviewStats />
      </div>

      {/* 进度指示器 */}
      {!loading && due.length > 0 && (
        <div className="card fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Review Progress</span>
            <span className="text-sm font-semibold text-brand-400">
              {due.length} cards to review
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      )}

      {/* 卡片列表 */}
      <div className="grid md:grid-cols-2 gap-4">
        {loading ? (
          // 显示骨架屏
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <CardSkeleton key={index} index={index} />
            ))}
          </>
        ) : due.length > 0 ? (
          // 显示待复习卡片
          due.map((c, index) => (
            <CardView key={c.id} card={c} index={index} />
          ))
        ) : (
          // 完成状态
          <div className="col-span-2 card text-center py-16 fade-in">
            <div className="text-8xl mb-6 animate-bounce-subtle">🎉</div>
            <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text mb-3">
              All Caught Up!
            </h3>
            <p className="text-slate-400 text-lg mb-6">
              You've reviewed all your due cards for today!
              <br />
              今天的卡片已全部复习完成！
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <div className="text-center">
                <div className="text-4xl mb-2">✅</div>
                <div className="text-sm text-slate-400">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-sm text-slate-400">Great Job</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🔥</div>
                <div className="text-sm text-slate-400">Keep Going</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

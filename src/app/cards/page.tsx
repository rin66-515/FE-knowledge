'use client';

import { useEffect, useState } from 'react';
import { loadAllCards } from '@/lib/dataLoader';
import CardView from '@/components/Card';
import { useCardStore } from '@/store/useCardStore';

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
    <div className="grid gap-6">
      <div className="fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
          Knowledge Cards
        </h1>
        <p className="text-slate-400 mt-2">
          Browse and review all your knowledge cards / 浏览所有知识卡片
        </p>
      </div>

      {/* 统计信息 */}
      {!loading && cards.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 fade-in">
          <div className="card text-center">
            <div className="text-3xl font-bold text-brand-400">{cards.length}</div>
            <div className="text-sm text-slate-400 mt-1">Total Cards</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-400">
              {cards.filter(c => c.category).length}
            </div>
            <div className="text-sm text-slate-400 mt-1">Categories</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-yellow-400">⭐</div>
            <div className="text-sm text-slate-400 mt-1">Featured</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-400">📚</div>
            <div className="text-sm text-slate-400 mt-1">Learning</div>
          </div>
        </div>
      )}

      {/* 卡片列表 */}
      <div className="grid md:grid-cols-2 gap-4">
        {loading ? (
          // 显示骨架屏
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} index={index} />
            ))}
          </>
        ) : cards.length > 0 ? (
          // 显示实际卡片
          cards.map((c, index) => (
            <CardView key={c.id} card={c} index={index} />
          ))
        ) : (
          // 空状态
          <div className="col-span-2 card text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No Cards Yet
            </h3>
            <p className="text-slate-400">
              Start adding knowledge cards to begin your learning journey!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

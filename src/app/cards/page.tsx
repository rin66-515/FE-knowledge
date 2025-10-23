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
  const locale = useCardStore(s => s.locale);

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

  // 三语文本
  const title = {
    zh: '知识卡片',
    ja: 'ナレッジカード',
    en: 'Knowledge Cards'
  }[locale];

  const subtitle = {
    zh: '浏览和复习所有知识卡片',
    ja: 'すべてのナレッジカードを閲覧・復習',
    en: 'Browse and review all your knowledge cards'
  }[locale];

  const totalCardsLabel = {
    zh: '总卡片数',
    ja: '総カード数',
    en: 'Total Cards'
  }[locale];

  const categoriesLabel = {
    zh: '分类数',
    ja: 'カテゴリ数',
    en: 'Categories'
  }[locale];

  const featuredLabel = {
    zh: '特色',
    ja: '注目',
    en: 'Featured'
  }[locale];

  const learningLabel = {
    zh: '学习中',
    ja: '学習中',
    en: 'Learning'
  }[locale];

  const noCardsTitle = {
    zh: '还没有卡片',
    ja: 'まだカードがありません',
    en: 'No Cards Yet'
  }[locale];

  const noCardsDesc = {
    zh: '开始添加知识卡片，开启你的学习之旅！',
    ja: 'ナレッジカードを追加して、学習の旅を始めましょう！',
    en: 'Start adding knowledge cards to begin your learning journey!'
  }[locale];

  return (
    <div className="grid gap-6">
      <div className="smooth-enter">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-slate-400 mt-2">
          {subtitle}
        </p>
      </div>

      {/* 统计信息 */}
      {!loading && cards.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 enter-delay-1">
          <div className="card text-center">
            <div className="text-3xl font-bold text-brand-400">{cards.length}</div>
            <div className="text-sm text-slate-400 mt-1">{totalCardsLabel}</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-green-400">
              {cards.filter(c => c.category).length}
            </div>
            <div className="text-sm text-slate-400 mt-1">{categoriesLabel}</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-yellow-400">⭐</div>
            <div className="text-sm text-slate-400 mt-1">{featuredLabel}</div>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-purple-400">📚</div>
            <div className="text-sm text-slate-400 mt-1">{learningLabel}</div>
          </div>
        </div>
      )}

      {/* 卡片列表 */}
      <div className="grid md:grid-cols-2 gap-6">
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
              {noCardsTitle}
            </h3>
            <p className="text-slate-400">
              {noCardsDesc}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

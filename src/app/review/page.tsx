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

  const due = useMemo(() => {
    const ids = cards.map(c => c.id);
    const d = getDueCards(ids, reviewed);
    return cards.filter(c => d.includes(c.id));
  }, [cards, reviewed]);

  // 三语文本
  const title = {
    zh: '每日复习',
    ja: '毎日のレビュー',
    en: 'Daily Review'
  }[locale];

  const subtitle = {
    zh: '使用间隔重复法复习卡片',
    ja: '間隔反復法でカードを復習',
    en: 'Review your due cards using spaced repetition'
  }[locale];

  const progressLabel = {
    zh: '复习进度',
    ja: 'レビュー進捗',
    en: 'Review Progress'
  }[locale];

  const cardsToReview = {
    zh: '张卡片待复习',
    ja: '枚のカードをレビュー',
    en: 'cards to review'
  }[locale];

  const allCaughtUp = {
    zh: '全部完成！',
    ja: '完了しました！',
    en: 'All Caught Up!'
  }[locale];

  const congratsMessage = {
    zh: '今天的卡片已全部复习完成！',
    ja: '今日のカードはすべて復習済みです！',
    en: "You've reviewed all your due cards for today!"
  }[locale];

  const completed = {
    zh: '已完成',
    ja: '完了',
    en: 'Completed'
  }[locale];

  const greatJob = {
    zh: '干得好',
    ja: 'よくできました',
    en: 'Great Job'
  }[locale];

  const keepGoing = {
    zh: '继续加油',
    ja: '頑張って',
    en: 'Keep Going'
  }[locale];

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-slate-400 mt-2">
          {subtitle}
        </p>
      </div>

      {/* 复习统计 */}
      <div>
        <ReviewStats />
      </div>

      {/* 进度指示器 */}
      {!loading && due.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">{progressLabel}</span>
            <span className="text-sm font-semibold text-brand-400">
              {due.length} {cardsToReview}
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
      <div className="grid md:grid-cols-2 gap-6">
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
          <div className="col-span-2 card text-center py-16">
            <div className="text-8xl mb-6">🎉</div>
            <h3 className="text-2xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text mb-3">
              {allCaughtUp}
            </h3>
            <p className="text-slate-400 text-lg mb-6">
              {congratsMessage}
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <div className="text-center">
                <div className="text-4xl mb-2">✅</div>
                <div className="text-sm text-slate-400">{completed}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🏆</div>
                <div className="text-sm text-slate-400">{greatJob}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🔥</div>
                <div className="text-sm text-slate-400">{keepGoing}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

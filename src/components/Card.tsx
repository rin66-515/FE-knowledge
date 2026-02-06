"use client";

import { useState, useRef } from "react";
import { useCardStore } from "@/store/useCardStore";
import type { Card } from "@/types/card";

export default function CardView({
  card,
  index = 0,
}: {
  card: Card;
  index?: number;
}) {
  const [flipped, setFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const locale = useCardStore((s) => s.locale);
  const toggleFavorite = useCardStore((s) => s.toggleFavorite);
  const favorites = useCardStore((s) => s.favorites);
  const markReviewed = useCardStore((s) => s.markReviewed);

  const loc = card[locale];
  const fav = favorites.has(card.id);

  // 翻转处理
  const handleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setFlipped((v) => !v);

    // 动画完成后重置状态
    setTimeout(() => {
      setIsFlipping(false);
    }, 600);
  };

  // 三语文本
  const questionTitle = {
    zh: "问题",
    ja: "問題",
    en: "Question",
  }[locale];

  const answerTitle = {
    zh: "答案",
    ja: "回答",
    en: "Answer",
  }[locale];

  const showAnswer = {
    zh: "显示答案",
    ja: "回答を表示",
    en: "Show Answer",
  }[locale];

  const showQuestion = {
    zh: "显示问题",
    ja: "問題を表示",
    en: "Show Question",
  }[locale];

  const easyText = {
    zh: "简单",
    ja: "簡単",
    en: "Easy",
  }[locale];

  const goodText = {
    zh: "一般",
    ja: "普通",
    en: "Good",
  }[locale];

  const hardText = {
    zh: "困难",
    ja: "難しい",
    en: "Hard",
  }[locale];

  return (
    <div
      ref={cardRef}
      className="card-flip-container smooth-enter"
      style={{
        perspective: "1000px",
        animationDelay: `${Math.min(index * 0.03, 0.3)}s`,
      }}
    >
      <div
        className={`card-flip-inner ${flipped ? "flipped" : ""} ${isFlipping ? "flipping" : ""}`}
      >
        {/* 卡片前面 - 问题 */}
        <div className="card card-flip-face card-flip-front relative overflow-hidden">
          {/* 标签区域 */}
          <div className="absolute right-3 top-3 flex gap-2 flex-wrap justify-end z-10">
            <span className="chip chip-category">{card.category}</span>
            {card.tags?.map((t) => (
              <span key={t} className="chip chip-tag">
                {t}
              </span>
            ))}
          </div>

          {/* 收藏标记 */}
          {fav && (
            <div className="absolute left-3 top-3 text-yellow-400 text-xl z-10">
              ★
            </div>
          )}

          {/* 内容区域 */}
          <div className="mt-2 pt-8">
            <div className="text-sm text-slate-400 mb-3 font-mono">
              #{card.id}
            </div>
            <div className="text-lg font-semibold mb-4 text-brand-300 flex items-center gap-2">
              <span className="text-2xl">❓</span>
              <span>{questionTitle}</span>
            </div>
            <div className="card-content text-slate-200 min-h-[80px] leading-relaxed">
              {loc.question.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              className="btn btn-primary flex-1"
              onClick={handleFlip}
              disabled={isFlipping}
            >
              <span className="btn-icon">🔄</span>
              <span>{showAnswer}</span>
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => toggleFavorite(card.id)}
              title={
                fav
                  ? {
                      zh: "取消收藏",
                      ja: "お気に入り解除",
                      en: "Unfavorite",
                    }[locale]
                  : {
                      zh: "添加收藏",
                      ja: "お気に入りに追加",
                      en: "Add to favorites",
                    }[locale]
              }
            >
              <span className="text-lg">{fav ? "★" : "☆"}</span>
            </button>
          </div>
        </div>

        {/* 卡片背面 - 答案 */}
        <div className="card card-flip-face card-flip-back relative overflow-hidden">
          {/* 标签区域 */}
          <div className="absolute right-3 top-3 flex gap-2 flex-wrap justify-end z-10">
            <span className="chip chip-category">{card.category}</span>
            {card.tags?.map((t) => (
              <span key={t} className="chip chip-tag">
                {t}
              </span>
            ))}
          </div>

          {/* 收藏标记 */}
          {fav && (
            <div className="absolute left-3 top-3 text-yellow-400 text-xl z-10">
              ★
            </div>
          )}

          {/* 内容区域 */}
          <div className="mt-2 pt-8">
            <div className="text-sm text-slate-400 mb-3 font-mono">
              #{card.id}
            </div>
            <div className="text-lg font-semibold mb-4 text-green-400 flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span>{answerTitle}</span>
            </div>
            <div className="card-content text-slate-200 min-h-[80px] leading-relaxed">
              {loc.answer.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="mt-6 space-y-2">
            <button
              className="btn btn-primary w-full"
              onClick={handleFlip}
              disabled={isFlipping}
            >
              <span className="btn-icon">🔄</span>
              <span>{showQuestion}</span>
            </button>

            <div className="grid grid-cols-3 gap-2">
              <button
                className="btn btn-success text-sm"
                onClick={() => markReviewed(card.id, 3)}
                title={
                  {
                    zh: "简单 - 5天后复习",
                    ja: "簡単 - 5日後にレビュー",
                    en: "Easy - Review in 5 days",
                  }[locale]
                }
              >
                😊 {easyText}
              </button>
              <button
                className="btn btn-warning text-sm"
                onClick={() => markReviewed(card.id, 2)}
                title={
                  {
                    zh: "一般 - 3天后复习",
                    ja: "普通 - 3日後にレビュー",
                    en: "Good - Review in 3 days",
                  }[locale]
                }
              >
                😐 {goodText}
              </button>
              <button
                className="btn btn-danger text-sm"
                onClick={() => markReviewed(card.id, 1)}
                title={
                  {
                    zh: "困难 - 1天后复习",
                    ja: "難しい - 1日後にレビュー",
                    en: "Hard - Review in 1 day",
                  }[locale]
                }
              >
                😓 {hardText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

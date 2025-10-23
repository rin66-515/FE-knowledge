'use client';

import Link from 'next/link';
import { useCardStore } from '@/store/useCardStore';

export default function HomePage() {
  const locale = useCardStore(s => s.locale);

  // 多语言文本
  const title = 'FE Knowledge Cards';
  
  const subtitle = {
    zh: '日本基本情報技術者試験（FE）— 三语（中文 / 日本語 / English）知识卡片平台。通过卡片化学习 + 间隔复习，帮助你高效备考。',
    ja: '基本情報技術者試験（FE）対策 — 三ヶ国語（中文 / 日本語 / English）のナレッジカードプラットフォーム。カード学習と間隔反復で効率的に合格を目指しましょう。',
    en: 'Fundamental Information Technology Engineer Examination (FE) - Trilingual (中文 / 日本語 / English) knowledge card platform. Master with flashcards and spaced repetition.'
  }[locale];

  const startLearning = {
    zh: '开始学习',
    ja: '学習を始める',
    en: 'Start Learning'
  }[locale];

  const reviewToday = {
    zh: '今日复习',
    ja: '今日の復習',
    en: 'Review Today'
  }[locale];

  const knowledgeGraph = {
    zh: '知识图谱',
    ja: 'ナレッジグラフ',
    en: 'Knowledge Graph'
  }[locale];

  const featuresTitle = {
    zh: '功能特性',
    ja: '機能',
    en: "What's inside"
  }[locale];

  const features = {
    zh: [
      '三语卡片：中文 / 日本語 / English',
      '可翻转卡片：问题 / 答案',
      '收藏与复习标记',
      '本地持久化存储',
      '交互式知识图谱',
      '间隔重复学习算法'
    ],
    ja: [
      '三ヶ国語対応：中文 / 日本語 / English',
      'フリップ可能なカード：問題 / 解答',
      'お気に入りと復習マーク',
      'ローカルストレージ永続化',
      'インタラクティブなナレッジグラフ',
      '間隔反復学習アルゴリズム'
    ],
    en: [
      'Trilingual cards: 中文 / 日本語 / English',
      'Flippable cards: Question / Answer',
      'Favorites and review markers',
      'Local persistent storage',
      'Interactive knowledge graph',
      'Spaced repetition algorithm'
    ]
  }[locale];

  return (
    <div className="grid gap-6">
      <section className="card smooth-enter">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-slate-300 mt-2 leading-relaxed">
          {subtitle}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/cards" className="btn btn-primary">
            {startLearning}
          </Link>
          <Link href="/review" className="btn btn-secondary">
            {reviewToday}
          </Link>
          <Link href="/graph" className="btn btn-outline">
            {knowledgeGraph}
          </Link>
        </div>
      </section>

      <section className="card enter-delay-1">
        <h2 className="text-xl font-semibold text-brand-300">
          {featuresTitle}
        </h2>
        <ul className="mt-4 grid gap-3 text-slate-300">
          {features.map((feature, index) => (
            <li 
              key={index} 
              className="flex items-start gap-3 stagger-item"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="text-brand-400 mt-1">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

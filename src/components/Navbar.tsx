'use client';

import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useCardStore } from '@/store/useCardStore';

export default function Navbar() {
  const locale = useCardStore(s => s.locale);

  // 三语导航文本
  const navTexts = {
    cards: { zh: '卡片', ja: 'カード', en: 'Cards' }[locale],
    review: { zh: '复习', ja: 'レビュー', en: 'Review' }[locale],
    graph: { zh: '图谱', ja: 'グラフ', en: 'Graph' }[locale],
    login: { zh: '登录', ja: 'ログイン', en: 'Login' }[locale],
    admin: { zh: '管理', ja: '管理', en: 'Admin' }[locale],
  };

  return (
    <nav className="w-full border-b border-slate-800 bg-slate-900/40 backdrop-blur sticky top-0 z-50">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img src="/icons/logo.svg" alt="logo" className="w-7 h-7" />
          <span className="font-semibold hidden sm:inline">FE Knowledge Cards</span>
          <span className="font-semibold sm:hidden">FEKC</span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link 
            href="/cards" 
            className="hover:text-brand-400 transition-colors text-sm sm:text-base"
          >
            {navTexts.cards}
          </Link>
          <Link 
            href="/review" 
            className="hover:text-brand-400 transition-colors text-sm sm:text-base"
          >
            {navTexts.review}
          </Link>
          <Link 
            href="/graph" 
            className="hover:text-brand-400 transition-colors text-sm sm:text-base"
          >
            {navTexts.graph}
          </Link>
          <Link 
            href="/login" 
            className="hover:text-brand-400 transition-colors text-sm sm:text-base hidden md:inline"
          >
            {navTexts.login}
          </Link>
          <Link 
            href="/admin" 
            className="hover:text-brand-400 transition-colors text-sm sm:text-base hidden md:inline"
          >
            {navTexts.admin}
          </Link>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}

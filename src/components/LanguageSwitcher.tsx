'use client';

import { useCardStore } from '@/store/useCardStore';
import type { Locale } from '@/types/card';

const labels: Record<Locale, string> = {
  zh: '中文',
  ja: '日本語',
  en: 'EN'
};

export function LanguageSwitcher() {
  const locale = useCardStore(s => s.locale);
  const setLocale = useCardStore(s => s.setLocale);

  return (
    <div className="flex items-center gap-1 bg-slate-800 rounded-xl p-1">
      {(['zh','ja','en'] as Locale[]).map(l => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          className={`px-3 py-1 rounded-lg ${locale===l ? 'bg-brand-600' : 'hover:bg-slate-700'}`}
          aria-pressed={locale===l}
        >
          {labels[l]}
        </button>
      ))}
    </div>
  );
}

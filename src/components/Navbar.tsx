'use client';

import Link from 'next/link';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function Navbar() {
  return (
    <nav className="w-full border-b border-slate-800 bg-slate-900/40 backdrop-blur sticky top-0 z-50">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="flex items-center gap-2">
          <img src="/icons/logo.svg" alt="logo" className="w-7 h-7" />
          <span className="font-semibold">FE Knowledge Cards</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/cards">Cards</Link>
          <Link href="/review">Review</Link>
          <Link href="/graph">Graph</Link>
          <Link href="/login">Login</Link>
          <Link href="/admin">Admin</Link>
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
}

import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import PerformanceMonitor from '@/components/PerformanceMonitor';
import type { ReactNode } from 'react';
import { rehydrateLocal } from '@/store/useCardStore';

export const metadata = {
  title: 'ナレッジカード - Knowledge Cards',
  description: '間隔反復学習システムを備えた多言語ナレッジカードシステム',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  if (typeof window !== 'undefined') {
    rehydrateLocal();
  }
  return (
    <html lang="ja">
      <head>
        {/* 预连接到外部资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* 视口优化 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* 主题色 */}
        <meta name="theme-color" content="#0b1220" />
      </head>
      <body>
        {/* 性能监控 */}
        <PerformanceMonitor />
        
        <Navbar />
        <main className="container py-6">{children}</main>
      </body>
    </html>
  );
}

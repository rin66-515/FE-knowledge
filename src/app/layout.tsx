import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';
import { rehydrateLocal } from '@/store/useCardStore';

// 延迟加载性能监控组件，不阻塞首屏渲染
const PerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'), {
  ssr: false,
  loading: () => null
});

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
        {/* DNS 预解析和预连接 */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 预加载关键资源 */}
        <link rel="preload" href="/cards/all.json" as="fetch" crossOrigin="anonymous" />
        
        {/* 视口优化 */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        
        {/* 主题色和 PWA 元数据 */}
        <meta name="theme-color" content="#0b1220" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* 性能优化提示 */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
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

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// 懒加载 GraphView 组件，优化首次加载
const GraphView = dynamic(() => import('@/components/GraphView'), { 
  ssr: false,
  loading: () => (
    <div className="card">
      <div className="text-lg font-semibold mb-4 text-center sm:text-left">
        Knowledge Graph
      </div>
      <div className="relative w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-800/30" style={{ minHeight: '300px' }}>
        <div className="skeleton-graph absolute inset-0 flex flex-col items-center justify-center space-y-6">
          {/* 快速骨架屏 */}
          <div className="relative w-full max-w-2xl h-full">
            <div className="skeleton-node absolute left-1/2 top-8 -translate-x-1/2"></div>
            <div className="skeleton-node absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 animation-delay-100"></div>
            <div className="skeleton-node absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 animation-delay-200"></div>
            <div className="skeleton-node absolute left-1/4 bottom-8 -translate-x-1/2 animation-delay-300"></div>
            <div className="skeleton-node absolute left-3/4 bottom-8 -translate-x-1/2 animation-delay-400"></div>
          </div>
          <div className="flex items-center space-x-2 text-slate-400 z-10">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-500"></div>
            <span className="text-sm">Loading graph component...</span>
          </div>
        </div>
      </div>
    </div>
  ),
});

export default function GraphPage() {
  return (
    <div className="grid gap-4 lazy-load">
      <h1 className="text-2xl font-semibold fade-in">Knowledge Graph</h1>
      <Suspense fallback={
        <div className="card animate-pulse">
          <div className="h-8 w-48 bg-slate-700 rounded mb-4"></div>
          <div className="h-64 bg-slate-800 rounded"></div>
        </div>
      }>
        <GraphView />
      </Suspense>
    </div>
  );
}

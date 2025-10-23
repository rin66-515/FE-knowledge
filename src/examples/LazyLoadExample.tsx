/**
 * 懒加载组件使用示例
 * 展示如何使用 LazyLoadWrapper 和性能优化工具
 */

'use client';

import LazyLoadWrapper from '@/components/LazyLoadWrapper';
import { prefetchNextPage } from '@/lib/performanceOptimizer';

// 示例 1: 基础懒加载
export function BasicLazyLoadExample() {
  return (
    <LazyLoadWrapper>
      <div className="card">
        <h2>懒加载内容</h2>
        <p>这个组件只在进入视口时才会加载和渲染</p>
      </div>
    </LazyLoadWrapper>
  );
}

// 示例 2: 自定义占位符
export function CustomPlaceholderExample() {
  return (
    <LazyLoadWrapper
      placeholder={
        <div className="card bg-slate-800/50 animate-pulse">
          <div className="h-8 w-48 bg-slate-700 rounded mb-4"></div>
          <div className="h-4 w-full bg-slate-700 rounded mb-2"></div>
          <div className="h-4 w-3/4 bg-slate-700 rounded"></div>
        </div>
      }
    >
      <div className="card">
        <h2>带自定义占位符的内容</h2>
        <p>加载前显示自定义的骨架屏</p>
      </div>
    </LazyLoadWrapper>
  );
}

// 示例 3: 配置懒加载阈值
export function ConfiguredLazyLoadExample() {
  return (
    <LazyLoadWrapper
      threshold={0.5}           // 50%可见时加载
      rootMargin="200px"        // 提前200px预加载
      minHeight="300px"         // 最小高度
    >
      <div className="card">
        <h2>自定义配置的懒加载</h2>
        <p>更精细的加载时机控制</p>
      </div>
    </LazyLoadWrapper>
  );
}

// 示例 4: 图片列表懒加载
export function ImageListLazyLoadExample() {
  const images = [
    { id: 1, title: '图片 1', src: '/images/1.jpg' },
    { id: 2, title: '图片 2', src: '/images/2.jpg' },
    { id: 3, title: '图片 3', src: '/images/3.jpg' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image) => (
        <LazyLoadWrapper key={image.id} minHeight="200px">
          <div className="card">
            <img 
              src={image.src} 
              alt={image.title}
              className="w-full h-48 object-cover rounded-lg"
              loading="lazy" // 原生懒加载
            />
            <h3 className="mt-2 font-semibold">{image.title}</h3>
          </div>
        </LazyLoadWrapper>
      ))}
    </div>
  );
}

// 示例 5: 重量级组件懒加载
export function HeavyComponentExample() {
  // 动态导入重量级组件
  const DynamicChart = dynamic(
    () => import('./HeavyChart'),
    {
      loading: () => (
        <div className="card skeleton-graph">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
          </div>
        </div>
      ),
      ssr: false, // 禁用服务端渲染
    }
  );

  return (
    <LazyLoadWrapper>
      <DynamicChart />
    </LazyLoadWrapper>
  );
}

// 示例 6: 预加载下一页
export function PrefetchExample() {
  const handleMouseEnter = () => {
    // 鼠标悬停时预加载下一页
    prefetchNextPage('/next-page');
  };

  return (
    <a 
      href="/next-page"
      onMouseEnter={handleMouseEnter}
      className="btn"
    >
      下一页 (悬停预加载)
    </a>
  );
}

// 示例 7: 条件懒加载
export function ConditionalLazyLoadExample({ shouldLoad }: { shouldLoad: boolean }) {
  if (!shouldLoad) {
    return <div className="card">内容被隐藏</div>;
  }

  return (
    <LazyLoadWrapper>
      <div className="card">
        <h2>条件性懒加载内容</h2>
        <p>只在特定条件下懒加载</p>
      </div>
    </LazyLoadWrapper>
  );
}

// 示例 8: 分页内容懒加载
export function InfiniteScrollExample() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<number[]>([1, 2, 3]);

  const loadMore = () => {
    // 模拟加载更多
    setItems((prev) => [...prev, ...Array.from({ length: 3 }, (_, i) => prev.length + i + 1)]);
    setPage((p) => p + 1);
  };

  return (
    <div>
      {items.map((item) => (
        <LazyLoadWrapper key={item} minHeight="150px">
          <div className="card mb-4">
            <h3>项目 {item}</h3>
            <p>这是懒加载的内容项</p>
          </div>
        </LazyLoadWrapper>
      ))}
      
      <button onClick={loadMore} className="btn w-full">
        加载更多
      </button>
    </div>
  );
}

// 导出所有示例
export default {
  BasicLazyLoadExample,
  CustomPlaceholderExample,
  ConfiguredLazyLoadExample,
  ImageListLazyLoadExample,
  HeavyComponentExample,
  PrefetchExample,
  ConditionalLazyLoadExample,
  InfiniteScrollExample,
};

// 需要导入的依赖
import dynamic from 'next/dynamic';
import { useState } from 'react';


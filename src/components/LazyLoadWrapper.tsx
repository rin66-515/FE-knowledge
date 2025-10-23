'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface LazyLoadWrapperProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  placeholder?: ReactNode;
  minHeight?: string;
}

/**
 * 懒加载包装器组件
 * 使用 Intersection Observer API 实现组件级别的懒加载
 * 优化首次加载性能
 */
export default function LazyLoadWrapper({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '100px',
  placeholder,
  minHeight = '200px',
}: LazyLoadWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true);
            // 延迟标记为已加载，确保平滑过渡
            setTimeout(() => setHasLoaded(true), 100);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div
      ref={containerRef}
      className={`lazy-load ${className}`}
      style={{
        minHeight: !hasLoaded ? minHeight : 'auto',
        transition: 'min-height 0.3s ease-out',
      }}
    >
      {!isVisible && (
        <div className="w-full h-full flex items-center justify-center">
          {placeholder || (
            <div className="skeleton-placeholder w-full rounded-xl bg-slate-800/30 animate-pulse">
              <div className="flex items-center justify-center h-full min-h-[200px]">
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-12 h-12 border-4 border-slate-700 border-t-brand-500 rounded-full animate-spin"></div>
                  <span className="text-sm text-slate-500">Loading content...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {isVisible && (
        <div className={`fade-in ${hasLoaded ? 'will-change-transform' : ''}`}>
          {children}
        </div>
      )}
    </div>
  );
}


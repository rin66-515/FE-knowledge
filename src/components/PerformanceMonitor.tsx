'use client';

import { useEffect } from 'react';
import { 
  preloadCriticalResources,
  markPerformance,
  measurePerformance,
  getNetworkQuality,
  isLowEndDevice 
} from '@/lib/performanceOptimizer';
import { preloadCards } from '@/lib/dataLoader';

/**
 * 性能监控组件
 * 在应用启动时初始化性能优化和监控
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    // 标记应用启动
    markPerformance('app-init-start');

    // 预加载关键资源
    preloadCriticalResources();
    
    // 预加载卡片数据（在空闲时）
    preloadCards();

    // 检测设备和网络状况
    const networkQuality = getNetworkQuality();
    const isLowEnd = isLowEndDevice();

    // 记录设备信息
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Performance Monitor Initialized');
      console.log('📱 Device:', {
        lowEnd: isLowEnd,
        cores: navigator.hardwareConcurrency,
        memory: (navigator as any).deviceMemory || 'unknown',
      });
      console.log('🌐 Network:', {
        quality: networkQuality,
        type: (navigator as any).connection?.effectiveType || 'unknown',
      });
    }

    // 监听页面可见性变化
    const handleVisibilityChange = () => {
      if (document.hidden) {
        markPerformance('page-hidden');
      } else {
        markPerformance('page-visible');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 监听页面加载完成
    const handleLoad = () => {
      markPerformance('app-init-end');
      measurePerformance('app-init', 'app-init-start', 'app-init-end');

      // 报告核心 Web Vitals
      if ('PerformanceObserver' in window) {
        try {
          // Largest Contentful Paint (LCP)
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            console.log('📊 LCP:', lastEntry.renderTime || lastEntry.loadTime);
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

          // First Input Delay (FID)
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              console.log('📊 FID:', entry.processingStart - entry.startTime);
            });
          });
          fidObserver.observe({ type: 'first-input', buffered: true });

          // Cumulative Layout Shift (CLS)
          let clsValue = 0;
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value;
              }
            });
            console.log('📊 CLS:', clsValue);
          });
          clsObserver.observe({ type: 'layout-shift', buffered: true });
        } catch (e) {
          // PerformanceObserver not fully supported
        }
      }
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // 优化策略提示
    if (networkQuality === 'slow') {
      console.warn('⚠️ Slow network detected - enabling data saver mode');
    }

    if (isLowEnd) {
      console.warn('⚠️ Low-end device detected - reducing animations');
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // 这个组件不渲染任何可见内容
  return null;
}


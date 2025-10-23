/**
 * 性能优化工具集
 * 提供资源预加载、懒加载和性能监控功能
 */

// 预加载关键资源
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;

  // 预加载字体
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.as = 'font';
  fontPreload.type = 'font/woff2';
  fontPreload.crossOrigin = 'anonymous';

  // 预连接到外部资源
  const preconnect = document.createElement('link');
  preconnect.rel = 'preconnect';
  preconnect.href = 'https://fonts.googleapis.com';

  document.head.appendChild(preconnect);
};

// 懒加载图片
export const lazyLoadImages = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px',
  });

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
};

// 预加载下一页内容
export const prefetchNextPage = (url: string) => {
  if (typeof window === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = url;
  document.head.appendChild(link);
};

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// 检测网络连接质量
export const getNetworkQuality = (): 'slow' | 'fast' | 'unknown' => {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return 'unknown';
  }

  const connection = (navigator as any).connection;
  const effectiveType = connection?.effectiveType;

  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return 'slow';
  }

  return 'fast';
};

// 判断是否为低性能设备
export const isLowEndDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;

  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;

  // 设备内存小于4GB或CPU核心数小于4认为是低端设备
  return (memory && memory < 4) || (cores && cores < 4);
};

// 优化动画性能
export const shouldReduceMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// 请求空闲回调
export const requestIdleCallback = (callback: () => void, timeout = 2000) => {
  if (typeof window === 'undefined') return;

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout });
  } else {
    setTimeout(callback, 1);
  }
};

// 性能标记
export const markPerformance = (name: string) => {
  if (typeof window === 'undefined' || !window.performance) return;
  
  try {
    window.performance.mark(name);
  } catch (e) {
    // Silently fail if performance API is not available
  }
};

// 测量性能
export const measurePerformance = (name: string, startMark: string, endMark: string) => {
  if (typeof window === 'undefined' || !window.performance) return;
  
  try {
    window.performance.measure(name, startMark, endMark);
    const measure = window.performance.getEntriesByName(name)[0];
    console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`);
  } catch (e) {
    // Silently fail if performance API is not available
  }
};

// 优化Canvas渲染
export const optimizeCanvas = (canvas: HTMLCanvasElement): CanvasRenderingContext2D | null => {
  const ctx = canvas.getContext('2d', {
    alpha: false, // 禁用透明度通道以提升性能
    desynchronized: true, // 减少延迟
  });

  if (!ctx) return null;

  // 设置图像平滑
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  return ctx;
};

// 批量更新DOM
export const batchDOMUpdates = (updates: Array<() => void>) => {
  requestAnimationFrame(() => {
    updates.forEach((update) => update());
  });
};

// 检测是否支持WebP
export const supportsWebP = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
};

// 优化配置
export const PERFORMANCE_CONFIG = {
  // 防抖延迟
  DEBOUNCE_DELAY: 150,
  
  // 节流延迟
  THROTTLE_DELAY: 100,
  
  // 懒加载阈值
  LAZY_LOAD_THRESHOLD: 0.1,
  
  // 懒加载边距
  LAZY_LOAD_ROOT_MARGIN: '100px',
  
  // 动画持续时间
  ANIMATION_DURATION: {
    fast: 200,
    normal: 300,
    slow: 500,
  },
  
  // 图片质量
  IMAGE_QUALITY: {
    low: 0.6,
    medium: 0.8,
    high: 0.95,
  },
};

// 导出所有优化功能
export default {
  preloadCriticalResources,
  lazyLoadImages,
  prefetchNextPage,
  debounce,
  throttle,
  getNetworkQuality,
  isLowEndDevice,
  shouldReduceMotion,
  requestIdleCallback,
  markPerformance,
  measurePerformance,
  optimizeCanvas,
  batchDOMUpdates,
  supportsWebP,
  PERFORMANCE_CONFIG,
};


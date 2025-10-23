/**
 * 性能优化工具集
 * 提供资源预加载、懒加载和性能监控功能
 */

// 预加载关键资源
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;

  // 预连接到外部资源（DNS 预解析）
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  domains.forEach(domain => {
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = domain;
    preconnect.crossOrigin = 'anonymous';
    document.head.appendChild(preconnect);
  });

  // 预加载关键数据文件
  const dataPreload = document.createElement('link');
  dataPreload.rel = 'preload';
  dataPreload.as = 'fetch';
  dataPreload.href = '/cards/all.json';
  dataPreload.crossOrigin = 'anonymous';
  document.head.appendChild(dataPreload);

  console.log('🚀 Critical resources preloaded');
};

// 懒加载图片
export const lazyLoadImages = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    // 降级：直接加载所有图片
    document.querySelectorAll('img[data-src]').forEach((img) => {
      const element = img as HTMLImageElement;
      const src = element.dataset.src;
      if (src) {
        element.src = src;
        element.removeAttribute('data-src');
      }
    });
    return;
  }

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          // 创建临时图片对象预加载
          const tempImg = new Image();
          tempImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            img.removeAttribute('data-src');
          };
          tempImg.src = src;
          imageObserver.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '100px', // 提前 100px 开始加载
    threshold: 0.01
  });

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
  
  console.log('🖼️ Image lazy loading initialized');
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


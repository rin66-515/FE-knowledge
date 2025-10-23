'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { 
  shouldReduceMotion, 
  isLowEndDevice,
  markPerformance,
  measurePerformance 
} from '@/lib/performanceOptimizer';

// 响应式图形组件，优化首次加载性能，带有骨架屏和渐进式渲染
export default function GraphView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const animationFrameRef = useRef<number>();
  const reduceMotion = useRef(false);
  const isLowEnd = useRef(false);

  // 防抖函数，优化重绘性能
  const debounce = useCallback((func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    };
  }, []);

  // 计算响应式尺寸
  const calculateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const aspectRatio = 2.1; // 宽高比
    
    let width = Math.min(containerWidth, 1200); // 最大宽度限制
    let height = Math.round(width / aspectRatio);
    
    // 移动端优化
    if (containerWidth < 768) {
      width = containerWidth - 32; // 减去 padding
      height = Math.max(200, Math.round(width / aspectRatio));
    }
    
    setDimensions({ width, height });
  }, []);

  // 渐进式绘制图形（带动画效果）
  const drawGraph = useCallback((progress: number = 1) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width: W, height: H } = dimensions;
    
    // 设置高DPI支持
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    // 节点数据
    const nodes = [
      { x: W * 0.5, y: H * 0.15, label: '信息系统 / 情報システム / IS' },
      { x: W * 0.25, y: H * 0.45, label: '算法 / アルゴリズム' },
      { x: W * 0.75, y: H * 0.45, label: '网络 / ネットワーク' },
      { x: W * 0.25, y: H * 0.75, label: '复杂度 / 計算量' },
      { x: W * 0.75, y: H * 0.75, label: 'TCP/IP' }
    ];

    // 清空画布
    ctx.clearRect(0, 0, W, H);
    
    // 渐进式绘制连接线
    if (progress >= 0.3) {
      const lineProgress = Math.min((progress - 0.3) / 0.3, 1);
      ctx.strokeStyle = `rgba(59, 130, 246, ${0.4 * lineProgress})`;
      ctx.lineWidth = 2;
      ctx.shadowColor = `rgba(59, 130, 246, ${0.3 * lineProgress})`;
      ctx.shadowBlur = 4;

      // 绘制连接线
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.lineTo(nodes[1].x, nodes[1].y);
      ctx.moveTo(nodes[0].x, nodes[0].y);
      ctx.lineTo(nodes[2].x, nodes[2].y);
      ctx.moveTo(nodes[1].x, nodes[1].y);
      ctx.lineTo(nodes[3].x, nodes[3].y);
      ctx.moveTo(nodes[2].x, nodes[2].y);
      ctx.lineTo(nodes[4].x, nodes[4].y);
      ctx.stroke();
    }

    // 重置阴影
    ctx.shadowBlur = 0;

    // 渐进式绘制节点
    nodes.forEach((node, index) => {
      const nodeProgress = Math.max(0, Math.min((progress - index * 0.15) / 0.15, 1));
      if (nodeProgress <= 0) return;

      const radius = W < 600 ? 12 : 16;
      const fontSize = W < 600 ? 10 : 12;
      
      // 节点背景（带缩放动画）
      const animatedRadius = radius * nodeProgress;
      ctx.fillStyle = `rgba(59, 130, 246, ${0.9 * nodeProgress})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, animatedRadius, 0, Math.PI * 2);
      ctx.fill();

      // 节点边框
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * nodeProgress})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // 节点标签（淡入效果）
      if (nodeProgress > 0.5) {
        const labelProgress = (nodeProgress - 0.5) / 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${labelProgress})`;
        ctx.font = `${fontSize}px system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // 处理长文本换行
        const words = node.label.split(' ');
        const lineHeight = fontSize * 1.2;
        const startY = node.y - radius - 20;
        
        words.forEach((word, wordIndex) => {
          ctx.fillText(word, node.x, startY + wordIndex * lineHeight);
        });
      }
    });
  }, [dimensions]);

  // 动画渲染控制
  const animateRender = useCallback(() => {
    markPerformance('graph-render-start');
    
    // 如果用户偏好减少动画或低端设备，直接渲染完成状态
    if (reduceMotion.current || isLowEnd.current) {
      drawGraph(1);
      setRenderProgress(1);
      setIsRendering(false);
      markPerformance('graph-render-end');
      measurePerformance('graph-render', 'graph-render-start', 'graph-render-end');
      return;
    }

    let startTime: number | null = null;
    const duration = isLowEnd.current ? 600 : 1200; // 低端设备缩短动画时间

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 使用缓动函数
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setRenderProgress(easeOutCubic);
      drawGraph(easeOutCubic);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setIsRendering(false);
        markPerformance('graph-render-end');
        measurePerformance('graph-render', 'graph-render-start', 'graph-render-end');
      }
    };

    setIsRendering(true);
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [drawGraph]);

  // 初始化性能检测
  useEffect(() => {
    reduceMotion.current = shouldReduceMotion();
    isLowEnd.current = isLowEndDevice();
    markPerformance('graph-component-mount');
  }, []);

  // 初始化 - 使用 Intersection Observer 实现可见性检测
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            markPerformance('graph-visible');
            // 元素进入视口时才加载
            const timer = setTimeout(() => {
              setIsLoaded(true);
            }, 50);
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' } // 提前50px开始加载
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isLoaded]);

  // 响应式处理
  useEffect(() => {
    if (!isLoaded) return;

    calculateDimensions();
    
    const debouncedResize = debounce(() => {
      calculateDimensions();
    }, 150);

    window.addEventListener('resize', debouncedResize);
    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isLoaded, calculateDimensions, debounce]);

  // 绘制图形（带动画）
  useEffect(() => {
    if (isLoaded && dimensions.width > 0 && !isRendering) {
      // 取消之前的动画
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // 启动渐进式渲染动画
      animateRender();
    }
  }, [isLoaded, dimensions, isRendering, animateRender]);

  return (
    <div className="card fade-in">
      <div className="text-lg font-semibold mb-4 text-center sm:text-left responsive-text">
        Knowledge Graph
      </div>
      
      <div 
        ref={containerRef}
        className="graph-container overflow-hidden rounded-xl border border-slate-700 bg-slate-800/30 relative"
      >
        {/* 骨架屏加载效果 */}
        {!isLoaded && (
          <div className="skeleton-graph absolute inset-0 flex flex-col items-center justify-center p-8 space-y-6">
            {/* 骨架节点 */}
            <div className="relative w-full max-w-2xl h-full">
              {/* 顶部节点骨架 */}
              <div className="skeleton-node absolute left-1/2 top-8 -translate-x-1/2"></div>
              
              {/* 中间层节点骨架 */}
              <div className="skeleton-node absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 animation-delay-100"></div>
              <div className="skeleton-node absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 animation-delay-200"></div>
              
              {/* 底部节点骨架 */}
              <div className="skeleton-node absolute left-1/4 bottom-8 -translate-x-1/2 animation-delay-300"></div>
              <div className="skeleton-node absolute left-3/4 bottom-8 -translate-x-1/2 animation-delay-400"></div>
              
              {/* 连接线骨架 */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <line x1="50%" y1="15%" x2="25%" y2="50%" className="skeleton-line" strokeWidth="2" />
                <line x1="50%" y1="15%" x2="75%" y2="50%" className="skeleton-line" strokeWidth="2" />
                <line x1="25%" y1="50%" x2="25%" y2="85%" className="skeleton-line" strokeWidth="2" />
                <line x1="75%" y1="50%" x2="75%" y2="85%" className="skeleton-line" strokeWidth="2" />
              </svg>
            </div>
            
            {/* 加载提示 */}
            <div className="flex items-center space-x-2 text-slate-400 z-10">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-brand-500"></div>
              <span className="text-sm">Preparing visualization...</span>
            </div>
          </div>
        )}
        
        {/* Canvas画布 */}
        <canvas
          ref={canvasRef}
          className={`block w-full h-auto transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        
        {/* 渲染进度指示器 */}
        {isLoaded && isRendering && (
          <div className="absolute bottom-2 right-2 flex items-center space-x-2 bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <div className="h-1.5 w-20 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-100 ease-out"
                style={{ width: `${renderProgress * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-slate-400">
              {Math.round(renderProgress * 100)}%
            </span>
          </div>
        )}
      </div>
      
      <p className="text-slate-400 mt-3 text-sm text-center sm:text-left responsive-text">
        Interactive knowledge graph visualization. Optimized for all devices.
      </p>
    </div>
  );
}

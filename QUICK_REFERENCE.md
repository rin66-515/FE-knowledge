# 快速参考指南 / Quick Reference Guide

## 🚀 核心优化特性速查

### 1️⃣ 骨架屏加载

```tsx
// 自动包含在 GraphView 组件中
import GraphView from '@/components/GraphView';

<GraphView /> // 自带骨架屏效果
```

**效果**: 精美的脉动节点动画 + 闪烁背景

---

### 2️⃣ 懒加载组件

```tsx
import LazyLoadWrapper from '@/components/LazyLoadWrapper';

// 基础用法
<LazyLoadWrapper>
  <YourComponent />
</LazyLoadWrapper>

// 高级配置
<LazyLoadWrapper
  threshold={0.1}        // 10%可见时加载
  rootMargin="100px"     // 提前100px预加载
  minHeight="200px"      // 占位高度
  placeholder={<Skeleton />}  // 自定义占位符
>
  <YourComponent />
</LazyLoadWrapper>
```

---

### 3️⃣ 动态导入

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  {
    loading: () => <LoadingSpinner />,
    ssr: false,  // 禁用服务端渲染
  }
);
```

---

### 4️⃣ 性能工具

```tsx
import { 
  debounce,
  throttle,
  markPerformance,
  measurePerformance,
  isLowEndDevice,
  shouldReduceMotion,
  getNetworkQuality,
} from '@/lib/performanceOptimizer';

// 防抖
const handleSearch = debounce((query) => {
  // 搜索逻辑
}, 300);

// 节流
const handleScroll = throttle(() => {
  // 滚动处理
}, 100);

// 性能标记
markPerformance('operation-start');
// ... 执行操作
markPerformance('operation-end');
measurePerformance('operation', 'operation-start', 'operation-end');

// 设备检测
if (isLowEndDevice()) {
  // 降低动画质量
}

if (shouldReduceMotion()) {
  // 跳过动画
}

const networkQuality = getNetworkQuality(); // 'slow' | 'fast' | 'unknown'
```

---

### 5️⃣ 响应式 CSS 类

```tsx
// 在 globals.css 中已定义的工具类

<div className="lazy-load">        {/* 懒加载容器 */}
<div className="fade-in">          {/* 淡入动画 */}
<div className="skeleton-graph">   {/* 骨架屏背景 */}
<div className="skeleton-node">    {/* 骨架节点 */}
<div className="responsive-text">  {/* 响应式文字 */}
<div className="will-change-transform"> {/* 性能提示 */}

// 动画延迟
<div className="animation-delay-100">  {/* 延迟100ms */}
<div className="animation-delay-200">  {/* 延迟200ms */}
<div className="animation-delay-300">  {/* 延迟300ms */}
<div className="animation-delay-400">  {/* 延迟400ms */}
```

---

## 📱 响应式断点

```css
/* 移动端 */
@media (max-width: 768px) { }

/* 平板端 */
@media (min-width: 768px) and (max-width: 1024px) { }

/* 桌面端 */
@media (min-width: 1024px) { }
```

---

## 🎨 骨架屏样式

```tsx
// 使用预定义的骨架屏样式
<div className="skeleton-graph">
  <div className="skeleton-node" />
  <div className="skeleton-node animation-delay-100" />
  <div className="skeleton-node animation-delay-200" />
</div>
```

---

## ⚡ 性能优化检查清单

```
✅ 使用 LazyLoadWrapper 包装非关键组件
✅ 使用 dynamic() 动态导入大型组件
✅ 为用户操作添加防抖/节流
✅ 使用 skeleton 提供即时反馈
✅ 优化图片使用 loading="lazy"
✅ 减少不必要的 re-render
✅ 使用 useMemo/useCallback 缓存
✅ 监控性能指标
```

---

## 🔧 常见模式

### 图片懒加载
```tsx
<img 
  data-src="/path/to/image.jpg"
  loading="lazy"
  alt="description"
/>
```

### 条件渲染优化
```tsx
{isVisible && (
  <LazyLoadWrapper>
    <ExpensiveComponent />
  </LazyLoadWrapper>
)}
```

### 无限滚动
```tsx
const [items, setItems] = useState([]);

{items.map(item => (
  <LazyLoadWrapper key={item.id}>
    <ItemCard item={item} />
  </LazyLoadWrapper>
))}

<button onClick={loadMore}>加载更多</button>
```

### 预加载下一页
```tsx
import { prefetchNextPage } from '@/lib/performanceOptimizer';

<Link 
  href="/next-page"
  onMouseEnter={() => prefetchNextPage('/next-page')}
>
  下一页
</Link>
```

---

## 🎯 性能监控

### 查看性能指标

打开浏览器控制台：
```javascript
// 查看所有性能标记
performance.getEntriesByType('mark')

// 查看所有测量
performance.getEntriesByType('measure')

// 清除标记
performance.clearMarks()
performance.clearMeasures()
```

---

## 📊 核心 Web Vitals 目标

| 指标 | 目标 | 描述 |
|------|------|------|
| LCP | < 2.5s | 最大内容绘制 |
| FID | < 100ms | 首次输入延迟 |
| CLS | < 0.1 | 累积布局偏移 |

---

## 🐛 调试技巧

### Chrome DevTools

1. **Performance 面板**
   - 录制性能
   - 查看火焰图
   - 分析主线程活动

2. **Network 面板**
   - 查看资源加载
   - 检查瀑布图
   - 模拟慢速网络

3. **Lighthouse**
   - 运行性能审计
   - 查看优化建议
   - 追踪进度

### React DevTools

1. **Profiler**
   - 录制渲染
   - 查看组件渲染时间
   - 识别性能瓶颈

---

## 💡 优化建议

### DO ✅
- 使用懒加载减少初始 bundle
- 为用户交互提供即时反馈
- 监控和测量性能
- 使用骨架屏而非加载器
- 优化图片和资源

### DON'T ❌
- 不要同步导入大型组件
- 不要在没有防抖的情况下频繁更新
- 不要忽视性能指标
- 不要过度使用动画
- 不要加载不需要的资源

---

## 📖 文档链接

- [详细优化文档](./PERFORMANCE_OPTIMIZATION.md)
- [优化总结](./OPTIMIZATION_SUMMARY.md)
- [使用示例](./src/examples/LazyLoadExample.tsx)

---

## 🆘 常见问题

### Q: 如何禁用动画？
A: 组件会自动检测 `prefers-reduced-motion` 设置

### Q: 如何优化移动端性能？
A: 组件已自动适配，低端设备会减少动画

### Q: 如何查看性能指标？
A: 打开浏览器控制台，性能监控器会自动输出

### Q: 懒加载不生效？
A: 检查是否支持 IntersectionObserver，或检查阈值设置

---

**最后更新**: 2025-10-23  
**版本**: v2.0


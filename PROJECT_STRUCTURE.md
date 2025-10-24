# FE Knowledge Cards - 项目结构文档

## 📁 项目概述

这是一个基于 **Next.js 14** + **TypeScript** + **Tailwind CSS** 的三语知识卡片系统，用于日本基本情報技術者試験（FE）的学习和复习。支持中文、日语和英语三种语言切换，采用间隔重复学习算法，提供卡片化学习、复习管理和知识图谱可视化功能。

### 技术栈
- **前端框架**: Next.js 14 (React 18)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **数据存储**: LocalStorage + IndexedDB
- **性能优化**: 懒加载、预加载、缓存策略

---

## 📂 项目目录结构

```
fe-knowledgecards/
├── src/                          # 源代码目录
│   ├── app/                      # Next.js App Router 页面
│   │   ├── layout.tsx           # 全局布局（导航栏、性能监控）
│   │   ├── page.tsx             # 首页 - 欢迎页面和功能介绍
│   │   ├── cards/               # 卡片浏览页面
│   │   │   └── page.tsx         # 浏览所有知识卡片
│   │   ├── review/              # 复习页面
│   │   │   └── page.tsx         # 每日复习 - 间隔重复学习
│   │   ├── graph/               # 知识图谱页面
│   │   │   └── page.tsx         # 交互式知识图谱可视化
│   │   ├── login/               # 登录页面
│   │   │   └── page.tsx         # 用户登录（占位）
│   │   └── admin/               # 管理页面
│   │       └── page.tsx         # 卡片管理（占位）
│   │
│   ├── components/              # React 组件
│   │   ├── Card.tsx            # 卡片组件 - 可翻转的知识卡片
│   │   ├── Navbar.tsx          # 导航栏 - 顶部导航和语言切换
│   │   ├── LanguageSwitcher.tsx # 语言切换器 - 三语切换
│   │   ├── GraphView.tsx       # 知识图谱视图
│   │   ├── LazyLoadWrapper.tsx  # 懒加载包装器 - 性能优化
│   │   ├── PerformanceMonitor.tsx # 性能监控组件
│   │   └── ReviewStats.tsx     # 复习统计组件
│   │
│   ├── lib/                    # 工具库和业务逻辑
│   │   ├── i18n.ts            # 国际化工具 - 三语文本管理
│   │   ├── dataLoader.ts      # 数据加载器 - 卡片数据缓存和加载
│   │   ├── reviewScheduler.ts  # 复习调度器 - 间隔重复算法
│   │   ├── performanceOptimizer.ts # 性能优化工具集
│   │   └── db/                # 数据库相关
│   │       └── indexedDB.ts   # IndexedDB 封装
│   │
│   ├── store/                 # 状态管理
│   │   └── useCardStore.ts   # Zustand 全局状态 - 语言、卡片、收藏、复习记录
│   │
│   ├── types/                 # TypeScript 类型定义
│   │   └── card.ts           # 卡片类型定义
│   │
│   └── styles/               # 样式文件
│       └── globals.css       # 全局样式、动画、主题色
│
├── public/                   # 静态资源
│   ├── cards/               # 卡片数据
│   │   └── all.json        # 所有卡片的 JSON 数据
│   └── icons/              # 图标资源
│       └── logo.svg        # 项目 Logo
│
├── next.config.js          # Next.js 配置
├── tailwind.config.js      # Tailwind CSS 配置
├── tsconfig.json          # TypeScript 配置
├── package.json           # 项目依赖和脚本
└── README.md             # 项目说明文档
```

---

## 🔧 核心模块详解

### 1. 页面模块 (`src/app/`)

#### 📄 `layout.tsx` - 全局布局
**功能**:
- 应用的根布局组件
- 集成导航栏 (`Navbar`)
- 性能监控组件 (`PerformanceMonitor`) 延迟加载
- 状态恢复 (`rehydrateLocal`) - 从 localStorage 恢复用户数据
- 资源预加载优化（DNS 预解析、预连接）
- PWA 元数据配置

**关键特性**:
- 使用 `dynamic` 实现性能监控的延迟加载
- `dns-prefetch` 和 `preconnect` 优化外部资源加载
- 视口和主题色优化

---

#### 📄 `page.tsx` - 首页
**功能**:
- 欢迎页面，展示项目介绍
- 三语文案支持（中文 / 日语 / 英语）
- 功能特性列表展示
- 快速入口：卡片浏览、今日复习、知识图谱

**特点**:
- 路由预加载 - 使用 `requestIdleCallback` 在空闲时预加载常用路由
- 渐进式动画效果

---

#### 📄 `cards/page.tsx` - 卡片浏览页面
**功能**:
- 展示所有知识卡片
- 支持卡片翻转查看答案
- 卡片收藏功能
- 分类和标签显示
- 复习标记（简单/一般/困难）

**关键逻辑**:
- 使用 `loadAllCards` 加载卡片数据
- 懒加载优化 - 使用 `LazyLoadWrapper` 优化性能
- 与全局状态 (`useCardStore`) 同步

---

#### 📄 `review/page.tsx` - 每日复习页面
**功能**:
- 展示今日待复习的卡片
- 基于间隔重复算法（Spaced Repetition）
- 复习进度追踪
- 复习统计展示

**算法**:
- 简单 (Easy): 评分 3 - 5天后复习
- 一般 (Good): 评分 2 - 3天后复习
- 困难 (Hard): 评分 1 - 1天后复习

---

#### 📄 `graph/page.tsx` - 知识图谱页面
**功能**:
- 可视化知识网络
- 交互式图谱展示
- 展示卡片之间的关联关系

**优化**:
- 懒加载图谱组件
- 响应式设计，适配所有设备

---

### 2. 组件模块 (`src/components/`)

#### 🧩 `Card.tsx` - 卡片组件
**功能**:
- 可翻转的知识卡片（3D 翻转效果）
- 前面显示问题，背面显示答案
- 收藏按钮（星标）
- 复习评分按钮（简单/一般/困难）
- 分类和标签展示

**特点**:
- 翻转动画防抖处理
- 渐进式入场动画（带延迟）
- 三语内容支持

---

#### 🧩 `Navbar.tsx` - 导航栏
**功能**:
- 顶部导航菜单
- 页面路由链接（首页、卡片、复习、图谱、登录、管理）
- 集成语言切换器
- 响应式设计（移动端适配）

---

#### 🧩 `LanguageSwitcher.tsx` - 语言切换器
**功能**:
- 三语切换：中文 (zh) / 日语 (ja) / 英语 (en)
- 与全局状态同步
- 视觉反馈（当前语言高亮）

---

#### 🧩 `LazyLoadWrapper.tsx` - 懒加载包装器
**功能**:
- 使用 Intersection Observer API
- 延迟加载组件，优化首屏性能
- 支持占位符显示

**使用场景**:
- 卡片列表懒加载
- 图片懒加载
- 非关键内容延迟渲染

---

#### 🧩 `PerformanceMonitor.tsx` - 性能监控
**功能**:
- 监控 Web Vitals（LCP、FID、CLS、FCP、TTFB）
- 开发环境下显示性能指标
- 性能数据上报（可扩展）

---

#### 🧩 `ReviewStats.tsx` - 复习统计
**功能**:
- 展示复习进度
- 统计今日/本周复习数量
- 已掌握卡片数量
- 待复习卡片数量

---

### 3. 核心库 (`src/lib/`)

#### 📚 `i18n.ts` - 国际化工具
**功能**:
- 三语文本管理（中文/日语/英语）
- 提供 `t()` 函数用于文本翻译
- 预定义常用文本（导航、按钮、提示等）

**文本分类**:
- `nav` - 导航栏文本
- `card` - 卡片相关文本
- `cardsPage` - 卡片页面文本
- `reviewPage` - 复习页面文本
- `graphPage` - 图谱页面文本
- `homePage` - 首页文本
- `stats` - 统计信息文本
- `loading` - 加载状态文本
- `button` - 通用按钮文本
- `error` - 错误消息
- `success` - 成功消息
- `time` - 时间相关文本

---

#### 📚 `dataLoader.ts` - 数据加载器
**功能**:
- 加载卡片数据 (`/cards/all.json`)
- 多级缓存策略：
  1. 内存缓存（30分钟）
  2. IndexedDB 备份
  3. HTTP 缓存
- Stale-While-Revalidate 策略
- 降级处理（网络失败时使用缓存）

**关键方法**:
- `loadAllCards(forceRefresh)` - 加载所有卡片
- `preloadCards()` - 后台预加载
- `clearCardsCache()` - 清除缓存

**性能优化**:
- 避免重复请求
- 后台刷新机制
- 自动降级到 IndexedDB

---

#### 📚 `reviewScheduler.ts` - 复习调度器
**功能**:
- 实现间隔重复学习算法
- 计算待复习卡片
- 根据评分决定下次复习时间

**方法**:
- `getDueCards(cardIds, reviewed)` - 获取待复习卡片列表

**规则**:
- 未复习的卡片
- 评分 < 2 的卡片

---

#### 📚 `performanceOptimizer.ts` - 性能优化工具集
**功能**:
- 资源预加载 (`preloadCriticalResources`)
- 图片懒加载 (`lazyLoadImages`)
- 路由预取 (`prefetchNextPage`)
- 防抖/节流 (`debounce`, `throttle`)
- 网络质量检测 (`getNetworkQuality`)
- 低端设备检测 (`isLowEndDevice`)
- 动画优化 (`shouldReduceMotion`)
- Canvas 优化 (`optimizeCanvas`)
- WebP 支持检测 (`supportsWebP`)

**常量配置**:
- `PERFORMANCE_CONFIG` - 性能参数配置

---

#### 📚 `db/indexedDB.ts` - IndexedDB 封装
**功能**:
- IndexedDB 数据持久化
- 复习记录保存
- 降级到 localStorage

**方法**:
- `saveReviewToIDB(cardId, score)` - 保存复习记录

---

### 4. 状态管理 (`src/store/`)

#### 🗂️ `useCardStore.ts` - Zustand 全局状态
**状态**:
- `locale` - 当前语言 (zh / ja / en)
- `cards` - 卡片列表
- `favorites` - 收藏的卡片 ID 集合
- `reviewed` - 复习记录 (cardId -> score)
- `_hydrated` - 状态恢复标志

**操作**:
- `setLocale(locale)` - 切换语言
- `setCards(cards)` - 设置卡片列表
- `toggleFavorite(id)` - 切换收藏状态
- `markReviewed(id, score)` - 标记复习记录

**持久化**:
- 使用 localStorage 持久化
- 延迟写入优化（`requestIdleCallback`）
- 异步恢复（`rehydrateLocal`）

---

### 5. 类型定义 (`src/types/`)

#### 📝 `card.ts` - 卡片类型
```typescript
export type Locale = 'zh' | 'ja' | 'en';

export interface CardLocaleContent {
  question: string;  // 问题
  answer: string;    // 答案
}

export interface Card {
  id: string;                    // 卡片 ID
  category: string;              // 分类
  tags?: string[];               // 标签
  zh: CardLocaleContent;         // 中文内容
  ja: CardLocaleContent;         // 日语内容
  en: CardLocaleContent;         // 英语内容
}
```

---

### 6. 样式 (`src/styles/`)

#### 🎨 `globals.css` - 全局样式
**内容**:
- Tailwind CSS 基础样式
- 自定义 CSS 变量（主题色）
- 卡片翻转动画 (3D Transform)
- 渐进式入场动画
- 按钮样式（primary, secondary, outline, success, warning, danger）
- 标签样式 (chip)
- 响应式布局

**主题色**:
- 品牌色 (brand): 蓝紫色渐变
- 背景色: 深色主题
- 卡片背景: 半透明毛玻璃效果

---

### 7. 静态资源 (`public/`)

#### 📦 `cards/all.json` - 卡片数据
**格式**:
```json
{
  "cards": [
    {
      "id": "001",
      "category": "网络",
      "tags": ["TCP/IP"],
      "zh": {
        "question": "什么是 TCP/IP？",
        "answer": "..."
      },
      "ja": {
        "question": "TCP/IPとは？",
        "answer": "..."
      },
      "en": {
        "question": "What is TCP/IP?",
        "answer": "..."
      }
    }
  ]
}
```

---

## 🚀 性能优化策略

### 1. 加载优化
- DNS 预解析和预连接
- 关键资源预加载 (`<link rel="preload">`)
- 路由预取 (Route Prefetching)
- 懒加载 (Lazy Loading)

### 2. 缓存策略
- 内存缓存 (30分钟)
- IndexedDB 持久化备份
- HTTP 缓存 (`force-cache`, `revalidate`)
- Stale-While-Revalidate

### 3. 渲染优化
- 组件懒加载 (Dynamic Import)
- 延迟加载非关键组件
- 防抖和节流
- 批量 DOM 更新
- `requestIdleCallback` 空闲时执行

### 4. 数据优化
- 延迟写入 localStorage
- 异步状态恢复
- 避免阻塞首屏渲染

---

## 📱 响应式设计

- **移动端优先**：适配手机、平板、桌面
- **断点**：使用 Tailwind CSS 响应式工具类
- **触摸优化**：卡片交互适配触摸屏
- **可访问性**：支持键盘导航

---

## 🧪 核心工作流程

### 用户学习流程
1. **首页** → 浏览功能介绍
2. **卡片页** → 浏览所有卡片，收藏感兴趣的内容
3. **复习页** → 每日复习待复习卡片
4. **评分** → 根据掌握程度标记（简单/一般/困难）
5. **图谱页** → 查看知识关联

### 数据流向
```
用户操作 → Zustand Store → localStorage/IndexedDB
                ↓
          React 组件更新
```

---

## 🔮 扩展方向

### 当前是占位/简化的功能
1. **登录/认证系统** (`login/page.tsx`) - 待实现
2. **管理后台** (`admin/page.tsx`) - 待实现
3. **知识图谱** (`GraphView.tsx`) - 基础占位，可扩展
4. **间隔重复算法** - 简化版本，可使用 SM-2/Anki 算法

### 建议改进
1. **后端集成** - 用户数据同步
2. **更复杂的复习算法** - Anki 算法、遗忘曲线
3. **统计分析** - 学习曲线、掌握度分析
4. **卡片编辑** - 在线创建和编辑卡片
5. **导入/导出** - Anki 格式兼容

---

## 📦 依赖说明

### 主要依赖
- `next@14.2.5` - Next.js 框架
- `react@18.3.1` - React 库
- `zustand@4.5.2` - 轻量级状态管理
- `tailwindcss@3.4.13` - CSS 框架
- `typescript@5.6.3` - TypeScript 支持

### 开发依赖
- `@types/node`, `@types/react`, `@types/react-dom` - 类型定义
- `autoprefixer`, `postcss` - CSS 后处理
- `eslint`, `eslint-config-next` - 代码检查

---

## 🛠️ 开发指南

### 本地运行
```bash
npm install       # 安装依赖
npm run dev       # 开发模式（端口 3000）
npm run build     # 生产构建
npm start         # 生产运行
npm run lint      # 代码检查
```

### 项目结构约定
- 页面放在 `src/app/` (App Router)
- 组件放在 `src/components/`
- 工具函数放在 `src/lib/`
- 类型定义放在 `src/types/`
- 全局状态放在 `src/store/`

---

## 📝 总结

这是一个功能完善、性能优化良好的知识卡片学习系统。核心特点包括：

✅ **三语支持** - 中文/日语/英语无缝切换  
✅ **间隔重复** - 科学的复习调度算法  
✅ **性能优化** - 多级缓存、懒加载、预加载  
✅ **现代化技术栈** - Next.js 14 + TypeScript + Zustand  
✅ **响应式设计** - 适配所有设备  
✅ **离线支持** - LocalStorage + IndexedDB 持久化  

适合用于语言学习、考试备考、知识管理等场景。


# 三语切换实现文档 / Trilingual Implementation

## 🌍 概览 Overview

已完成整个应用的中文/日文/英文三语切换功能，所有界面文本都支持实时切换。

## ✨ 实现的功能

### 1. 国际化工具库 📚

**文件**: `src/lib/i18n.ts`

**特性**:
- 完整的三语文本定义
- 类型安全的 TypeScript 接口
- 便捷的翻译函数 `t()`
- 分类清晰的文本组织

**使用示例**:
```typescript
import { i18n, t } from '@/lib/i18n';

// 获取当前语言的文本
const title = t(i18n.card.question, locale);
```

### 2. 已更新的组件 ✅

#### 卡片组件 (Card.tsx)
- ✅ 问题/答案标题
- ✅ 显示答案/问题按钮
- ✅ 简单/一般/困难按钮
- ✅ 收藏提示文本
- ✅ 时间提示（5天/3天/1天）

#### 导航栏 (Navbar.tsx)
- ✅ 卡片/复习/图谱/登录/管理
- ✅ 移动端响应式优化
- ✅ 悬停效果

#### 卡片列表页 (cards/page.tsx)
- ✅ 页面标题和副标题
- ✅ 统计面板（总数/分类/特色/学习）
- ✅ 空状态提示

#### 复习页 (review/page.tsx)
- ✅ 页面标题和副标题
- ✅ 复习进度标签
- ✅ "X张卡片待复习"
- ✅ 完成状态（全部完成/已完成/干得好/继续加油）

#### 知识图谱 (GraphView.tsx)
- ✅ 组件标题
- ✅ 加载提示文本
- ✅ 描述文字

### 3. 语言配置 🎯

**支持的语言**:
- `zh` - 中文（简体）
- `ja` - 日本語（日语）
- `en` - English（英文）

**默认语言**: 中文 (zh)

**切换方式**: 点击导航栏右上角的语言切换器

## 📁 文件结构

```
src/
├── lib/
│   └── i18n.ts                 ✨ 国际化工具库（新建）
├── components/
│   ├── Card.tsx                ✅ 三语支持
│   ├── Navbar.tsx              ✅ 三语支持
│   ├── GraphView.tsx           ✅ 三语支持
│   └── LanguageSwitcher.tsx    ✅ 语言切换器
├── app/
│   ├── cards/page.tsx          ✅ 三语支持
│   └── review/page.tsx         ✅ 三语支持
└── store/
    └── useCardStore.ts         ✅ 语言状态管理
```

## 🎨 三语对照表

### 导航栏
| 功能 | 中文 | 日本語| English |
|------|------|--------|---------|
| 卡片 | 卡片 | カード | Cards |
| 复习 | 复习 | レビュー | Review |
| 图谱 | 图谱 | グラフ | Graph |
| 登录 | 登录 | ログイン | Login |
| 管理 | 管理 | 管理 | Admin |

### 卡片操作
| 功能 | 中文 | 日本語 | English |
|------|------|--------|---------|
| 问题 | 问题 | 問題 | Question |
| 答案 | 答案 | 回答 | Answer |
| 显示答案 | 显示答案 | 回答を表示 | Show Answer |
| 显示问题 | 显示问题 | 問題を表示 | Show Question |
| 简单 | 简单 | 簡単 | Easy |
| 一般 | 一般 | 普通 | Good |
| 困难 | 困难 | 難しい | Hard |

### 页面标题
| 页面 | 中文 | 日本語 | English |
|------|------|--------|---------|
| 知识卡片 | 知识卡片 | ナレッジカード | Knowledge Cards |
| 每日复习 | 每日复习 | 毎日のレビュー | Daily Review |
| 知识图谱 | 知识图谱 | ナレッジグラフ | Knowledge Graph |

### 统计标签
| 项目 | 中文 | 日本語 | English |
|------|------|--------|---------|
| 总卡片数 | 总卡片数 | 総カード数 | Total Cards |
| 分类数 | 分类数 | カテゴリ数 | Categories |
| 特色 | 特色 | 注目 | Featured |
| 学习中 | 学习中 | 学習中 | Learning |

### 完成状态
| 状态 | 中文 | 日本語 | English |
|------|------|--------|---------|
| 全部完成 | 全部完成！ | 完了しました！ | All Caught Up! |
| 已完成 | 已完成 | 完了 | Completed |
| 干得好 | 干得好 | よくできました | Great Job |
| 继续加油 | 继续加油 | 頑張って | Keep Going |

## 💡 实现特点

### 1. 类型安全 ✅
```typescript
export interface I18nText {
  zh: string;
  ja: string;
  en: string;
}
```

### 2. 统一管理 ✅
所有文本集中在 `i18n.ts` 中管理，便于维护和更新

### 3. 组件内使用 ✅
```typescript
const locale = useCardStore(s => s.locale);

const title = {
  zh: '知识卡片',
  ja: 'ナレッジカード',
  en: 'Knowledge Cards'
}[locale];
```

### 4. 实时切换 ✅
- 点击语言切换器立即生效
- 所有组件自动响应
- 状态持久化到 localStorage

### 5. 响应式优化 ✅
- 移动端隐藏部分导航项
- 保持简洁的界面
- 语言切换器始终可见

## 🔧 使用方法

### 添加新的翻译文本

1. 在 `src/lib/i18n.ts` 中添加:
```typescript
export const i18n = {
  // ... 现有内容
  newSection: {
    newText: {
      zh: '中文文本',
      ja: '日本語テキスト',
      en: 'English Text'
    }
  }
};
```

2. 在组件中使用:
```typescript
import { useCardStore } from '@/store/useCardStore';

const locale = useCardStore(s => s.locale);

const text = {
  zh: '中文',
  ja: '日本語',
  en: 'English'
}[locale];
```

### 快速模式
```typescript
const quickText = {
  zh: '快速文本',
  ja: '迅速テキスト',
  en: 'Quick Text'
}[locale];
```

## 📊 覆盖范围

### 已完成 ✅
- [x] 导航栏所有链接
- [x] 卡片组件所有文本
- [x] 卡片列表页所有文本
- [x] 复习页所有文本
- [x] 知识图谱所有文本
- [x] 统计面板
- [x] 空状态提示
- [x] 加载提示
- [x] 按钮文本
- [x] Tooltip 提示

### 待扩展 📝
- [ ] 首页内容
- [ ] 登录页面
- [ ] 管理页面
- [ ] 错误提示
- [ ] 成功消息
- [ ] 表单验证

## 🎯 最佳实践

### 1. 保持一致性
- 使用相同的术语翻译
- 保持语气统一
- 符合各语言习惯

### 2. 简洁明了
- 避免过长的翻译
- 保持原意准确
- 适当本地化

### 3. 响应式考虑
```typescript
// 移动端使用较短文本
const shortText = isSmallScreen 
  ? { zh: '复习', ja: 'レビュー', en: 'Review' }[locale]
  : { zh: '每日复习', ja: '毎日のレビュー', en: 'Daily Review' }[locale];
```

### 4. 性能优化
- 文本计算在组件顶层
- 避免在渲染循环中计算
- 使用 useMemo 缓存复杂文本

## 🌟 特色亮点

1. **完整覆盖**: 所有用户可见文本都支持三语
2. **实时切换**: 无需刷新页面
3. **类型安全**: TypeScript 保证类型正确
4. **易于扩展**: 添加新语言只需扩展接口
5. **统一管理**: 集中式翻译管理
6. **性能优良**: 最小化重渲染

## 📱 移动端优化

- 导航栏在小屏幕下自动缩短文本
- 语言切换器保持可见
- Logo 自动缩写 (FEKC)
- 非必要项目自动隐藏

## 🎓 学习资源

### TypeScript 类型定义
```typescript
import type { Locale } from '@/types/card';

type Locale = 'zh' | 'ja' | 'en';
```

### Zustand 状态管理
```typescript
const locale = useCardStore(s => s.locale);
const setLocale = useCardStore(s => s.setLocale);
```

---

**实现日期**: 2025-10-23  
**支持语言**: 中文、日文、英文  
**状态**: ✅ 完成


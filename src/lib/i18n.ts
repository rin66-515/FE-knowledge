/**
 * 国际化工具函数
 * Internationalization Utilities
 * 国際化ユーティリティ
 */

import type { Locale } from '@/types/card';

// 三语文本类型
export interface I18nText {
  zh: string;
  ja: string;
  en: string;
}

// 获取当前语言的文本
export const t = (text: I18nText, locale: Locale): string => {
  return text[locale] || text.en;
};

// ============================================
// 通用文本 / Common Texts
// ============================================

export const i18n = {
  // 导航栏
  nav: {
    home: {
      zh: '首页',
      ja: 'ホーム',
      en: 'Home'
    },
    cards: {
      zh: '卡片',
      ja: 'カード',
      en: 'Cards'
    },
    review: {
      zh: '复习',
      ja: 'レビュー',
      en: 'Review'
    },
    graph: {
      zh: '知识图谱',
      ja: 'ナレッジグラフ',
      en: 'Graph'
    },
    login: {
      zh: '登录',
      ja: 'ログイン',
      en: 'Login'
    },
    admin: {
      zh: '管理',
      ja: '管理',
      en: 'Admin'
    }
  },

  // 卡片相关
  card: {
    question: {
      zh: '问题',
      ja: '問題',
      en: 'Question'
    },
    answer: {
      zh: '答案',
      ja: '回答',
      en: 'Answer'
    },
    showAnswer: {
      zh: '显示答案',
      ja: '回答を表示',
      en: 'Show Answer'
    },
    showQuestion: {
      zh: '显示问题',
      ja: '問題を表示',
      en: 'Show Question'
    },
    favorite: {
      zh: '收藏',
      ja: 'お気に入り',
      en: 'Favorite'
    },
    favorited: {
      zh: '已收藏',
      ja: 'お気に入り済み',
      en: 'Favorited'
    },
    markEasy: {
      zh: '简单',
      ja: '簡単',
      en: 'Easy'
    },
    markGood: {
      zh: '一般',
      ja: '普通',
      en: 'Good'
    },
    markHard: {
      zh: '困难',
      ja: '難しい',
      en: 'Hard'
    },
    category: {
      zh: '分类',
      ja: 'カテゴリ',
      en: 'Category'
    },
    tags: {
      zh: '标签',
      ja: 'タグ',
      en: 'Tags'
    }
  },

  // 卡片页面
  cardsPage: {
    title: {
      zh: '知识卡片',
      ja: 'ナレッジカード',
      en: 'Knowledge Cards'
    },
    subtitle: {
      zh: '浏览和复习所有知识卡片',
      ja: 'すべてのナレッジカードを閲覧・復習',
      en: 'Browse and review all your knowledge cards'
    },
    totalCards: {
      zh: '总卡片数',
      ja: '総カード数',
      en: 'Total Cards'
    },
    categories: {
      zh: '分类数',
      ja: 'カテゴリ数',
      en: 'Categories'
    },
    featured: {
      zh: '特色',
      ja: '注目',
      en: 'Featured'
    },
    learning: {
      zh: '学习中',
      ja: '学習中',
      en: 'Learning'
    },
    noCards: {
      zh: '还没有卡片',
      ja: 'まだカードがありません',
      en: 'No Cards Yet'
    },
    noCardsDesc: {
      zh: '开始添加知识卡片，开启你的学习之旅！',
      ja: 'ナレッジカードを追加して、学習の旅を始めましょう！',
      en: 'Start adding knowledge cards to begin your learning journey!'
    }
  },

  // 复习页面
  reviewPage: {
    title: {
      zh: '每日复习',
      ja: '毎日のレビュー',
      en: 'Daily Review'
    },
    subtitle: {
      zh: '使用间隔重复法复习卡片',
      ja: '間隔反復法でカードを復習',
      en: 'Review your due cards using spaced repetition'
    },
    progress: {
      zh: '复习进度',
      ja: 'レビュー進捗',
      en: 'Review Progress'
    },
    cardsToReview: {
      zh: '张卡片待复习',
      ja: '枚のカードをレビュー',
      en: 'cards to review'
    },
    allCaughtUp: {
      zh: '全部完成！',
      ja: '完了しました！',
      en: 'All Caught Up!'
    },
    congratsMessage: {
      zh: '今天的卡片已全部复习完成！',
      ja: '今日のカードはすべて復習済みです！',
      en: "You've reviewed all your due cards for today!"
    },
    completed: {
      zh: '已完成',
      ja: '完了',
      en: 'Completed'
    },
    greatJob: {
      zh: '干得好',
      ja: 'よくできました',
      en: 'Great Job'
    },
    keepGoing: {
      zh: '继续加油',
      ja: '頑張って',
      en: 'Keep Going'
    }
  },

  // 知识图谱页面
  graphPage: {
    title: {
      zh: '知识图谱',
      ja: 'ナレッジグラフ',
      en: 'Knowledge Graph'
    },
    subtitle: {
      zh: '可视化你的知识网络',
      ja: 'あなたの知識ネットワークを可視化',
      en: 'Visualize your knowledge network'
    },
    loading: {
      zh: '加载图谱中...',
      ja: 'グラフを読み込み中...',
      en: 'Loading graph...'
    },
    preparing: {
      zh: '准备可视化...',
      ja: '可視化を準備中...',
      en: 'Preparing visualization...'
    },
    description: {
      zh: '交互式知识图谱可视化，适配所有设备',
      ja: 'インタラクティブなナレッジグラフ、すべてのデバイスに最適化',
      en: 'Interactive knowledge graph visualization. Optimized for all devices.'
    }
  },

  // 首页
  homePage: {
    welcome: {
      zh: '欢迎来到知识卡片系统',
      ja: 'ナレッジカードシステムへようこそ',
      en: 'Welcome to Knowledge Cards System'
    },
    description: {
      zh: '使用间隔重复算法，高效学习和记忆知识',
      ja: '間隔反復アルゴリズムで効率的に知識を学習・記憶',
      en: 'Learn and memorize knowledge efficiently with spaced repetition'
    },
    startReview: {
      zh: '开始复习',
      ja: 'レビュー開始',
      en: 'Start Review'
    },
    browseCards: {
      zh: '浏览卡片',
      ja: 'カードを閲覧',
      en: 'Browse Cards'
    },
    viewGraph: {
      zh: '查看图谱',
      ja: 'グラフを表示',
      en: 'View Graph'
    }
  },

  // 统计信息
  stats: {
    total: {
      zh: '总计',
      ja: '合計',
      en: 'Total'
    },
    today: {
      zh: '今日',
      ja: '今日',
      en: 'Today'
    },
    week: {
      zh: '本周',
      ja: '今週',
      en: 'This Week'
    },
    reviewed: {
      zh: '已复习',
      ja: 'レビュー済み',
      en: 'Reviewed'
    },
    pending: {
      zh: '待复习',
      ja: 'レビュー待ち',
      en: 'Pending'
    },
    mastered: {
      zh: '已掌握',
      ja: 'マスター済み',
      en: 'Mastered'
    }
  },

  // 加载状态
  loading: {
    loading: {
      zh: '加载中...',
      ja: '読み込み中...',
      en: 'Loading...'
    },
    loadingCards: {
      zh: '加载卡片中...',
      ja: 'カードを読み込み中...',
      en: 'Loading cards...'
    },
    loadingContent: {
      zh: '加载内容中...',
      ja: 'コンテンツを読み込み中...',
      en: 'Loading content...'
    },
    preparing: {
      zh: '准备中...',
      ja: '準備中...',
      en: 'Preparing...'
    }
  },

  // 通用按钮
  button: {
    confirm: {
      zh: '确认',
      ja: '確認',
      en: 'Confirm'
    },
    cancel: {
      zh: '取消',
      ja: 'キャンセル',
      en: 'Cancel'
    },
    save: {
      zh: '保存',
      ja: '保存',
      en: 'Save'
    },
    delete: {
      zh: '删除',
      ja: '削除',
      en: 'Delete'
    },
    edit: {
      zh: '编辑',
      ja: '編集',
      en: 'Edit'
    },
    back: {
      zh: '返回',
      ja: '戻る',
      en: 'Back'
    },
    next: {
      zh: '下一个',
      ja: '次へ',
      en: 'Next'
    },
    previous: {
      zh: '上一个',
      ja: '前へ',
      en: 'Previous'
    },
    close: {
      zh: '关闭',
      ja: '閉じる',
      en: 'Close'
    }
  },

  // 错误消息
  error: {
    generic: {
      zh: '出错了',
      ja: 'エラーが発生しました',
      en: 'Something went wrong'
    },
    loadFailed: {
      zh: '加载失败',
      ja: '読み込みに失敗しました',
      en: 'Failed to load'
    },
    saveFailed: {
      zh: '保存失败',
      ja: '保存に失敗しました',
      en: 'Failed to save'
    },
    networkError: {
      zh: '网络错误',
      ja: 'ネットワークエラー',
      en: 'Network error'
    }
  },

  // 成功消息
  success: {
    saved: {
      zh: '保存成功',
      ja: '保存しました',
      en: 'Saved successfully'
    },
    deleted: {
      zh: '删除成功',
      ja: '削除しました',
      en: 'Deleted successfully'
    },
    updated: {
      zh: '更新成功',
      ja: '更新しました',
      en: 'Updated successfully'
    }
  },

  // 时间相关
  time: {
    day: {
      zh: '天',
      ja: '日',
      en: 'day'
    },
    days: {
      zh: '天',
      ja: '日',
      en: 'days'
    },
    hour: {
      zh: '小时',
      ja: '時間',
      en: 'hour'
    },
    hours: {
      zh: '小时',
      ja: '時間',
      en: 'hours'
    },
    minute: {
      zh: '分钟',
      ja: '分',
      en: 'minute'
    },
    minutes: {
      zh: '分钟',
      ja: '分',
      en: 'minutes'
    }
  }
};

// 导出便捷函数
export const useI18n = (locale: Locale) => {
  return (text: I18nText) => t(text, locale);
};


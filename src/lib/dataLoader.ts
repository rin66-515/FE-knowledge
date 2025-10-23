import type { Card } from '@/types/card';

// 内存缓存
let cachedCards: Card[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

/**
 * 加载所有卡片数据
 * - 使用内存缓存减少重复请求
 * - 支持强制刷新
 * - 自动清除过期缓存
 */
export async function loadAllCards(forceRefresh = false): Promise<Card[]> {
  const now = Date.now();
  
  // 检查缓存是否有效
  if (!forceRefresh && cachedCards && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('📦 Using cached cards data');
    return cachedCards;
  }

  console.log('🔄 Fetching cards data...');
  
  try {
    // 使用 fetch 的缓存策略
    const res = await fetch('/cards/all.json', { 
      cache: 'force-cache',
      next: { revalidate: 300 } // 5分钟重新验证
    });
    
    if (!res.ok) {
      throw new Error(`Failed to load cards: ${res.status}`);
    }
    
    const data = await res.json();
    const cards = data.cards as Card[];
    
    // 更新缓存
    cachedCards = cards;
    cacheTimestamp = now;
    
    console.log(`✅ Loaded ${cards.length} cards`);
    return cards;
  } catch (error) {
    console.error('❌ Error loading cards:', error);
    
    // 如果有缓存，即使过期也返回
    if (cachedCards) {
      console.warn('⚠️ Using stale cache due to error');
      return cachedCards;
    }
    
    throw error;
  }
}

/**
 * 预加载卡片数据
 * 在后台静默加载，不阻塞 UI
 */
export function preloadCards(): void {
  if (typeof window === 'undefined') return;
  
  // 使用 requestIdleCallback 在空闲时预加载
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(() => {
      loadAllCards().catch(() => {
        // 静默失败
      });
    });
  } else {
    // 降级到 setTimeout
    setTimeout(() => {
      loadAllCards().catch(() => {
        // 静默失败
      });
    }, 100);
  }
}

/**
 * 清除缓存
 */
export function clearCardsCache(): void {
  cachedCards = null;
  cacheTimestamp = 0;
  console.log('🗑️ Cards cache cleared');
}

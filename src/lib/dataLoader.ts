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
const isDev = process.env.NODE_ENV === 'development';

// 内存缓存增强：使用更长的缓存时间
const CACHE_DURATION_EXTENDED = 30 * 60 * 1000; // 30分钟

export async function loadAllCards(forceRefresh = false): Promise<Card[]> {
  const now = Date.now();
  
  // 检查缓存是否有效（更激进的缓存策略）
  if (!forceRefresh && cachedCards) {
    const cacheAge = now - cacheTimestamp;
    
    // 30分钟内直接返回
    if (cacheAge < CACHE_DURATION_EXTENDED) {
      if (isDev) console.log('📦 Using cached cards data');
      return cachedCards;
    }
    
    // 30分钟后，后台刷新但先返回旧数据（stale-while-revalidate）
    if (cacheAge < CACHE_DURATION_EXTENDED * 2) {
      // 后台刷新
      setTimeout(() => loadAllCards(true).catch(() => {}), 0);
      if (isDev) console.log('📦 Using stale cache, refreshing in background');
      return cachedCards;
    }
  }

  if (isDev) console.log('🔄 Fetching cards data...');
  
  try {
    // 使用 fetch 的缓存策略 + HTTP 缓存
    const res = await fetch('/cards/all.json', { 
      cache: 'force-cache',
      next: { revalidate: 1800 } // 30分钟重新验证
    });
    
    if (!res.ok) {
      throw new Error(`Failed to load cards: ${res.status}`);
    }
    
    const data = await res.json();
    const cards = data.cards as Card[];
    
    // 更新缓存
    cachedCards = cards;
    cacheTimestamp = now;
    
    // 尝试存储到 IndexedDB（如果支持）
    if (typeof window !== 'undefined' && 'indexedDB' in window) {
      storeToIndexedDB(cards).catch(() => {});
    }
    
    if (isDev) console.log(`✅ Loaded ${cards.length} cards`);
    return cards;
  } catch (error) {
    console.error('❌ Error loading cards:', error);
    
    // 降级策略：尝试从 IndexedDB 恢复
    if (typeof window !== 'undefined' && !cachedCards) {
      const stored = await loadFromIndexedDB();
      if (stored) {
        cachedCards = stored;
        cacheTimestamp = now;
        console.warn('⚠️ Loaded from IndexedDB backup');
        return stored;
      }
    }
    
    // 如果有内存缓存，即使过期也返回
    if (cachedCards) {
      console.warn('⚠️ Using stale cache due to error');
      return cachedCards;
    }
    
    throw error;
  }
}

// IndexedDB 备份存储
async function storeToIndexedDB(cards: Card[]): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction('cards', 'readwrite');
    await tx.objectStore('cards').put({ id: 'all', data: cards, timestamp: Date.now() });
  } catch (e) {
    // 静默失败
  }
}

async function loadFromIndexedDB(): Promise<Card[] | null> {
  try {
    const db = await openDB();
    const tx = db.transaction('cards', 'readonly');
    const result = await tx.objectStore('cards').get('all');
    return result?.data || null;
  } catch (e) {
    return null;
  }
}

async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('knowledgeCards', 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('cards')) {
        db.createObjectStore('cards', { keyPath: 'id' });
      }
    };
  });
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
  if (isDev) console.log('🗑️ Cards cache cleared');
}

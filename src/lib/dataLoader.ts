import type { Card } from '@/types/card';

export async function loadAllCards(): Promise<Card[]> {
  const res = await fetch('/cards/all.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load cards');
  const data = await res.json();
  return data.cards as Card[];
}

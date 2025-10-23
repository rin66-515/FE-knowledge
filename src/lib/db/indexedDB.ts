// Minimal IndexedDB stub with future expansion points.
export async function saveReviewToIDB(cardId: string, score: number): Promise<void> {
  // For now, we fallback to localStorage (simpler for template).
  if (typeof window !== 'undefined') {
    const key = 'reviewed';
    const reviewed = JSON.parse(localStorage.getItem(key) || '{}');
    reviewed[cardId] = score;
    localStorage.setItem(key, JSON.stringify(reviewed));
  }
}

// Simple due logic: consider a card 'due' if not reviewed or score < 2
export function getDueCards(cardIds: string[], reviewed: Record<string, number>): string[] {
  return cardIds.filter(id => reviewed[id] === undefined || reviewed[id] < 2);
}

export function selectFacts(
  facts: string[],
  startIndex: number,
  limit = 5,
): string[] {
  if (facts.length <= limit) {
    return facts;
  }

  return Array.from({ length: limit }, (_, index) => {
    const factIndex = (startIndex + index) % facts.length;
    return facts[factIndex];
  });
}

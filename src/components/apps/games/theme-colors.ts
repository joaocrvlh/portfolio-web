let cache: { key: string; bg: string; fg: string } | null = null;

export function themeColors(el: Element) {
  const key = document.documentElement.className;
  if (cache && cache.key === key) return cache;
  const styles = getComputedStyle(el);
  cache = {
    key,
    bg: styles.getPropertyValue("--background").trim() || "#fff",
    fg: styles.getPropertyValue("--foreground").trim() || "#000",
  };
  return cache;
}

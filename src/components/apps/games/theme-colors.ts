export function themeColors(el: Element) {
  const styles = getComputedStyle(el);
  return {
    bg: styles.getPropertyValue("--background").trim() || "#fff",
    fg: styles.getPropertyValue("--foreground").trim() || "#000",
  };
}

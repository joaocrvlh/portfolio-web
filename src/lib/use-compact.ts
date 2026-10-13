import { useSyncExternalStore } from "react";

export const COMPACT_QUERY = "(max-width: 639px), (max-height: 500px)";

function subscribe(callback: () => void) {
  const query = window.matchMedia(COMPACT_QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

export function useCompact() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(COMPACT_QUERY).matches,
    () => false,
  );
}

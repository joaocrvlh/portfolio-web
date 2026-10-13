import { useEffect } from "react";

type IdleCallback = (deadline: { timeRemaining: () => number }) => void;

function onIdle(callback: IdleCallback) {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout: 2000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(() => callback({ timeRemaining: () => 8 }), 150);
  return () => clearTimeout(id);
}

export function useIdlePreload(urls: string[], enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    let index = 0;
    let cancel = () => {};

    const step: IdleCallback = (deadline) => {
      while (index < urls.length && deadline.timeRemaining() > 4) {
        const img = new Image();
        img.decoding = "async";
        img.src = urls[index++];
        img.decode().catch(() => {});
      }
      if (index < urls.length) cancel = onIdle(step);
    };

    cancel = onIdle(step);
    return () => cancel();
  }, [urls, enabled]);
}

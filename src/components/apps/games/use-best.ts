import { useCallback, useEffect, useRef, useState } from "react";

export function useBest(key: string) {
  const ref = useRef(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        const saved = Number(localStorage.getItem(key)) || 0;
        ref.current = saved;
        setBest(saved);
      } catch {}
    }, 0);
    return () => clearTimeout(id);
  }, [key]);

  const submit = useCallback(
    (score: number) => {
      if (score <= ref.current) return;
      ref.current = score;
      setBest(score);
      try {
        localStorage.setItem(key, String(score));
      } catch {}
    },
    [key],
  );

  return { best, submit };
}

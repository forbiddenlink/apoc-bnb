import { useEffect, useRef } from "react";

/**
 * Like setInterval, but the callback no-ops while the tab is hidden
 * (document.hidden), so background tabs don't burn cycles on decorative
 * tickers/clocks.
 */
export function useVisibleInterval(cb: () => void, ms: number) {
  const saved = useRef(cb);
  saved.current = cb;
  useEffect(() => {
    let id = 0;
    const start = () => {
      id = window.setInterval(() => {
        if (!document.hidden) saved.current();
      }, ms);
    };
    start();
    return () => window.clearInterval(id);
  }, [ms]);
}

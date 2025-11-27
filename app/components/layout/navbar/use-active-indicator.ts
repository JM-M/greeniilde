"use client";

import { useLayoutEffect, useRef, useState } from "react";

export const useActiveIndicator = (activeIndex: number) => {
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [styles, setStyles] = useState<{ width: number; left: number }>({
    width: 0,
    left: 0,
  });

  useLayoutEffect(() => {
    const update = () => {
      const el = itemRefs.current[activeIndex];
      if (!el) return;
      const { offsetLeft, offsetWidth } = el;
      setStyles({ width: offsetWidth, left: offsetLeft });
    };

    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
    };
  }, [activeIndex]);

  return { itemRefs, styles };
};

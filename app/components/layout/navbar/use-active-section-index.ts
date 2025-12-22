"use client";

import { siteConfig } from "@/app/site.config";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hook that returns the index of the currently active nav item based on:
 * 1. Click (immediate, takes priority)
 * 2. Scroll position (when on home page with anchor links)
 * 3. Pathname matching (for separate pages like /case-studies)
 */
export const useActiveSectionIndex = () => {
  const pathname = usePathname();
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const clickOverrideRef = useRef<number | null>(null);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Parse section IDs from nav config (e.g., "value-prop" from "/#value-prop")
  const sectionIds = siteConfig.nav.map((item) => {
    if (item.href.startsWith("/#")) {
      return item.href.slice(2); // Remove "/#"
    }
    return null;
  });

  // Function to manually set active index on click
  const setActiveIndex = useCallback((index: number) => {
    // Clear any existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // Set click override to temporarily ignore scroll updates
    clickOverrideRef.current = index;
    setActiveSectionIndex(index);

    // Clear override after scroll animation completes (1 second)
    clickTimeoutRef.current = setTimeout(() => {
      clickOverrideRef.current = null;
    }, 1000);
  }, []);

  useEffect(() => {
    // For non-home pages, use pathname matching
    if (pathname !== "/") {
      const index = siteConfig.nav.findIndex((item) =>
        pathname.startsWith(item.href),
      );
      setActiveSectionIndex(index === -1 ? 0 : index);
      return;
    }

    // For home page, use IntersectionObserver to detect visible sections
    const sections = sectionIds
      .map((id, index) => (id ? { id, index } : null))
      .filter((item): item is { id: string; index: number } => item !== null);

    if (sections.length === 0) {
      setActiveSectionIndex(0);
      return;
    }

    // Track which sections are currently intersecting
    const visibleSections = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        // Ignore scroll updates during click override
        if (clickOverrideRef.current !== null) {
          return;
        }

        entries.forEach((entry) => {
          visibleSections.set(entry.target.id, entry.isIntersecting);
        });

        // Find the first visible section (topmost in DOM order)
        for (const { id, index } of sections) {
          if (visibleSections.get(id)) {
            setActiveSectionIndex(index);
            return;
          }
        }

        // If no section is visible, check scroll position
        // If at top of page, set to first item; otherwise keep current
        if (window.scrollY < 100) {
          setActiveSectionIndex(0);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px", // Trigger when section is in upper-middle of viewport
        threshold: 0,
      },
    );

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, [pathname, sectionIds]);

  return { activeSectionIndex, setActiveIndex };
};

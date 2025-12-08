"use client";

import { useEffect } from "react";

interface AdminFontProviderProps {
  className: string;
}

export const AdminFontProvider = ({ className }: AdminFontProviderProps) => {
  useEffect(() => {
    document.body.classList.add(className);

    return () => {
      document.body.classList.remove(className);
    };
  }, [className]);

  return null;
};

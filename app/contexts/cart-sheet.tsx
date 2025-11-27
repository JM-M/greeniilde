"use client";

import { createContext, useContext, useState } from "react";

type CartSheetContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CartSheetContext = createContext<CartSheetContextValue | undefined>(
  undefined,
);

export function CartSheetProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <CartSheetContext.Provider value={{ open, setOpen }}>
      {children}
    </CartSheetContext.Provider>
  );
}

export function useCartSheet() {
  const ctx = useContext(CartSheetContext);
  if (!ctx) {
    throw new Error("useCartSheet must be used within CartSheetProvider");
  }
  return ctx;
}

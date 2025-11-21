"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type AuthView = "login" | "register";

interface AuthModalContextType {
  isOpen: boolean;
  view: AuthView;
  openAuthModal: (view?: AuthView) => void;
  closeAuthModal: () => void;
  setView: (view: AuthView) => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined,
);

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<AuthView>("login");

  const openAuthModal = (initialView: AuthView = "login") => {
    setView(initialView);
    setIsOpen(true);
  };

  const closeAuthModal = () => {
    setIsOpen(false);
  };

  return (
    <AuthModalContext.Provider
      value={{
        isOpen,
        view,
        openAuthModal,
        closeAuthModal,
        setView,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};

// context/PageContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface PageContextType {
  pageId: number | null;
  setPageId: (id: number | null) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const usePageContext = (): PageContextType => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error("usePageContext must be used within a PageProvider");
  }
  return context;
};

interface PageProviderProps {
  children: ReactNode;
}

export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [pageId, setPageId] = useState<number | null>(null);

  return (
    <PageContext.Provider value={{ pageId, setPageId }}>
      {children}
    </PageContext.Provider>
  );
};

// context/PageContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";

interface PageContextType {
  pageId: number | null;
  setPageId: (id: number | null) => void;
  pageData: any;
  setPageData: (data: any) => void;
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
  const [pageData, setPageData] = useState<any>({});

  return (
    <PageContext.Provider value={{ pageId, setPageId , pageData, setPageData }}>
      {children}
    </PageContext.Provider>
  );
};

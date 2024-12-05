import React, { createContext, useContext, useState, useEffect } from "react";

// Define the context value type
interface IsUserVerifiedContextType {
  isVerified: boolean;
  setIsVerified: (isVerified: boolean) => void;
}

// Create the context
const IsVerifiedContext = createContext<IsUserVerifiedContextType | undefined>(undefined);

// Create a custom hook to use the context
export const useIsVerified = (): IsUserVerifiedContextType => {
  const context = useContext(IsVerifiedContext);
  if (!context) {
    throw new Error("useIsVerified must be used within an IsUserVerifiedProvider");
  }
  return context;
};

// Provider component to wrap your application and provide the context value
export const IsVerifiedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVerified, setIsVerified] = useState<boolean>(false);

  // Optionally, you can initialize this state from localStorage or session if needed
  useEffect(() => {
    const storedVerificationStatus = localStorage.getItem("isVerified");
    if (storedVerificationStatus) {
      setIsVerified(JSON.parse(storedVerificationStatus));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isVerified", JSON.stringify(isVerified));
  }, [isVerified]);

  return (
    <IsVerifiedContext.Provider value={{ isVerified, setIsVerified }}>
      {children}
    </IsVerifiedContext.Provider>
  );
};

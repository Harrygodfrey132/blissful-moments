import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the type for user data
interface UserData {
    email: string;
    name: string;
    userDetails?: {
        id: number;
        first_name: string;
        last_name: string;
        country: string | null;
        street_address: string | null;
        city: string | null;
        region: string | null;
        postal_code: string | null;
        profile_picture: string | null;
    };
}

interface UserContextType {
    userData: UserData | null;
    setUserData: (data: UserData | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook to use user context
export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(null);

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};

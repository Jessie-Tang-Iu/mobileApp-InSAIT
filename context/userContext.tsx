import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
    username: string;
    setUserName: (username: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
}

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

    const [username, setUserName] = useState<string>("Guest");

    return (
        <UserContext.Provider value={{ username, setUserName }}>
            {children}
        </UserContext.Provider>
    );
}
import { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextType {
    username: string;
    email: string;
    admin: boolean;
    setUserName: (username: string) => void;
    setEmail: (email: string) => void;
    setAdmin: (admin: boolean) => void;
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
    const [email, setEmail] = useState<string>("");
    const [admin, setAdmin] = useState<boolean>(false);

    return (
        <UserContext.Provider value={{ username, email, admin, setUserName, setEmail, setAdmin }}> 
            {children}
        </UserContext.Provider>
    );
}
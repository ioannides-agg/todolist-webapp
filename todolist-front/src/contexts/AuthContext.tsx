import { createContext, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

type AuthContextType = ReturnType<typeof useAuth>;
const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: {children: ReactNode}) {
    const auth = useAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
};

export {AuthProvider, AuthContext} 
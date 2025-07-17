import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export function useAuthContext() {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('Auth context must be inside provider');
    }
    return context;
};
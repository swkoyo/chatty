import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { loginWithGoogle } from '../services/firebase';
import { IUser, TAuthContext } from '../types/auth';

export const AuthContext = createContext<TAuthContext | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);

    const login = useCallback(async () => {
        const loggedInUser = await loginWithGoogle();

        if (!loggedInUser) {
            console.log('no');
        }

        setUser(loggedInUser);
    }, [setUser]);

    const logout = useCallback(() => {
        setUser(null);
    }, [setUser]);

    const value = useMemo(
        () => ({
            user,
            login,
            logout
        }),
        [user, login, logout]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

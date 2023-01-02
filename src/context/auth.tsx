import { useToast } from '@chakra-ui/react';
import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { useEffectOnce } from 'usehooks-ts';
import { loginWithGoogle } from '../services/firebase';
import { IUser, TAuthContext } from '../types/auth';

export const AuthContext = createContext<TAuthContext | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoggingIn, setIsLogginIn] = useState(false);
    const toast = useToast();

    useEffectOnce(() => {
        const userKey = Object.keys(window.localStorage).filter((key: string) => key.startsWith('firebase:auth'))[0];
        if (userKey) {
            const localUser = JSON.parse(localStorage.getItem(userKey) as string) as IUser;
            setUser(localUser);
        }
    });

    const login = useCallback(async () => {
        setIsLogginIn(true);
        const loggedInUser = await loginWithGoogle();

        if (!loggedInUser) {
            toast({
                title: 'Failed to login',
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        }

        setIsLogginIn(false);

        setUser(loggedInUser);
    }, [setUser, toast]);

    const logout = useCallback(() => {
        const userKey = Object.keys(window.localStorage).filter((key: string) => key.startsWith('firebase:auth'))[0];
        if (userKey) {
            localStorage.removeItem(userKey);
        }
        setUser(null);
    }, [setUser]);

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
            isLoggingIn
        }),
        [user, login, logout, isLoggingIn]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

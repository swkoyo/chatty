import { useContext } from 'react';
import { AuthContext } from '../context/auth';

export default function useAuth() {
    const value = useContext(AuthContext);

    if (!value) {
        throw new Error('AuthContext is undefined');
    }

    return value;
}

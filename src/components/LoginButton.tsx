import { Button } from '@chakra-ui/react';
import useAuth from '../hooks/useAuth';

export default function LoginButton() {
    const { login } = useAuth();

    return (
        <Button type='button' onClick={login}>
            Login with Google
        </Button>
    );
}

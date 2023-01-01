import { Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../components/LoginButton';
import useAuth from '../hooks/useAuth';
import MainContainer from '../layouts/MainContainer';

export default function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <MainContainer>
            <Text fontSize='4xl' fontWeight='bold'>
                💬 Chat room
            </Text>
            <Button type='button' onClick={() => navigate('/room')}>
                Go to general
            </Button>
            {user ? (
                <Text>Authenticated</Text>
            ) : (
                <>
                    <Text>Unauthenticated</Text>
                    <LoginButton />
                </>
            )}
        </MainContainer>
    );
}

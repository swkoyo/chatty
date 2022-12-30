import { Container, Text } from '@chakra-ui/react';
import LoginButton from '../components/LoginButton';
import useAuth from '../hooks/useAuth';

export default function Home() {
    const { user } = useAuth();

    return (
        <Container textAlign='center' py={10}>
            <Text fontSize='4xl' fontWeight='bold'>
                💬 Chat room
            </Text>
            {user ? (
                <Text>Authenticated</Text>
            ) : (
                <>
                    <Text>Unauthenticated</Text>
                    <LoginButton />
                </>
            )}
        </Container>
    );
}

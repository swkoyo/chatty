import { Box, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from './Navbar';

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <Box>
            <Navbar />
            <Container>
                <Box display='flex' flexDir='column' pt={24} minH='100vh'>
                    {children}
                </Box>
            </Container>
        </Box>
    );
}

import { Box, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from './Navbar';

export default function MainContainer({ children }: { children: ReactNode }) {
    return (
        <>
            <Navbar />
            <Box bg={useColorModeValue('gray.100', 'gray.800')} pt={24} minH='100vh'>
                {children}
            </Box>
        </>
    );
}

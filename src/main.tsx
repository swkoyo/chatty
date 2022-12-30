import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './config/chakraui';
import AuthProvider from './context/auth';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </ChakraProvider>
    </React.StrictMode>
);

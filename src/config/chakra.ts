import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
};

const colors = {
    darkBg: '#3C3C3C',
    lightBg: '#F5F5F5',
    primary: '#087E8B',
    secondary: '#FF5A5F'
};

const styles = {
    global: (props: Record<string, any> | StyleFunctionProps) => ({
        body: {
            bg: mode('lightBg', 'darkBg')(props)
        }
    })
};

const theme = extendTheme({
    config,
    colors,
    styles
});

export default theme;

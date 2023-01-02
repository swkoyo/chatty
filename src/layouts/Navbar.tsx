import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Button,
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tooltip,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import chatRooms from '../config/chatRooms';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { user, login } = useAuth();
    const location = useLocation();

    return (
        <Box bg={useColorModeValue('white', 'gray.900')} px={4} position='fixed' top={0} width='100%'>
            <Flex h={16} alignItems='center' justifyContent='space-between'>
                {location.pathname !== '/' && (
                    <Flex alignItems='center' gap={2}>
                        {chatRooms.map((room) => (
                            <Button size='sm' key={room.id}>
                                {room.title}
                            </Button>
                        ))}
                    </Flex>
                )}
                <Box flexGrow={1} />
                <Flex alignItems='center'>
                    <Flex direction='row' gap={4}>
                        <Tooltip label='Change Theme' hasArrow>
                            <IconButton
                                aria-label='change theme'
                                variant='ghost'
                                onClick={toggleColorMode}
                                colorScheme='gray'
                                icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            />
                        </Tooltip>
                        {user ? (
                            <Menu>
                                <MenuButton as={Button} rounded='full' variant='link' cursor='pointer' minW={0}>
                                    <Avatar size='sm' bg='blue.300' name={user.displayName || ''} />
                                </MenuButton>
                                <MenuList alignItems='center'>
                                    <MenuItem>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        ) : (
                            <Button colorScheme='twitter' type='button' onClick={login}>
                                Login
                            </Button>
                        )}
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    );
}

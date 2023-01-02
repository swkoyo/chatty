import { ChatIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    Tooltip,
    useColorMode,
    useColorModeValue
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import chatRooms from '../config/chatRooms';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { user, login, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = (room: string) => {
        navigate(`/room/${room}`);
    };

    return (
        <Box bg={useColorModeValue('secondary', 'primary')} px={4} position='fixed' top={0} width='100%'>
            <Flex h={16} alignItems='center' justifyContent='space-between'>
                {location.pathname === '/' ? (
                    <HStack>
                        <ChatIcon fontSize='2xl' />
                        <Text fontSize='xl' fontWeight='medium'>
                            Agora
                        </Text>
                    </HStack>
                ) : (
                    <Flex alignItems='center' gap={2}>
                        {chatRooms.map((room) => (
                            <Button
                                size='sm'
                                key={room.id}
                                onClick={() => handleClick(room.id)}
                                isActive={location.pathname.includes(room.id)}
                            >
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
                                    <MenuItem onClick={logout}>Logout</MenuItem>
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

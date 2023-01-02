import { ChatIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
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
                            Chatty
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
                <Flex direction='row' gap={4} alignItems='center'>
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
                        <>
                            <Avatar size='sm' bg='blue.300' src={user.photoURL} name={user.displayName || 'User'} />
                            <Tooltip label='Logout' hasArrow>
                                <IconButton
                                    size='xs'
                                    colorScheme='red'
                                    aria-label='logout'
                                    icon={<CloseIcon />}
                                    onClick={logout}
                                />
                            </Tooltip>
                        </>
                    ) : (
                        <Button
                            colorScheme={colorMode === 'dark' ? 'blackAlpha' : 'whiteAlpha'}
                            type='button'
                            onClick={login}
                            color={colorMode === 'dark' ? 'white' : 'black'}
                        >
                            Login
                        </Button>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
}

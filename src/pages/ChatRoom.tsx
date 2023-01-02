import {
    Box,
    Button,
    Center,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Spinner,
    StackDivider,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import { delay } from 'bluebird';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import chatRooms from '../config/chatRooms';
import useAuth from '../hooks/useAuth';
import useMessages from '../hooks/useMessages';
import MainContainer from '../layouts/MainContainer';
import { sendMessage } from '../services/firebase';
import { IUser } from '../types/auth';
import { formatDate } from '../utils/dayjs';

export default function ChatRoom() {
    const [value, setValue] = useState('');
    const { user, login, isLoggingIn } = useAuth();
    const { room_id } = useParams();
    const messages = useMessages(room_id as string);
    const [isLoading, setIsLoading] = useState(true);
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const [roomTitle, setRoomTitle] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const room = chatRooms.find((c) => c.id === room_id);
            if (!room) {
                navigate('/');
            } else {
                setRoomTitle(room.title);
                setIsLoading(true);
                await delay(1000);
                setIsLoading(false);
            }
        })();
    }, [room_id, navigate]);

    useEffect(() => {
        if (!isLoading) {
            ref.current?.scrollIntoView();
        }
    }, [isLoading, messages]);

    const inputColor = useColorModeValue('blackAlpha.100', 'whiteAlpha.100');

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        if (room_id) {
            e.preventDefault();
            sendMessage(room_id, user as IUser, value);
            setValue('');
        }
    };

    const getContent = useCallback(() => {
        if (isLoading) {
            return (
                <Center h='full'>
                    <Spinner />
                </Center>
            );
        }

        if (messages.length === 0) {
            return (
                <Center h='full'>
                    <Text>Start the conversation!</Text>
                </Center>
            );
        }

        return (
            <VStack
                divider={<StackDivider />}
                alignItems='start'
                justifyContent='end'
                display='block'
                py={2}
                overflowY='scroll'
                sx={{
                    '&::-webkit-scrollbar': {
                        width: '10px',
                        borderRadius: '8px',
                        backgroundColor: `rgba(0, 0, 0, 0.05)`
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'whiteAlpha.300',
                        borderRadius: '8px'
                    }
                }}
            >
                {messages.map((msg, i) => (
                    <VStack alignItems='start' px={4} py={2} key={msg.id} ref={i === messages.length - 1 ? ref : null}>
                        <HStack>
                            <Text fontSize='sm' fontWeight='bold'>
                                {msg.displayName}
                            </Text>
                            <Text fontSize='xs' fontWeight='thin'>
                                {formatDate(msg.timestamp?.toDate())}
                            </Text>
                        </HStack>
                        <Text overflowWrap='anywhere'>{msg.text}</Text>
                    </VStack>
                ))}
            </VStack>
        );
    }, [isLoading, messages]);

    return (
        <MainContainer>
            <Text mb={10} alignSelf='center' fontSize='2xl' fontWeight='bold'>
                {roomTitle}
            </Text>
            <Box
                boxShadow='2xl'
                display='flex'
                flexDir='column'
                w='full'
                border='1px'
                borderColor={useColorModeValue('blackAlpha.300', 'whiteAlpha.300')}
                borderRadius='xl'
                maxHeight='600px'
                height='60vh'
                justifyContent='end'
            >
                {getContent()}
                {user ? (
                    <Box as='form' onSubmit={() => handleSubmit} justifySelf='end'>
                        <InputGroup pt={2}>
                            <Input
                                placeholder='Chat here'
                                value={value}
                                size='lg'
                                variant='filled'
                                onChange={(e) => setValue(e.target.value)}
                                borderTopRadius='none'
                                borderBottomRadius='xl'
                                border='none'
                                pr={20}
                                autoFocus
                                background={inputColor}
                                sx={{
                                    _focus: {
                                        background: inputColor
                                    },
                                    _hover: {
                                        background: inputColor
                                    }
                                }}
                            />
                            <InputRightElement pr={2} width='4.5rem' pt={5}>
                                <Button
                                    disabled={!value}
                                    type='submit'
                                    h='1.75rem'
                                    size='sm'
                                    justifySelf='center'
                                    colorScheme='messenger'
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                ) : (
                    <Box pt={2} w='full' justifySelf='end'>
                        <Button
                            borderTopRadius='none'
                            colorScheme='messenger'
                            w='full'
                            size='lg'
                            py={4}
                            onClick={login}
                            isLoading={isLoggingIn}
                        >
                            Login to chat
                        </Button>
                    </Box>
                )}
            </Box>
        </MainContainer>
    );
}

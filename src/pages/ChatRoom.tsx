import {
    Box,
    Button,
    HStack,
    Input,
    InputGroup,
    InputRightElement,
    Spinner,
    StackDivider,
    Text,
    VStack
} from '@chakra-ui/react';
import { capitalize } from 'lodash';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useMessages from '../hooks/useMessages';
import MainContainer from '../layouts/MainContainer';
import { sendMessage } from '../services/firebase';
import { IUser } from '../types/auth';
import { formatDate } from '../utils/dayjs';

export default function ChatRoom() {
    const [value, setValue] = useState('');
    const { user, login } = useAuth();
    const { room_id } = useParams();
    const messages = useMessages(room_id as string);
    const [isLoading, setIsLoading] = useState(true);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (room_id) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [room_id]);

    useEffect(() => {
        ref.current?.scrollIntoView();
    }, [messages]);

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        if (room_id) {
            e.preventDefault();
            sendMessage(room_id, user as IUser, value);
            setValue('');
        }
    };

    if (isLoading) {
        return (
            <MainContainer>
                <Spinner />
            </MainContainer>
        );
    }

    return (
        <MainContainer>
            <Text mb={10} alignSelf='center' fontSize='2xl' fontWeight='bold'>
                {capitalize(room_id)}
            </Text>
            <Box
                display='flex'
                flexDir='column'
                w='full'
                border='1px'
                borderRadius='xl'
                height='600px'
                justifyContent='end'
            >
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
                        <VStack
                            alignItems='start'
                            px={4}
                            py={2}
                            key={msg.id}
                            ref={i === messages.length - 1 ? ref : null}
                        >
                            <HStack>
                                <Text fontWeight='bold'>{msg.displayName}</Text>
                                <Text fontSize='xs' fontWeight='thin'>
                                    {msg.timestamp ? formatDate(msg.timestamp.toDate()) : 'just now'}
                                </Text>
                            </HStack>
                            <Text overflowWrap='anywhere'>{msg.text}</Text>
                        </VStack>
                    ))}
                </VStack>
                {user ? (
                    <Box as='form' onSubmit={() => handleSubmit}>
                        <InputGroup pt={2}>
                            <Input
                                placeholder='Chat here'
                                value={value}
                                size='lg'
                                variant='filled'
                                onChange={(e) => setValue(e.target.value)}
                                borderTopRadius='none'
                                borderBottomRadius='lg'
                                border='none'
                                pr={20}
                                autoFocus
                                sx={{
                                    _focus: {
                                        background: 'whiteAlpha.100'
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
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </Box>
                ) : (
                    <Box pt={2} w='full'>
                        <Button w='full' size='lg' py={4} onClick={login}>
                            Login to chat
                        </Button>
                    </Box>
                )}
            </Box>
        </MainContainer>
    );
}

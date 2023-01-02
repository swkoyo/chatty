import { Button, Input, Spinner, Text } from '@chakra-ui/react';
import { MouseEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useMessages from '../hooks/useMessages';
import MainContainer from '../layouts/MainContainer';
import { sendMessage } from '../services/firebase';
import { IUser } from '../types/auth';

export default function ChatRoom() {
    const [value, setValue] = useState('');
    const { user } = useAuth();
    const { room_id } = useParams();
    const messages = useMessages(room_id as string);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (room_id) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [room_id]);

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        sendMessage('general', user as IUser, value);
        setValue('');
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
            <Text>General</Text>
            {messages.map((msg) => (
                <Text key={msg.id}>{msg.text}</Text>
            ))}
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
            <Button type='button' onClick={handleSubmit}>
                Submit
            </Button>
        </MainContainer>
    );
}

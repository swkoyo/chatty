import { Button, Container, Input, Text } from '@chakra-ui/react';
import { MouseEvent, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useMessages from '../hooks/useMessages';
import { sendMessage } from '../services/firebase';
import { IUser } from '../types/auth';

export default function ChatRoom() {
    const messages = useMessages('general');
    const [value, setValue] = useState('');
    const { user } = useAuth();

    console.log(messages);

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        sendMessage('general', user as IUser, value);
        setValue('');
    };
    return (
        <Container>
            <Text>General</Text>
            {messages.map((msg) => (
                <Text key={msg.id}>{msg.text}</Text>
            ))}
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
            <Button type='button' onClick={handleSubmit}>
                Submit
            </Button>
        </Container>
    );
}

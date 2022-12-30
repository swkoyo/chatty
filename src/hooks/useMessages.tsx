import { useEffect, useState } from 'react';
import { getMessages } from '../services/firebase';
import { IMessage } from '../types/messages';

export default function useMessages(roomId: string) {
    const [messages, setMessages] = useState<IMessage[]>([]);

    useEffect(() => {
        const unsubscribe = getMessages(roomId, setMessages);
        return unsubscribe;
    }, [roomId]);

    return messages;
}

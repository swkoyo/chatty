import { Timestamp } from 'firebase/firestore';
import { IUser } from './auth';

export interface IMessage extends IUser {
    id: string;
    text: string;
    timestamp: Timestamp;
}

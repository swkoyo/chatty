import { FieldValue } from 'firebase/firestore';
import { IUser } from './auth';

export interface IMessage extends IUser {
    id: string;
    text: string;
    timestamp: FieldValue;
}

export interface IUser {
    uid: string;
    displayName: string | null;
    photoURL: string | null;
}

export type TAuthContext = {
    user: IUser | null;
    login: () => void;
    logout: () => void;
    isLoggingIn: boolean;
};

export interface IUser {
    uid: string;
    displayName: string | null;
    photoURL: string;
}

export type TAuthContext = {
    user: IUser | null;
    login: () => void;
    logout: () => void;
};

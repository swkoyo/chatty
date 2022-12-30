export interface IUser {
    uid: string;
    displayName: string | null;
}

export type TAuthContext = {
    user: IUser | null;
    login: () => void;
    logout: () => void;
};

import React, { createContext, useCallback, useContext, useState } from 'react';
import {api} from '../services/api';

interface AuthState {
    token: string;
    user: object;
}
interface SignInCredentials {
    username: string;
    password: string;
}
interface AuthContextData {
    user: object;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

const Auth = createContext<AuthContextData>({} as AuthContextData);
const AuthProvider: React.FC = ({ children }) => {
    const [data, setData] = useState<AuthState>(() => {
        const token = localStorage.getItem('@DemoCrud:token');
        const user = localStorage.getItem('@DemoCrud:user');

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }
        return {} as AuthState;
    });

    const signIn = useCallback(async ({ username, password }) => {
        const response = await api.post('/login', {
            username,
            password,
        });
        const { token, user } = response.data;

        localStorage.setItem('@DemoCrud:token', token);
        localStorage.setItem('@DemoCrud:user', JSON.stringify(user));
        setData({ token, user });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem('@DemoCrud:token');
        localStorage.removeItem('@DemoCrud:user');
        setData({} as AuthState);
    }, []);

    return <Auth.Provider value={{ user: data.user, signIn, signOut }}>{children}</Auth.Provider>;
};

function useAuth(): AuthContextData {
    const context = useContext(Auth);
    if (!context) {
        throw new Error(`useAuth must be used within an AuthProvider`);
    }
    return context;
}

export { AuthProvider, useAuth };

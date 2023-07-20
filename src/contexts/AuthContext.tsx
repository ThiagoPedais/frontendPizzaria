'use client';

import { api } from '@/services/apiClient';
import { useRouter, redirect } from 'next/navigation';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type AuthContextData = {
    user: UserProps | null;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signUp: (credentials: SignUpProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)





export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter()
    const [user, setUser] = useState<UserProps | null>(null);
    const isAuthenticated = !!user;

    useEffect(() => {
        // pegar cookie
        const { '@nextauth.token': token } = parseCookies();

        if (token) {
            api.get('/me')
                .then(res => {
                    const { id, name, email } = res.data;
                    setUser({
                        id, name, email
                    })
                })
                .catch(() => {
                    signOut()
                })
        }
    }, [])

    const signIn = async ({ email, password }: SignInProps) => {
        try {
            const res = await api.post('/session', {
                email,
                password
            })

            const { id, name, token } = res.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path: "/"
            })

            setUser({ id, name, email })

            // Passar para próximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success("Login efetuado com sucesso :)")

            router.push("/dashboard");

        } catch (error) {
            toast.error("Error ao tentar logar :(")
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        }
    }

    const signUp = async ({ name, email, password }: SignUpProps) => {
        try {
            const res = await api.post('/users', { name, email, password });
            toast.success("Usuário cadastrado com sucesso!")
            router.push('/');
        } catch (error) {
            toast.error("Error ao tentar cadastrar usuário :(")
            console.log(error);
        }
    }
    const signOut = () => {       

        try {
            destroyCookie(undefined, '@nextauth.token');
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

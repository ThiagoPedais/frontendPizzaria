'use client';

import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import React, { createContext, ReactNode, useState } from 'react';

type AuthContextData = {
    user: UserProps | null;
    isAuthenticated: boolean;
    signIn: (credentials: SingInProps) => Promise<void>;
    signOut: () => void;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SingInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)


export const signOut = () => {
    const router = useRouter()
    
    try {
        destroyCookie(undefined, '@nextauth.token')
        router.push('/')
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}


export const AuthProvider = ({ children }: AuthProviderProps) => {

    const [user, setUser] = useState<UserProps | null>(null);
    const isAuthenticated = !!user;

    const signIn = async ({ email, password }: SingInProps) => {
        
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

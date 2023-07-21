'use client'

import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokenError';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';


export const setupApiClient = (ctx = undefined) => {
    let cookies = parseCookies(ctx);
    const { signOut } = useContext(AuthContext)

    const api = axios.create({
        baseURL: 'http://localhost:3333',
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(res => {
        return res;
    }, (error: AxiosError) => {
        if (error.response?.status === 401) {
            // qualquer error de não autorizado deve-se deslogar o usuário
            
            if (typeof window !== undefined) {
                //chamar a função para deslogar o usuário
                signOut()
            }else {
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error)
    });

    return api;
}
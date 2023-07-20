// 'use client';

import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, NextComponentType } from 'next';
// import { parseCookies } from 'nookies';
// import { NextComponentType } from "next";
// import { Router, useRouter } from 'next/router';
// import { useContext } from 'react';
// import { AuthContext } from '@/contexts/AuthContext';


'use client'

import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useEffect, ReactNode } from 'react';

interface Props {
    children: NextComponentType;
}

export default function PrivateRoute({ children }: Props) {
    const router = useRouter();
    const cookies = parseCookies();

    useEffect(() => {
        if (!cookies['@nextauth.token']) {
            router.push('/');
        }
    }, []);

    return <>{children}</>;
}

// function withAuth(Component: NextComponentType<T>) {
//     const router = useRouter()
    

//     const Auth = (props: T) => {
//         // Login data added to props via redux-store (or use react context for example)
//         const { isAuthenticated } = useContext(AuthContext);

//         // If user is not logged in, return login component
//         if (!isAuthenticated) {
//             router.push('/');
//         }

//         // If user is logged in, return original component
//         return <Component {...props} />;
//     };

//     // Copy getInitial props so it will run as well
//     if (Component.getInitialProps) {
//         Auth.getInitialProps = Component.getInitialProps;
//     }

//     return Auth;
// }

// export default withAuth;


// export function canSSRGuest<P extends { [key: string]: any; }>(fn: GetServerSideProps<P>) {
//     return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
//         const cookies = parseCookies(ctx)

//         // se tentar acessar a pagina com login, redireciona a pagina.
//         if (cookies['@nextauth.token']) {
//             return {
//                 redirect: {
//                     destination: '/dashboard',
//                     permanent: false
//                 }
//             }
//         }

//         return await fn(ctx)
//     }
// }
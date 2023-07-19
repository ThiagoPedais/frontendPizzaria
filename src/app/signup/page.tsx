'use client';

import Image from 'next/image'
import styles from '@/styles/home.module.scss';
import logo from '../../../public/logo.svg';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Head from 'next/head';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export default function Signup() {

    const { signUp } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const handleSignup = async (e: FormEvent) => {
        e.preventDefault()

        if (email === '' || password === '' || name === '') {
            alert("Preencha os dados!")
            return;
        }

        setLoading(true);

        let data = {name, email, password}

        await signUp(data);
        setLoading(false);        
    }

    return (
        <div className={styles.containerCenter}>
            <title>Faça seu Cadastro</title>
            <Image
                src={logo}
                alt="logo"
            />

            <div className={styles.login}>

                <h1 className='uppercase text-white mb-10 sm:text-2xl text-4xl'>Criando sua conta</h1>
                <form action="" onSubmit={handleSignup}>
                    <Input
                        placeholder='Nome'
                        type='text'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Input
                        placeholder='Email'
                        type='email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder='Senha'
                        type='password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <Button
                        type='submit'
                        loading={loading}
                    >
                        Cadastrar
                    </Button>
                </form>

                <Link href="/" className={styles.text}>
                    Já possui uma conta? Efetue login
                </Link>

            </div>
        </div>

    )
}

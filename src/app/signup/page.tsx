import Image from 'next/image'
import styles from '@/styles/home.module.scss';
import logo from '../../../public/logo.svg';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import Head from 'next/head';

export default function Signup() {
    return (

        <div className={styles.containerCenter}>
            <title>Faça seu Cadastro</title>
            <Image
                src={logo}
                alt="logo"
            />

            <div className={styles.login}>

                <h1 className='uppercase text-white mb-10 sm:text-2xl text-4xl'>Criando sua conta</h1>
                <form action="">
                    <Input
                        placeholder='Nome'
                        type='text'
                    />
                    <Input
                        placeholder='Email'
                        type='email'
                    />
                    <Input
                        placeholder='Senha'
                        type='password'
                    />

                    <Button
                        type='submit'
                        loading={false}
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

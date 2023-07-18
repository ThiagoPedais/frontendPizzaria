'use client';

import Image from 'next/image'
import styles from '@/styles/home.module.scss';
import logo from '../../public/logo.svg';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { FormEvent, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export default function Home() {

  const { signIn } = useContext(AuthContext);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    // signIn()
  }

  return (
    <div className={styles.containerCenter}>
      <Image
        src={logo}
        alt="logo"
      />

      <div className={styles.login}>
        <form action="" onSubmit={handleLogin}>
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
            Acessar
          </Button>
        </form>

        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastre-se
        </Link>

      </div>
    </div>
  )
}

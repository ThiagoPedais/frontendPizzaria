'use client';

import Image from 'next/image'
import styles from '@/styles/home.module.scss';
import logo from '../../public/logo.svg';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export default function Home() {

  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if(email === '' || password === '') {
      alert("Preencha os dados!")
      return;
    }

    setLoading(true);

    let data = { email, password };
    await signIn(data);

    setLoading(false);
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

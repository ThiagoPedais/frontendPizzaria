import Image from 'next/image'
import styles from '@/styles/home.module.scss';
import logo from '../../public/logo.svg';
import { Input } from '@/components/ui/input';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <div className={styles.containerCenter}>
      <Image
        src={logo}
        alt="logo"
      />

      <div className={styles.login}>
        <form action="">
          <Input
            placeholder='Email'
            type='email'
          />
          <Input
            placeholder='Senha'
            type='password'
          />
        </form>
        <Button
          type='submit'
          loading={false}
        >
          Acessar
        </Button>
      </div>
    </div>
  )
}

'use client'

import { redirect } from 'next/navigation';
import { parseCookies } from 'nookies';
import { useEffect, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export default function PublicRoute({ children }: Props) {
  const cookies = parseCookies();
  const token = cookies['@nextauth.token']

  useEffect(() => {
    if (token) {
      redirect('/dashboard');
    }
  }, []);

    return (
      <>
        {token ? null : children}
      </>
    );
}
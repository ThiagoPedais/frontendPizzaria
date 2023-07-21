'use client';

import {useState, useContext, FormEvent} from 'react';
import styles from './styles.module.scss';
import { api } from '@/services/apiClient';
import { toast } from 'react-toastify';
import { setupApiClient } from '@/services/api';

const Category = () => {
    const [name, setName] = useState('')

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        if (name === ''){
            toast.warning("O campo de categoria precisa ser preenchida");
            return;
        }

        const apiClient = setupApiClient();
        await apiClient.post('/category', {
            name: name
        });
        toast.success("Categoria cadastrada com sucesso");
        setName('');
        
    }

    return (
        <div>
            <title>Nova categoria - TP Pizzaria</title>
            <main className={styles.container}>
                <h1>Cadastrar categoria</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder='Digite o nome da categoria'
                        className={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button className={styles.buttonAdd} type='submit'>
                        Cadastrar
                    </button>
                </form>
            </main>
        </div>
    )
}

export default Category
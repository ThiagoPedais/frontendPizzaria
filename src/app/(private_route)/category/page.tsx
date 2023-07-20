'use client';

import {useState, useContext, FormEvent} from 'react';
import styles from './styles.module.scss';

const Category = () => {
    const [name, setName] = useState('')

    const handleRegister = (e: FormEvent) => {
        e.preventDefault();

        alert(name)
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
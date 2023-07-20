'use client';

import { ChangeEvent, useState } from 'react';
import { FiUpload } from 'react-icons/fi'
import styles from './styles.module.scss';

const Product = () => {

    const [avatarUrl, setAvatarUrl] = useState('')
    const [imageAvatar, setImageAvatar] = useState(null)


    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if(image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image);
            //pre visulização
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <div>
            <title>TP Pizzaria - Novo Produto</title>
            <main className={styles.container}>
                <h1>Novo Produto</h1>

                <form className={styles.form}>

                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={25} color='#fff' />
                        </span>
                        <input
                            type="file"
                            accept='image/png, image/jpeg'
                            onChange={handleFile}
                        />
                        {
                            avatarUrl && (
                                <img
                                    className={styles.preview}
                                    src={avatarUrl}
                                    alt='Imagem do produto'
                                    width={250}
                                    height={250}
                                />
                            )
                        }
                    </label>

                    <select>
                        <option>Bebidas</option>
                        <option>Pizzas</option>
                    </select>

                    <input
                        type="text"
                        placeholder='Digite o nome do produto'
                        className={styles.input}
                    />

                    <input
                        type="text"
                        placeholder='Preço do Produto'
                        className={styles.input}
                    />

                    <textarea
                        placeholder='Descrição do produto'
                        className={styles.input}
                    />

                    <button className={styles.buttonAdd} type='submit'>
                        Cadastrar
                    </button>
                </form>

            </main>
        </div>
    )
}

export default Product

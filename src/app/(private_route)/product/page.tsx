'use client';

import { FiUpload } from 'react-icons/fi'
import styles from './styles.module.scss';
// import { useProductState } from '@/utils/productUtils';
import { ChangeEvent, useEffect, useState } from 'react';
import { setupApiClient } from '@/services/api';

interface CategoryProps {
    id: string;
    name: string;
}

const Product = () => {
    const [avatarUrl, setAvatarUrl] = useState('')
    const [categories, setCategories] = useState<CategoryProps[]>([])
    const [categorySelected, setCategorySelected] = useState(0)
    const [imageAvatar, setImageAvatar] = useState<File | null>(null)

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }

        const image = e.target.files[0];

        if (!image) {
            return;
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {
            setImageAvatar(image);
            //pre visulização
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }
    }

    const handleChangeCategory = (e) => {
        setCategorySelected(e.target.value);
    }

    useEffect(() => {
        // Chame a função 'categories' para obter os dados das categorias
        const fetchCategories = async () => {
            try {
                const apiClient = setupApiClient();
                const res = await apiClient.get('/categories');
                setCategories(res.data); // Define o estado das categorias com os dados obtidos da API
            } catch (error) {
                console.error('Erro ao obter as categorias:', error);
            }
        };

        fetchCategories();
    }, []);

    const Categories = () => {
        return (
            <select value={categorySelected} onChange={handleChangeCategory}>
                {
                    categories &&
                    categories.map((cat, index) => (
                        <option key={cat.id} value={index}>
                            {cat.name}
                        </option>
                    ))
                }

            </select>
        )
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

                    <Categories />

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

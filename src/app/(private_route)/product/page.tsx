'use client';

import { FiUpload } from 'react-icons/fi'
import styles from './styles.module.scss';
// import { useProductState } from '@/utils/productUtils';
import { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from 'react';
import { setupApiClient } from '@/services/api';
import { toast } from 'react-toastify';

interface CategoryProps {
    id: string;
    name: string;
}

const Product = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const [avatarUrl, setAvatarUrl] = useState('')
    const [categories, setCategories] = useState<CategoryProps[]>([])
    const [categorySelected, setCategorySelected] = useState<number>(0)
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

    const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = Number(e.target.value)
        setCategorySelected(selectedValue);
    }

    useEffect(() => {
        // Chame a função 'categories' para obter os dados das categorias
        const fetchCategories = async () => {
            try {
                const apiClient = setupApiClient();
                const res = await apiClient.get('/categories');
                setCategories(res.data); 
            } catch (error) {
                console.error('Erro ao obter as categorias:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const data = new FormData()

            if(name === '' || price === '' || description === '' || imageAvatar === null) {
                toast.error("Todos campos devem ser preenchidos.");
                return;
            } 
            data.append('name', name);
            data.append('price', price);
            data.append('description', description);
            data.append('category_id', categories[categorySelected].id);
            data.append('file', imageAvatar)

            const apiClient = setupApiClient();
            await apiClient.post('/product', data);
            toast.success("Produto cadastrado com sucesso!");
            
        } catch (error) {
            console.log('====================================');
            console.log(error);
            console.log('====================================');
        
            toast.error("Erro ao cadastrar produto!")
        }

        setName('')
        setPrice('')
        setDescription('')
        setImageAvatar(null)
        setAvatarUrl('')
    }


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

                <form className={styles.form} onSubmit={handleRegister}>

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
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder='Preço do Produto'
                        className={styles.input}
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />

                    <textarea
                        placeholder='Descrição do produto'
                        className={styles.input}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
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

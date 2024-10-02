import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import styles from '../styles/BookCategories.module.css';

export default function BookCategories() {
    const [categories, setCategories] = useState({
        short: [],
        medium: [],
        long: []
    });

    useEffect(() => {
        const categorizeBooks = () => {
            const books = JSON.parse(localStorage.getItem('books') || '[]');
            const categorized = books.reduce((acc, book) => {
                const descriptionLength = (book.body || '').length;
                if (descriptionLength <= 100) acc.short.push(book);
                else if (descriptionLength <= 500) acc.medium.push(book);
                else acc.long.push(book);
                return acc;
            }, { short: [], medium: [], long: [] });
            setCategories(categorized);
        };

        categorizeBooks();
    }, []);

    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.title}>Kategori Buku Berdasarkan Panjang Deskripsi</h1>
                
                <div className={styles.category}>
                    <h2>Deskripsi Pendek (1-100 karakter)</h2>
                    <ul>
                        {categories.short.map(book => (
                            <li key={book.id}>
                                <Link href={`/books/${book.id}`}>
                                    {book.title}
                                </Link>
                                <p className={styles.description}>{(book.body || '').slice(0, 50)}...</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.category}>
                    <h2>Deskripsi Sedang (101-500 karakter)</h2>
                    <ul>
                        {categories.medium.map(book => (
                            <li key={book.id}>
                                <Link href={`/books/${book.id}`}>
                                    {book.title}
                                </Link>
                                <p className={styles.description}>{(book.body || '').slice(0, 50)}...</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.category}>
                    <h2>Deskripsi Panjang (lebih dari 500 karakter)</h2>
                    <ul>
                        {categories.long.map(book => (
                            <li key={book.id}>
                                <Link href={`/books/${book.id}`}>
                                    {book.title}
                                </Link>
                                <p className={styles.description}>{(book.body || '').slice(0, 50)}...</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
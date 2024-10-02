// pages/read-later.js
import Layout from '../components/Layout';
import { useReadLater } from '../context/ReadLaterContext';
import Link from 'next/link';
import styles from '../styles/ReadLater.module.css';

export default function ReadLaterPage() {
    const {readLaterList, removeFromReadLater} = useReadLater();

    return (
        <Layout>
            <h1>Daftar Baca Nanti</h1>
            {readLaterList.length === 0 ? (
                <p>Belum ada buku yang ditambahkan ke daftar Baca Nanti.</p>
            ) : (
                <ul className={styles.list}>
                    {readLaterList.map((book) => (
                        <li key={book.id} className={styles.item}>
                            <Link href={`/books/${book.id}`}>
                                <span className={styles.title}>{book.title}</span>
                            </Link>
                            <button
                                onClick={() => removeFromReadLater(book.id)}
                                className={styles.removeButton}
                            >
                                Hapus
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </Layout>
    )
}
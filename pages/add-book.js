// pages/add-book.js
import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import styles from '../styles/AddBook.module.css'

export default function AddBook() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        //Simulasi penambahan buku(karena kita tidak memiliki backend esebenarnya)
        const newBook = {title, author, id: Date.now().toString(), body : description}
        const existingBooks = JSON.parse(localStorage.getItem('books')  || '[]')
        const updatedBooks = [...existingBooks, newBook]
        localStorage.setItem('books', JSON.stringify(updatedBooks))
        console.log('Buku baru:', newBook)
        //redirect ke hal utama
        router.push('/')
    }

    return (
        <Layout>
            <h1> Tambah Buku Baru</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Judul Buku"
                    required
                    className={styles.input}
                />
                <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Penulis"
                    required
                    className={styles.input}
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Deskripsi"
                    required
                    className={styles.input}
                />
                <button type='submit' className={styles.button}>Tambah Buku</button>
            </form>
        </Layout>
    )
}
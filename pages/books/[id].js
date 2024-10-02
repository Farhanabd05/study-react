import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../../components/Layout'
import styles from '../../styles/Book.module.css'
import Rating from '../../components/Rating'
import Comments from '../../components/Comments'
import ReadLater from '../../components/ReadLater'
import { useEffect, useState } from 'react'

export default function Book({ initialBook }) {
    const router = useRouter()
    const [book, setBook] = useState(initialBook)
    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState('')
    const [editedAuthor, setEditedAuthor] = useState('')
    const [editedBody, setEditedBody] = useState('')

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const localBooks = JSON.parse(localStorage.getItem('books') || '[]')
        const localBook = localBooks.find((b) => b.id.toString() === router.query.id)
        if (localBook) {
          setBook(localBook)
          setEditedTitle(localBook.title)
          setEditedAuthor(localBook.author)
          setEditedBody(localBook.body || '')
        }
      }
    }, [router.query.id])

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    if (!book) { 
        return (
            <Layout>
                <div>Error: Buku tidak ditemukan</div>
            </Layout>
        )
    }

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        const updatedBook = {
            ...book,
            title: editedTitle,
            author: editedAuthor,
            body: editedBody
        }
        const localBooks = JSON.parse(localStorage.getItem('books') || '[]')
        const updatedBooks = localBooks.map(b => b.id.toString() === book.id.toString() ? updatedBook : b)
        localStorage.setItem('books', JSON.stringify(updatedBooks))
        setBook(updatedBook)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditedTitle(book.title)
        setEditedAuthor(book.author)
        setEditedBody(book.body || '')
        setIsEditing(false)
    }

    return (
        <Layout>
            <div className={styles.book}>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            className={styles.editInput}
                        />
                        <input
                            type="text"
                            value={editedAuthor}
                            onChange={(e) => setEditedAuthor(e.target.value)}
                            className={styles.editInput}
                        />
                        <textarea
                            value={editedBody}
                            onChange={(e) => setEditedBody(e.target.value)}
                            className={styles.editTextarea}
                        />
                        <button onClick={handleSave} className={styles.button}>Simpan</button>
                        <button onClick={handleCancel} className={styles.button}>Batal</button>
                    </>
                ) : (
                    <>
                        <h1>{book.title}</h1>
                        <p>Oleh: {book.author}</p>
                        <Rating bookId={book.id} />
                        <p>{book.body || 'Tidak ada deskripsi'}</p>
                        <ReadLater book={book} />
                        <button onClick={handleEdit} className={styles.button}>Edit Buku</button>
                        <Link href="/">
                            <button className={styles.button}>Kembali ke Daftar</button>
                        </Link>
                        <Comments bookId={book.id}/>
                    </>
                )}
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts')
        const books = await res.json()

        const paths = books.slice(0, 10).map((book) => ({
            params: { id: book.id.toString() }
        }))

        return { paths, fallback: true }
    }
     catch (error) {
        console.error('Error fetching paths:', error)
        return { paths: [], fallback: true }
     }
}

export async function getStaticProps({ params }) {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
      if (!res.ok) {
        throw new Error(`Failed to fetch book ${params.id}`)
      }
      let book = await res.json()
      book = {
        ...book,
        author: `Penulis ${book.id}`
      }
      return { props: { initialBook: book } }
    } catch (error) {
      console.error('Error fetching book:', error)
      return { 
        props: { 
          initialBook: null
        } 
      }
    }
}
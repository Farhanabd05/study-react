// pages/index.js
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home({ books : initialBooks = [] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [books, setBooks] = useState(initialBooks)

  useEffect(() => {
    const localBooks = JSON.parse(localStorage.getItem('books') || '[]')
    setBooks([...initialBooks, ...localBooks])
  }, [initialBooks])

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    const allBooks = [...initialBooks,...JSON.parse(localStorage.getItem('books') || '[]')]
    const filteredBooks = allBooks.filter(book =>
        book.title.toLowerCase().includes(term) || book.author.toLowerCase().includes(term)
    )
    setBooks(filteredBooks)
  }

  const popularBooks = books.slice(0, 3)
  return (
    <Layout>
      <h1 className={styles.title}>Daftar Buku</h1>
      <input
        type="text"
        placeholder="Cari buku..."
        value={searchTerm}
        onChange={handleSearch}
        className={styles.searchInput}
        />
      <h2 className={styles.subtitle}>Buku Terpopuler</h2>
      <ul className={styles.grid}>
        {popularBooks.map((book) => (
          <li key={book.id} className={styles.card}>
            <Link href={`/books/${book.id}`}>
              <h2>{book.title}</h2>
              <p>Oleh: {book.author}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/add-book">
        <button className={styles.addButton}>Tambah Buku Baru</button>
      </Link>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    //Simulasi pengambilan data dari API
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    let books = await res.json()
    books = books.slice(0, 10).map(post => ({
        id: post.id,
        title: post.title,
        author: `Penulis ${post.id}`
    }))

    return {
        props: {
            books,
        },
    }
} catch (error) {
    console.error('Error fetching books:', error)
    return {
        props: {
            books: [],
          },
      }
  }
}



// export default function Home({books}) {
//     const books = [
//         {id: 1, title: 'Harry Potter'},
//         {id: 2, title: 'Lord of the Rings'},
//         {id: 3, title: 'To kill a Mockingbird'},
//     ]

//     return (
//         <div>
//             <h1>Daftar Buku</h1>
//             <ul>
//                 {books.map((book) => (
//                     <li key={book.id}>
//                         <Link href={`/books/${book.id}`}>
//                             {book.title}
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }

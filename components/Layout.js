// components/Layout.js
import Head from 'next/head'
import styles from '../styles/Layout.module.css'
import Navbar from './Navbar'

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Perpustakaan Mini</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Navbar/>
            
            <main className={styles.main}>{children}</main>
            
            <footer className={styles.footer}>
                <p>@ 2024 Perpustakaan Mini</p>
            </footer>
        </div>
    )
}

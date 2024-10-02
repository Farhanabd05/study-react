import Layout from "../components/Layout";
import styles from '../styles/About.module.css'

export default function About() {
    return (
        <Layout>
            <div className={styles.about}>
                <h1>Tentang Perpustakaan Mini</h1>
                <p>Perpustakaan Mini adalah proyek sederhana yang dibuat dengan Next.js untuk memahami konsep dasar pengembangan web modern.</p>
                <h2>Fitur Utama:</h2>
                <ul>
                    <li>Daftar buku</li>
                    <li>Detail buku</li>
                    <li>Navigasi antar halaman</li>
                </ul>
            </div>
        </Layout>
    )
}
// components/Navbar.js
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Link href="/">BookWorld</Link>
            </div>
            <button className={styles.toggleButton} onClick={toggleNavbar}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={`${styles.navItems} ${isOpen ? styles.open : ''}`}>
                <Link href="/" className={styles.navItem}>Beranda</Link>
                <Link href="/about" className={styles.navItem}>Tentang Kami</Link>
                <Link href="/read-later" className={styles.navItem}>Baca Nanti</Link>
                <Link href="/statistics" className={styles.navItem}>Statistik</Link>
                <Link href="/book-categories" className={styles.navItem}>Kategori Buku</Link>
                <Link href="/book-guessing-game" className={styles.navItem}>Game Tebak Buku</Link>
            </div>
        </nav>
    );
}

// // components/Navbar.js
// import { useState } from 'react';
// import Link from 'next/link';
// import styles from '../styles/Navbar.module.css';

// export default function Navbar() {
//     const [isOpen, setIsOpen] = useState(false);

//     const toggleNavbar = () => {
//         setIsOpen(!isOpen);
//     };

//     return (
//         <nav className={styles.navbar}>
//             <button className={styles.toggleButton} onClick={toggleNavbar}>
//                 {isOpen ? '✕' : '☰'}
//             </button>
//             <div className={`${styles.navItems} ${isOpen ? styles.open : ''}`}>
//                 <Link href="/" className={styles.navItem}>Beranda</Link>
//                 <Link href="/about" className={styles.navItem}>Tentang Kami</Link>
//                 <Link href="/read-later" className={styles.navItem}>Baca Nanti</Link>
//                 <Link href="/statistics" className={styles.navItem}>Statistik</Link>
//                 <Link href="/book-categories" className={styles.navItem}>Kategori Buku</Link>
//                 <Link href="/book-guessing-game" className={styles.navItem}>Game Tebak Buku</Link>
//             </div>
//         </nav>
//     );
// }

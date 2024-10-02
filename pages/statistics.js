import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Statistics.module.css';

export default function Statistics() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalAuthors: 0,
    avgRating: 0,
    highestRatedBook: '',
  });

  useEffect(() => {
    const calculateStats = () => {
      const books = JSON.parse(localStorage.getItem('books') || '[]');
      
      const totalBooks = books.length;
      
      const authors = new Set(books.map(book => book.author));
      const totalAuthors = authors.size;
      
      let highestRating = 0;
      let highestRatedBook = '';
      let totalRating = 0;
      let ratedBooks = 0;

      books.forEach(book => {
        const ratingKey = `rating_${book.id}`;
        const rating = localStorage.getItem(ratingKey);
        if (rating) {
          const ratingValue = parseInt(rating);
          totalRating += ratingValue;
          ratedBooks++;
          if (ratingValue > highestRating) {
            highestRating = ratingValue;
            highestRatedBook = book.title;
          }
        }
      });

      const avgRating = ratedBooks > 0 ? totalRating / ratedBooks : 0;

      return {
        totalBooks,
        totalAuthors,
        avgRating,
        highestRatedBook: highestRatedBook || 'Tidak ada buku yang dirating',
      };
    };

    const newStats = calculateStats();
    setStats(newStats);
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Statistik Perpustakaan</h1>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <h2>Total Buku</h2>
            <p>{stats.totalBooks}</p>
          </div>
          <div className={styles.statItem}>
            <h2>Total Penulis</h2>
            <p>{stats.totalAuthors}</p>
          </div>
          <div className={styles.statItem}>
            <h2>Rata-rata Rating</h2>
            <p>{stats.avgRating.toFixed(1)}</p>
          </div>
          <div className={styles.statItem}>
            <h2>Buku dengan Rating Tertinggi</h2>
            <p>{stats.highestRatedBook}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
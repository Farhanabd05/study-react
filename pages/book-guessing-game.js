import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import styles from "../styles/BookGuessingGame.module.css";

export default function BookGuessingGame() {
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localBooks = JSON.parse(localStorage.getItem("books") || "[]");
    console.log("Local books:", localBooks);
    const validBooks = localBooks.filter(
      (book) => book.body && book.body.length > 50
    );
    console.log("Valid books:", validBooks);
    setBooks(validBooks);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (books.length > 0 && !currentBook) {
      nextRound();
    }
  }, [books, currentBook]);

  const nextRound = () => {
    console.log("Next round called. Books:", books);
    if (books.length > 0) {
      const randomIndex = Math.floor(Math.random() * books.length);
      const selectedBook = books[randomIndex];
      console.log("Selected book:", selectedBook);
      setCurrentBook(selectedBook);
      setGuess("");
      setFeedback("");
      setRound((prevRound) => prevRound + 1);
    } else {
      console.log("No books available for next round");
    }
  };

  const handleGuess = (e) => {
    e.preventDefault();
    if (guess.toLowerCase() === currentBook.title.toLowerCase()) {
      setFeedback("Benar! Anda mendapatkan 1 poin.");
      setScore((prevScore) => prevScore + 1);
      setTimeout(nextRound, 2000);
    } else {
      setFeedback("Maaf, tebakan Anda salah. Coba lagi!");
    }
  };

  const getHint = () => {
    const words = currentBook.body.split(" ");
    return words.slice(0, 20).join(" ") + "...";
  };

  if (isLoading) {
    return (
      <Layout>
        <div>Memuat game...</div>
      </Layout>
    );
  }

  console.log("Current state - Books:", books, "Current Book:", currentBook);

  if (books.length === 0) {
    return (
      <Layout>
        <div className={styles.container}>
          <h1 className={styles.title}>Tebak Judul Buku</h1>
          <p>
            Maaf, tidak ada buku yang cukup untuk memulai permainan. Tambahkan
            lebih banyak buku dengan deskripsi yang cukup panjang.
          </p>
        </div>
      </Layout>
    );
  }

  if (!currentBook) {
    return (
      <Layout>
        <div className={styles.container}>
          <h1 className={styles.title}>Tebak Judul Buku</h1>
          <p>Memuat buku... Silakan tunggu sebentar.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Tebak Judul Buku</h1>
        <p className={styles.score}>
          Skor: {score} | Ronde: {round}
        </p>
        <div className={styles.gameArea}>
          <p className={styles.hint}>Petunjuk: {getHint()}</p>
          <form onSubmit={handleGuess} className={styles.guessForm}>
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Masukkan judul buku"
              className={styles.guessInput}
            />
            <button type="submit" className={styles.guessButton}>
              Tebak
            </button>
          </form>
          {feedback && <p className={styles.feedback}>{feedback}</p>}
          <button
            onClick={() =>
              setFeedback(`Judul yang benar adalah: ${currentBook.title}`)
            }
            className={styles.giveUpButton}
          >
            Menyerah
          </button>
        </div>
      </div>
    </Layout>
  );
}

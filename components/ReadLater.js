import { useEffect, useState } from "react";
import { useReadLater } from "../context/ReadLaterContext";
import styles from '../styles/ReadLater.module.css'

export default function ReadLater({ book }) {
    const { readLaterList, addToReadLater, removeFromReadLater } = useReadLater();
    const [isAdded, setIsAdded] = useState(false)

    useEffect(() => {
        setIsAdded(readLaterList.some(item => item.id === book.id));
    }, [readLaterList, book.id]);

    const handleClick = () => {
        if (isAdded) {
            removeFromReadLater(book.id)
        } else {
            addToReadLater(book);
        }
    };

    return (
        <button onClick={handleClick} className={styles.button}>
            {isAdded ? 'Hapus dari Baca Nanti' : 'Tambah ke Baca Nanti'}
        </button>
    )
}
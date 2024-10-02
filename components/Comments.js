import { useEffect, useState } from "react";
import styles from '../styles/Comments.module.css'

export default function Comments({bookId}) {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')

    useEffect(() => {
        // Load comments from localStorage when component mounts
        const savedComments = JSON.parse(localStorage.getItem(`comments_${bookId}`)) || []
        setComments(savedComments)
    }, [bookId])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newComment.trim()) {
            const updatedComments =[...comments, newComment]
            setComments(updatedComments)
            setNewComment('')
            //save commnet to local storage
            localStorage.setItem(`comments_${bookId}`, JSON.stringify(updatedComments))
        }
    }

    return (
        <div className={styles.comments}>
            <h3>Komentar</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Tulis komentar Anda"
                    className={styles.textarea}
                />
                <button type="submit" className={styles.button}>Kirim</button>
            </form>
            <ul className={styles.commentList}>
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}
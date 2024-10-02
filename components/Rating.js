import { useEffect, useState } from "react";
import styles from '../styles/Rating.module.css'

export default function Rating({ bookId }) {
    const [rating, setRating] = useState(0)

    useEffect(() => {
        // Load rating from localStorage when component mounts or bookId changes
        const loadRating = () => {
            console.log('Loading rating for book:', bookId)
            const savedRating = localStorage.getItem(`rating_${bookId}`)
            console.log('Saved rating:', savedRating)
            if (savedRating !== null) {
                setRating(parseInt(savedRating))
            } else {
                setRating(0)  // Reset to 0 if no saved rating
            }
        }

        loadRating()
    }, [bookId])
    
    

    const handleRating = (star) => {
        setRating(star)
        // Save rating to localStorage
        console.log('saving rating:',star, 'for book', bookId)
        localStorage.setItem(`rating_${bookId}`, star.toString())

    }
    return (
        <div className={styles.rating}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    className={star <= rating ? styles.filled : styles.empty}
                    onClick={() => handleRating(star)}>
                        ★
                    </span>
            ))}
            <span className={styles.ratingValue}>{rating > 0 ? `(${rating})` : ''}</span>
        </div>
    )
}
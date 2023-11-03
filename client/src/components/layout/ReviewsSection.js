import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ReviewTile from "./ReviewTile"


const ReviewsSection = (props) => {
    
    const [reviews, setReviews] = useState([])
    
    const getReviews = async () => {
        try {
            const response = await fetch(`/api/v1/destinations/${props.destinationId}/reviews`)
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setReviews(body.reviews)
        } catch (err) {
            console.error(`Error in fetch: ${err.message}`)
        }
    }
    
    useEffect(() => {
        getReviews()
    }, [])

    const reviewsList = reviews.map(reviewItem => {
        return ( 
            <ReviewTile 
                key={reviewItem.id} 
                title={reviewItem.title}
                reviewContent={reviewItem.reviewContent}
                rating={reviewItem.rating}
            />
        )
    })
    
    return (
        <>
            <h2>Reviews</h2>
            { reviewsList }
        </>
    )
}

export default ReviewsSection
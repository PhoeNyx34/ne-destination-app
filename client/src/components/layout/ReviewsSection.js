import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ReviewTile from "./ReviewTile"
import NewReviewForm from "./NewReviewForm"
//DestinationShow
    // showDetails of destination
    // ReviewsSection
        // DestinationReviewsList
            // ReviewTiles
        // newReviewForm

const ReviewsSection = (props) => {
    
    // const { destinationId } = props 
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

    // const reviews = [
    //     {id: 1, title: "boo", reviewContent: "yah", rating: 5},
    //     {id: 2, title: "happy review!", reviewContent: "this is another review", rating: 9},
    // ]

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

    const destinationName = props.destinationName
    
    return (
        <div>
            <h2>Reviews</h2>
            <Link to={{pathname: `/destinations/${props.destinationId}/new-review`, state: {destinationName}}}>Submit a New Review</Link>
            <div>
                { reviewsList }
            </div>
        </div>
    )

}

export default ReviewsSection




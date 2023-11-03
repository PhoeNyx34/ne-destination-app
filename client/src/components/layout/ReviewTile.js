import React from "react"


const ReviewTile = (props) => {

    const {title, reviewContent, rating} = props
    
    return (
        <div>
            <h3>{title}</h3>
            <p>{rating}</p>
            <p>{reviewContent}</p>

        </div>
    )
}

export default ReviewTile
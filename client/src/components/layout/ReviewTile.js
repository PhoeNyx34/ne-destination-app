import React, { useState } from "react"
import VoteCount from "./VoteCount"

const ReviewTile = ({ review, user }) => {
    const { id, title, content, rating, voteTotal, userReviewVoteStatus } = review
    return (
        <>
            <h3>{title}</h3>
            <p>Rating: {rating}</p>
            <p>{content}</p>
            <VoteCount user={user} reviewId={id} voteTotal={voteTotal} userReviewVoteStatus={userReviewVoteStatus} />
        </>
    )
}

export default ReviewTile
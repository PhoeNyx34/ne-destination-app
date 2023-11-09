class ReviewSerializer {

    static getSummary(review) {

        const allowedAttributes = ["id", "title", "rating", "content"]

        let serializedReview = {}
        for (const attribute of allowedAttributes) {
            serializedReview[attribute] = review[attribute]
        }


        return serializedReview
    }

    static async getSummaryWithVotes(reviewArray, user) {

        const serializedReviews = await Promise.all(reviewArray.map(async (review) => {

            const allowedAttributes = ["id", "title", "rating", "content"]
    
            let serializedReview = {}
            for (const attribute of allowedAttributes) {
                serializedReview[attribute] = review[attribute]
            }  
            let userReviewVoteStatus 
    
            let votes = await review.$relatedQuery("votes")
            const voteStatusArray = votes.map((vote) => {

                if (vote.userId === user.id) {
                    if (vote.status == "1") {
                        userReviewVoteStatus = 1
                    } else if (vote.status == "-1") {
                        userReviewVoteStatus = -1
                    }        
                    serializedReview.userReviewVoteStatus = userReviewVoteStatus
                }
                
                return vote.status
            })
            
            let initialValue = 0
            const voteTotal = voteStatusArray.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)
    
            serializedReview.voteTotal = voteTotal

            return serializedReview
        }))

        return serializedReviews
    }


}

export default ReviewSerializer
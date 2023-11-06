import { Destination, User, Review } from "../../models/index.js"

class ReviewSeeder {
    static async seed() {
        const tess = await User.query().findOne({email: "tess.ting@gmail.com"})
        const fatboi = await User.query().findOne({email: "fatboislimjim@gmail.com"})

        const hampton = await Destination.query().findOne({name: "Hampton Beach"})
        
        const reviewsData = [
            {
                userId: tess.id,
                destinationId: hampton.id,
                rating: 2,
                title: "This place sucks!",
                content: "Didn't step on a single needle! What a waste of time."
            },
            {
                userId: fatboi.id,
                destinationId: hampton.id,
                rating: 9,
                title: "Rats everywhere!",
                content: "Fantastic. Great addition to my picnic spread."
            }
        ]

        for (const review of reviewsData) {
            const currentReview = await Review.query().findOne({ title: review.title })
            if (!currentReview) {
                await Review.query().insert(review)
            }
        }
    }
}

export default ReviewSeeder
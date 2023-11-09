import { Vote } from "../../models/index.js"

class VoteSeeder {

    static async seed() {
        const voteData = [
            {
                userId: 4,
                reviewId: 1,
                status: 1
            },
            {
                userId: 2,
                reviewId: 1,
                status: 1
            },
            {
                userId: 1,
                reviewId: 1,
                status: 1
            },
            {
                userId: 3,
                reviewId: 1,
                status: -1
            }
        ]

        for (const singleData of voteData) {
            let currentData = await Vote.query().findOne({ userId: singleData.userId, reviewId: singleData.reviewId })
            if (!currentData) {
                await Vote.query().insert(singleData)
            }
        }
    }

}

export default VoteSeeder
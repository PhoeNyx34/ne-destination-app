import express from "express"
import { Vote, User } from "../../../models/index.js"

const votesRouter = new express.Router()

votesRouter.post("/", async (req, res) => {
    const voteStatus = req.body.voteObject.voteStatus
    const userId = req.user.id
    const reviewId = req.body.voteObject.reviewId

    try {
        let vote 
        const existingVote = await Vote.query().findOne({ userId: userId, reviewId: reviewId })
        if (!existingVote) {
            vote = await Vote.query().insertAndFetch({userId: userId, reviewId: reviewId, status: voteStatus})
        } else {
            if (existingVote.status === voteStatus) {
                await Vote.query().deleteById(existingVote.id)
                vote = null
            } else {
                vote = await Vote.query().patchAndFetchById(existingVote.id, {status: voteStatus })
            }
        }

        res.status(200).json({ vote }) 
    } catch (err) {
        res.status(500).json({errors: err})
    }
})

export default votesRouter
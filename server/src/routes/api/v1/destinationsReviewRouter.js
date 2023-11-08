import express from "express"
import { Destination, Review } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import objection from "objection"
const { ValidationError } = objection
import ReviewSerializer from "../../../serializers/ReviewSerializer.js"

const destinationReviewsRouter = new express.Router({ mergeParams: true})

destinationReviewsRouter.post("/", async (req, res) => {
    const currentUserId = req.user.id
    const destinationId = req.params.destinationId
    const formInput = cleanUserInput(req.body)
    formInput.userId = currentUserId
    formInput.destinationId = destinationId
    try { 
        const destination = await Destination.query().findById(formInput.destinationId)
        const newDestinationReview = await destination.$relatedQuery("reviews").insertAndFetch(formInput)
        const serializedReview = ReviewSerializer.getSummary(newDestinationReview)
        return res.status(201).json({ review: serializedReview })
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(422).json({ errors: err.data})
        } else { 
            return res.status(500).json({ errors: err})
        }
    }
})

export default destinationReviewsRouter

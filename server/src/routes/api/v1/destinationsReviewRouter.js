import express from "express"
import { Review, Destination } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import objection from "objection"
const { ValidationError } = objection

const destinationReviewsRouter = new express.Router({ mergeParams: true})

destinationReviewsRouter.post("/", async (req, res) => {
    const formInput = cleanUserInput(req.body)
    try { 
        const destination = await Destination.query().findById(formInput.destinationId)
        const newDestinationReview = await destination.$relatedQuery("reviews").insertAndFetch(formInput)
        return res.status(201).json({ review: newDestinationReview })
    } catch (err) {
        console.log(err)
        if (err instanceof ValidationError) {
            return res.status(422).json({ errors: err.data})
        } else { 
            return res.status(500).json({ errors: err})
        }
    }
})

export default destinationReviewsRouter

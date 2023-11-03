import express from "express"
import { Review, Destination } from "../../../models/index.js"

const destinationReviewsRouter = new express.Router({ mergeParams: true})

destinationReviewsRouter.get("/", async (req, res) => {
    const { destinationId } = req.params
    
    try {
        const destination = await Destination.query().findById(destinationId)
        const relevantReviews = await destination.$relatedQuery("reviews")
        console.log("destination", destination)
        console.log("reviews", relevantReviews)
        return res.status(200).json({ reviews: relevantReviews })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ errors: err })
    }
})

export default destinationReviewsRouter

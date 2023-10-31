import express from "express"
import { Destination } from "../../../models/index.js"

const destinationsRouter = new express.Router()

destinationsRouter.get("/", async (req, res) => {
    try {
        const allDestinations = await Destination.query()
        return res.status(200).json({ destinations: allDestinations })
    } catch (err) {
        return res.status(500).json({error: err})
    }
})

export default destinationsRouter

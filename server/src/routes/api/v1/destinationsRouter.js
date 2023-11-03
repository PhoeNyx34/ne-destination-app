import express from "express";
import { Destination } from "../../../models/index.js";
import destinationReviewsRouter from "./destinationsReviewRouter.js";

const destinationsRouter = new express.Router();

destinationsRouter.get("/", async (req, res) => {
  try {
    const allDestinations = await Destination.query();
    return res.status(200).json({ destinations: allDestinations });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

destinationsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const destination = await Destination.query().findById(id);
    return res.status(200).json({ destination: destination });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

destinationsRouter.use("/:destinationId/reviews", destinationReviewsRouter)

export default destinationsRouter;

import express from "express";
import { Destination } from "../../../models/index.js";
import destinationReviewsRouter from "./destinationsReviewRouter.js";
import objection from "objection";
const { ValidationError } = objection;
import cleanUserInput from "../../../services/cleanUserInput.js";

const destinationsRouter = new express.Router();

destinationsRouter.get("/", async (req, res) => {
  try {
    const allDestinations = await Destination.query();
    return res.status(200).json({ destinations: allDestinations });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

destinationsRouter.post("/", async (req, res) => {
  const formInput = cleanUserInput(req.body);
  try {
    const newDestinationFromDestinationTable = await Destination.query().insertAndFetch(formInput);
    return res.status(201).json({ destination: newDestinationFromDestinationTable });
  } catch (err) {
    if (err instanceof ValidationError) {
      return res.status(422).json({ errors: err.data });
    } else {
      return res.status(500).json({ errors: err });
    }
  }
});

destinationsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const destination = await Destination.query().findById(id);
    const relatedReviews = await destination.$relatedQuery("reviews");
    destination.reviews = relatedReviews;
    return res.status(200).json({ destination: destination });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

destinationsRouter.use("/:destinationId/reviews", destinationReviewsRouter);

export default destinationsRouter;

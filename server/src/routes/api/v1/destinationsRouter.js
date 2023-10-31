import express from "express";
import { Destination } from "../../../models/index.js";
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

export default destinationsRouter;

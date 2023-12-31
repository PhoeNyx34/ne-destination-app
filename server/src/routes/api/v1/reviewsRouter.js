import express from "express";
import { Review } from "../../../models/index.js";

const reviewsRouter = new express.Router();

reviewsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const reviewUserId = req.body.reviewUserId;

  if (userId === reviewUserId) {
    try {
      await Review.query().deleteById(id);
      res.status(200).json({ message: "Review successfully deleted" });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  } else {
    res.status(401).json({ message: "Unauthorized user" });
  }
});

export default reviewsRouter;

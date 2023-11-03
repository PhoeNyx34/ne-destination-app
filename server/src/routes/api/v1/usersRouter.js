import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";
import uploadImage from "../../../services/uploadImage.js";
import cleanUserInput from "../../../services/cleanUserInput.js";

import { ValidationError } from "objection";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, userName, passwordConfirmation } = req.body;

  const cleanedInput = cleanUserInput({ email, password, userName });
  try {
    const persistedUser = await User.query().insertAndFetch(cleanedInput);
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

usersRouter.patch("/:id", uploadImage.single("image"), async (req, res) => {
  const currentId = req.params.id;
  try {
    //     // const { body } = req
    const data = req.file?.location;
    // const currentUser = await User.Id });

    const updatedUser = await req.user.$query().patchAndFetch({
      image: data,
    });
    //     console.log("UPDATED USER:", updatedUser);
    // const updatedUser = await User.query().updateAndFetchById(currentId, user);
    return res.status(201).json({ user: updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
});

export default usersRouter;

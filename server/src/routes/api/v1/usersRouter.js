import express from "express";
import passport from "passport";
import { User } from "../../../models/index.js";
import uploadImage from "../../../services/uploadImage.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, userName, passwordConfirmation } = req.body;
  try {
    const persistedUser = await User.query().insertAndFetch({ email, password, userName });
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({ errors: error });
  }
});


usersRouter.patch("/:id", uploadImage.single("image"), async (req, res) => {
  const currentId = req.params.id
  try {
    // const { body } = req
    const data = req.file?.location
    const currentUser = await User.query().findOne({ id: currentId })
    console.log("CURRENT USER:", currentUser)
      const updatedUser = await currentUser.$query().patchAndFetch({
      image: data})
    console.log("UPDATED USER:", updatedUser)
    // const updatedUser = await User.query().updateAndFetchById(currentId, user)
    return res.status(201).json({ user: updatedUser })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default usersRouter;

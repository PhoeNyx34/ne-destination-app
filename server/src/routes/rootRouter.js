import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import destinationsRouter from "./api/v1/destinationsRouter.js";
import votesRouter from "./api/v1/votesRouter.js";
import reviewsRouter from "./api/v1/reviewsRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/votes", votesRouter)
rootRouter.use("/api/v1/destinations", destinationsRouter);
rootRouter.use("/api/v1/reviews", reviewsRouter);

export default rootRouter;
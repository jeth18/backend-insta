import { Router } from "express";
import { uploadRouter } from "./uploadFile.router";
import { userRouter } from "./user.router";

const router = Router();

router.use("/users", userRouter);
router.use("/image", uploadRouter);

export const privateRouter = router;

import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { privateRouter } from "./privaterouter";
import { authRouter } from "./routers";

const router = Router();

router.use("/", authRouter);
//router.use("/v1", verifyToken, privateRouter);
router.use("/v1", privateRouter);

export default router;

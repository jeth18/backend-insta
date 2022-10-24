import express from "express";
import { authRouter, userRouter } from "./routes/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", authRouter);
app.use("/users", userRouter);

export default app;

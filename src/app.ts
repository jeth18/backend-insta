import express from "express";
import router from "./routes/routes";
import cors from "cors";
import { storage } from "firebase-admin";

const app = express();

app.locals.bucket = storage().bucket();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);

export default app;

import dotenv from "dotenv";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();

initializeApp({
  credential: applicationDefault(),
});

export const db = getFirestore();

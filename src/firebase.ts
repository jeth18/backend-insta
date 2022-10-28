import dotenv from "dotenv";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config();

initializeApp({
  credential: applicationDefault(),
  storageBucket: process.env.BUCKET_URL,
});

export const db = getFirestore();

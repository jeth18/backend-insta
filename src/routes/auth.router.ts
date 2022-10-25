import { Router } from "express";
import { getAuth } from "firebase-admin/auth";
import { db } from "../firebase";
import { userValidatorRules, validateRegister } from "../middleware";
import { IUser } from "../models/users.model";

const router = Router();
const collec = db.collection("users");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send({
        message: "Email or password missing.",
      });
    }

    const q = await collec
      .where("email", "==", email)
      .where("password", "==", password)
      .get();

    const uid = q.docs[0].id;
    const { username } = q.docs[0].data();

    getAuth()
      .createCustomToken(uid)
      .then((customToken) => {
        res.send({ token: customToken, username: username });
      })
      .catch((error) => {
        console.log("Error creating custom token:", error);
      });
  } catch (e) {
    res.status(401).send({ error: "Invalid credentials" });
  }
});

router.post(
  "/register",
  userValidatorRules(),
  validateRegister,
  async (req, res) => {
    const data: IUser = req.body;

    const exist = await collec.where("username", "==", data.username).get();

    if (exist.docs[0]?.data())
      return res.status(400).send({ username: "Username exist" });

    const docRef = await collec.add(data);

    getAuth()
      .createCustomToken(docRef.id)
      .then((customToken) => {
        res.send({ token: customToken, username: data.username });
      })
      .catch((error) => {
        console.log("Error creating custom token:", error);
      });
  }
);

export const authRouter = router;

import { Router } from "express";
import { getAuth } from "firebase-admin/auth";
import { AuthController } from "../controllers/auth.controller";
import { db } from "../firebase";
import { userValidatorRules, validateRegister } from "../middleware";

const router = Router();
const collec = db.collection("users");
const controller = new AuthController();

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
  controller.saveUser
);

export const authRouter = router;

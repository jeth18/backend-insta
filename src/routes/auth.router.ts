import { Router } from "express";
import { getAuth } from "firebase-admin/auth";

const router = Router();

router.post("/login", (req, res) => {
  //const { email, password } = req.body;
  const uid = "Pbl4oT1X3doTPiGgrY5z";
  getAuth()
    .createCustomToken(uid)
    .then((customToken) => {
      // Send token back to client
      res.send(customToken);
    })
    .catch((error) => {
      console.log("Error creating custom token:", error);
    });
});

export const authRouter = router;

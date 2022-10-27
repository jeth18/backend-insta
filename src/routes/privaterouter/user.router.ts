import { Router } from "express";
import { db } from "../../firebase";
import { IUser } from "../../models/users.model";

const router = Router();

router.get("/", async (_, res) => {
  const querySnapshot = await db.collection("users").get();
  const users: Array<IUser> = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as IUser),
  }));

  res.send(users);
});

export const userRouter = router;

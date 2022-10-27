import { Router } from "express";
import { AuthController } from "../../controllers/auth.controller";
import { userValidatorRules, validateRegister } from "../../middleware";

const router = Router();
const controller = new AuthController();

router.post("/login", controller.login);

router.post(
  "/register",
  userValidatorRules(),
  validateRegister,
  controller.saveUser
);

export const authRouter = router;

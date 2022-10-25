import { body, validationResult } from "express-validator";

const userValidatorRules = () => {
  return [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("Invalid password"),
  ];
};
const validateRegister = (req, res, next) => {
  const errors: any = validationResult(req);

  if (errors.isEmpty()) return next();

  const e = errors.errors.map((e) => ({
    name: e.param,
    message: e.msg,
  }));

  return res.status(400).send({ errors: e });
};

export { userValidatorRules, validateRegister };

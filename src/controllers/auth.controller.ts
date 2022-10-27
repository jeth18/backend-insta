import { Request, Response } from "express";
import { IUser } from "../models/users.model";
import { TokenService, UserService } from "../services";
import { bcrypt } from "bcryptjs";

export class AuthController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async saveUser(req: Request, res: Response) {
    const data: IUser = req.body;
    const exist = await UserService.getUserByUsername(data.username);

    if (exist) return res.status(400).send({ username: "Username exist" });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const user: IUser = {
      ...data,
      password: password,
    };

    const userCreate = await UserService.postData(data);

    const token = await TokenService.createToken(userCreate.id, user.username);

    if (token.error) res.status(400).send(token.error);

    res.status(201).send(token);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Email or password missing.",
      });
    }

    const snapshot = await UserService.login(email, password);

    if (!snapshot)
      return res.status(401).send({ error: "Invalid credentials" });

    const token = await TokenService.createToken(
      snapshot.id,
      snapshot.data().username
    );

    if (token.error) res.status(400).send(token.error);

    res.status(200).send(token);
  }
}

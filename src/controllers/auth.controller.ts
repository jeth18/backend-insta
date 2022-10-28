import { Request, Response } from "express";
import { IUser } from "../models/users.model";
import { TokenService, UserService } from "../services";
import * as bcrypt from "bcryptjs";
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

    const userCreate = await UserService.postData(user);

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

    const user = await UserService.login(email.trim());

    if (!user) return res.status(401).send({ error: "User does not exist" });

    const validPassword = await bcrypt.compare(password, user.data().password);

    if (!validPassword)
      return res.status(400).json({ error: "Invalid Password" });

    const token = await TokenService.createToken(user.id, user.data().username);

    if (token.error) res.status(400).send(token.error);

    res.status(200).send(token);
  }
}

import { Request, Response } from "express";
import { IUser } from "../models/users.model";
import { TokenService } from "../services/token.service";
import { UserService } from "../services/users.service";

export class AuthController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async saveUser(req: Request, res: Response) {
    const data: IUser = req.body;
    const exist = await UserService.getUserByUsername(data.username);

    if (exist) return res.status(400).send({ username: "Username exist" });

    const userCreate = await UserService.postData(data);

    const token = await TokenService.createToken(userCreate.id, data.username);

    if (token.error) res.status(400).send(token.error);

    res.send(token);
  }
}

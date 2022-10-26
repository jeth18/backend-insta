import { Request, Response } from "express";
import { getAuth } from "firebase-admin/auth";
import { IUser } from "../models/users.model";
import { UserService } from "../services/users.service";

export class AuthController {
  private userService: UserService;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  saveUser(req: Request, res: Response) {
    console.log(req.body);
    const data: IUser = req.body;
    console.log(this.userService);
    this.userService.getUserByUsername(data.username);
    res.status(200).send("name");

    // //if (exist) return res.status(400).send({ username: "Username exist" });

    // this.userService.postData(data).then((resp) => {
    //   getAuth()
    //     .createCustomToken(resp.id)
    //     .then((customToken) => {
    //       res.send({ token: customToken, username: data.username });
    //     })
    //     .catch((error) => {
    //       console.log("Error creating custom token:", error);
    //     });
    // });
  }
}

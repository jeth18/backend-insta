import { db } from "../firebase";
import { IUser } from "../models/users.model";

export class UserService {
  private collec = db.collection("users");

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  public getUserByUsername(username: string) {
    this.collec
      .where("username", "==", username)
      .get()
      .then((res) => {
        console.log(res);
        return res;
      });
  }

  async postData(user: IUser) {
    return await this.collec.add(user);
  }
}

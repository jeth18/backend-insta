import { db } from "../firebase";
import { IUser } from "../models/users.model";

const authRef = db.collection("users");
export class UserService {
  static getUserByUsername(username: string): Promise<boolean> {
    return authRef
      .where("username", "==", username)
      .get()
      .then((snapshot) => {
        return !snapshot.empty;
      })
      .catch((error) => {
        console.log("Error => " + error);
        return true;
      });
  }

  static async postData(user: IUser) {
    return await authRef.add(user);
  }

  static login(email: string, password: string) {
    return authRef
      .where("email", "==", email)
      .where("password", "==", password)
      .get()
      .then((snapshot) => {
        if (snapshot.empty) return null;
        return snapshot.docs[0];
      })
      .catch((e) => {
        console.log("Error => " + e);
        return null;
      });
  }
}

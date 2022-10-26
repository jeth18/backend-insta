import { getAuth } from "firebase-admin/auth";
import { ResponseToken } from "../models/reponseToken.model";

export class TokenService {
  static async createToken(
    uid: string,
    username: string
  ): Promise<ResponseToken> {
    return getAuth()
      .createCustomToken(uid)
      .then((customToken) => {
        return { token: customToken, username: username };
      })
      .catch((error) => {
        console.log("Error => " + error);
        return { error: "Error al crear el token" };
      });
  }
}

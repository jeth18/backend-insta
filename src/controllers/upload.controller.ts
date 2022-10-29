import { Request, Response } from "express";
import saltedMd5 from "salted-md5";
import path from "path";
import app from "../app";

export class UploadController {
  static async uploadFile(req: Request, res: Response) {
    if (!req["file"]) return res.status(400).send("Error load file");

    const name = saltedMd5(req["file"].originalname, "SUPER-S@LT");
    const fileName = name + path.extname(req["file"].originalname);

    await app.locals.bucket
      .file(fileName)
      .createWriteStream()
      .end(req["file"].buffer);

    const filePublic = await app.locals.bucket.file(fileName).makePublic();

    console.log(filePublic);

    res.send("hi");

    //TODO RETURN URL DEL ARCHIVO
  }
}

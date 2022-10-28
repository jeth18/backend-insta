import { Router } from "express";
import multer from "multer";
import { UploadController } from "../../controllers/upload.controller";

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.post("/upload", upload.single("file"), UploadController.uploadFile);

export const uploadRouter = router;

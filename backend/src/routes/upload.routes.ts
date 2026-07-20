import { Router } from "express";

import authMiddleware from "../middleware/auth.middleware";

import upload from "../middleware/upload.middleware";

import {
  uploadAvatar
} from "../controllers/upload.controller";


const router = Router();



router.post(
  "/avatar",
  authMiddleware,
  upload.single("image"),
  uploadAvatar
);



export default router;
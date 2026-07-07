import { Router } from "express";
import { 
    create,
    getAll,
} from "../controllers/category.controller";
import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";

const router = Router();


router.get("/", getAll)
router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  create
);

export default router;
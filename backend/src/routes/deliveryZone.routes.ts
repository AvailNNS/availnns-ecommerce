import { Router } from "express";

import {
  createDeliveryZone,
  getDeliveryZones,
  updateDeliveryZone,
  deleteDeliveryZone,
} from "../controllers/deliveryZone.controller";

import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";

const router = Router();

router.get(
  "/",
  getDeliveryZones
);

router.post(
  "/",
  authMiddleware,
  authorize("admin"),
  createDeliveryZone
);

router.put(
  "/:id",
  authMiddleware,
  authorize("admin"),
  updateDeliveryZone
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("admin"),
  deleteDeliveryZone
);

export default router;
import {Router} from "express";

import {
getSettings,
updateSettings
}
from "../controllers/settings.controller";


import authMiddleware from "../middleware/auth.middleware";
import authorize from "../middleware/role.middleware";


const router=Router();



router.get(
"/",
getSettings
);



router.put(
"/",
authMiddleware,
authorize("admin"),
updateSettings
);



export default router;

import {Router} from "express";

import {
getUserDashboard
}
from "../controllers/dashboard.controller";


import authMiddleware
from "../middleware/auth.middleware";



const router =
Router();



router.get(
"/user",
authMiddleware,
getUserDashboard
);



export default router;
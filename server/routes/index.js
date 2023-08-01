import express from  'express';
import { 
    dashboard,
    loginController, 
    logoutController, 
    refresh, 
    registerController, 
    testRoute
} from '../controller/authController.js';
import { auth, isAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get("/test", auth, isAdmin, testRoute);

router.get("/dashboard", auth, isAdmin, dashboard);

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/logout", logoutController);

router.get("/refresh", refresh);

export default router;
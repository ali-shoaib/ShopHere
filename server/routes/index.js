import express from  'express';
import { 
    loginController, 
    logoutController, 
    refresh, 
    registerController, 
    testRoute
} from '../controller/authController.js';
import { auth, isAdmin } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get("/test", auth, isAdmin, testRoute);

router.post("/register", registerController);

router.post("/login", loginController);

router.get("/logout", logoutController);

router.get("/refresh", refresh);

export default router;
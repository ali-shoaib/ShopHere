import express from  'express';
import { loginController, registerController, testRoute } from '../controller/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get("/test", requireSignIn, isAdmin, testRoute);

router.post("/register", registerController);

router.post("/login", loginController);

export default router;
import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/Auth/authController";
import { refreshToken } from "../Controllers/Auth/authenticator";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

export default router;

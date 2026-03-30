import express from "express";
import { login, logout, onboard, signup, getMe, updateProfile } from "../controllers/authControllers.js"
import { auth } from "../middleware/auth.js";

const authRoute = express.Router();

authRoute.post("/signup", signup);
authRoute.post("/login", login);
authRoute.post("/logout", logout);
authRoute.post("/onboarding",auth,onboard);
authRoute.get("/me", auth, getMe);
authRoute.put("/profile", auth, updateProfile);

export default authRoute;
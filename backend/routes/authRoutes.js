import express from "express";
import { login, signup } from "../controllers/authController";

export const AuthRouter = express.Router();
AuthRouter.post("/auth/signup",signup);
AuthRouter.post("/auth/login",login);
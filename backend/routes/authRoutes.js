import express from "express";
import { signup } from "../controllers/authController";
const AuthRouter = express.Router();
AuthRouter.post("/auth/signup",signup);
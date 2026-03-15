import express from "express"
import { getBalance, getStatement, getUsers, transfer } from "../controllers/accountController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const AccountRouter = express.Router();
AccountRouter.get("/account/balance",authMiddleware,getBalance);

AccountRouter.get("/account/statement",authMiddleware,getStatement);

AccountRouter.post("/account/transfer",authMiddleware,transfer);

AccountRouter.get("/users",authMiddleware,getUsers);


import express from "express";
import TransactionsController from "../controllers/transactionsController.js";

const router = express.Router();

router.get("/api/transactions", TransactionsController.getTransactions);
router.get("/api/expenses", TransactionsController.getUserExpenses);

export default router;
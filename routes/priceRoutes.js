import express from "express";
import PricesController from "../controllers/priceController.js";

const router = express.Router();

router.get('/api/ethereum-prices', PricesController.getEthereumPrices);

export default router;
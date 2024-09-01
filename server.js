import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import transactionRoutes from "./routes/transactionsRoutes.js";
import pricesRoutes from "./routes/priceRoutes.js";
import fetchEthereumPrice from "./services/fetchEthereumPrice.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
const PORT = process.env.PORT | 3000;

app.use(transactionRoutes);
app.use(pricesRoutes);

fetchEthereumPrice.start();

app.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost:${PORT}`);
});
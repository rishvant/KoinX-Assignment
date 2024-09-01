import axios from "axios";
import { ETHER_API } from "../utils/api.js";
import Transaction from "../models/transactions.js";
import EthereumPrice from "../models/EthereumPrice.js";

const TransactionsController = {
    getTransactions: async (req, res) => {
        const { address } = req.body;
        if (!address) {
            return res.status(400).json({ error: 'Address is required' });
        }
        try {
            const response = await axios.get(`${ETHER_API}`, {
                params: {
                    module: 'account',
                    action: 'txlist',
                    address: address,
                    startblock: 0,
                    endblock: 99999999,
                    sort: 'asc',
                    apikey: process.env.ETHERSCAN_API_KEY
                }
            });
            const transactions = response.data.result;

            // storing transactions in db
            const storedTransactions = transactions.map(x => ({
                ...x,
                address: address,
            }));
            await Transaction.insertMany(storedTransactions);

            return res.status(response.status).json({ transactions });
        } catch (error) {
            console.error('Error fetching or storing transactions:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
    getUserExpenses: async (req, res) => {
        try {
            const { address } = req.query;

            if (!address) {
                return res.status(400).json({ error: 'Address is required' });
            }

            const transactions = await Transaction.find({ from: address });

            if (transactions.length === 0) {
                return res.status(404).json({ error: 'No transactions found for this address' });
            }

            const totalExpenses = transactions.reduce((total, x) => {
                const expense = (BigInt(x.gas) * BigInt(x.gasPrice)) / BigInt(1e18);
                return total + Number(expense);
            }, 0);

            const latestPrice = await EthereumPrice.findOne().sort({ timestamp: -1 });

            if (!latestPrice) {
                return res.status(500).json({ error: 'Could not retrieve the current Ethereum price' });
            }

            res.json({
                address,
                totalExpenses,
                etherPriceInINR: latestPrice.priceInINR,
            });
        } catch (error) {
            console.error('Error in getUserExpenses:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default TransactionsController;
import EthereumPrice from "../models/EthereumPrice.js";

const PricesController = {
    getEthereumPrices: async (req, res) => {
        try {
            const prices = await EthereumPrice.find().sort({ timestamp: -1 });
            res.json(prices);
        } catch (error) {
            console.error('Error in getEthereumPrices:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default PricesController;
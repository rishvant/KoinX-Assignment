import EthereumPrice from '../models/EthereumPrice.js';
import getEthereumPrice from './coingeckoService.js';
import cron from "node-cron";

const fetchEthereumPrice = cron.schedule('*/10 * * * *', async () => {
    try {
        const priceInINR = await getEthereumPrice();
        const newPrice = new EthereumPrice({ priceInINR });
        await newPrice.save();
    } catch (error) {
        console.log(error);
    }
});

export default fetchEthereumPrice;
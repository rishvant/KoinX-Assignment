import axios from "axios";
import { COINGECKO_API } from "../utils/api.js";

const getEthereumPrice = async () => {
    try {
        const response = await axios.get(`${COINGECKO_API}`, {
            params: {
                ids: 'ethereum',
                vs_currencies: 'inr'
            }
        });

        if (!response.data.ethereum || !response.data.ethereum.inr) {
            throw new Error('Failed to fetch Ethereum price');
        }

        return response.data.ethereum.inr;
    } catch (error) {
        console.error('Error fetching Ethereum price:', error);
        throw new Error('Error fetching Ethereum price');
    }
};

export default getEthereumPrice;
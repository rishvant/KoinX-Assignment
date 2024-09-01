import mongoose from "mongoose";

const ethereumPriceSchema = new mongoose.Schema({
    priceInINR: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now, required: true }
}, {
    timestamps: true
});

const EthereumPrice = mongoose.model('EthereumPrice', ethereumPriceSchema);

export default EthereumPrice;
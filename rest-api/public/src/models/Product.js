const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    promotionPrice: { type: Number, default: null },
    category: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    image: { type: String }
});

module.exports = mongoose.model('Product', ProductSchema);

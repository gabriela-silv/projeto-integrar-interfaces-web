const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
};

exports.getProductByCode = async (req, res) => {
    const { productCode } = req.params;

    try {
        const product = await Product.findOne({ productCode });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
};

exports.addProduct = async (req, res) => {
    const newProduct = req.body;

    try {
        const product = new Product(newProduct);
        await product.save();
        res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding product' });
    }
};

exports.updateProduct = async (req, res) => {
    const { productCode } = req.params;
    const updatedData = req.body;

    try {
        const product = await Product.findOneAndUpdate({ productCode }, updatedData, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product' });
    }
};

exports.deleteProduct = async (req, res) => {
    const { productCode } = req.params;

    try {
        const product = await Product.findOneAndDelete({ productCode });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
};

exports.applyDiscount = async (req, res) => {
    const { discountCode, productCode } = req.body;

    try {
        const product = await Product.findOne({ productCode });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (discountCode === 'DISCOUNT10') {
            product.currentPrice *= 0.9;
            await product.save();
            return res.json({ message: 'Discount applied successfully', product });
        } else {
            return res.status(400).json({ message: 'Invalid discount code' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error applying discount', error });
    }
};

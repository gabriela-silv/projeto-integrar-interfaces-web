const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

// Get all orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user').populate('products');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

// Create a new order
exports.createOrder = async (req, res) => {
    const { userId, productCodes } = req.body; // productCodes: array de códigos de produtos

    try {
        // Verifica se o usuário existe
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Busca os produtos com base nos códigos
        const products = await Product.find({ productCode: { $in: productCodes } });
        if (!products || products.length === 0) {
            return res.status(404).json({ message: 'No products found for the provided codes' });
        }

        // Calcula o total do pedido
        const total = products.reduce((sum, product) => sum + product.currentPrice, 0);

        const newOrder = new Order({
            user: user._id,
            products: products.map(p => p._id),
            total
        });

        await newOrder.save();

        // Atualiza os pedidos do usuário
        user.orders.push(newOrder._id);
        await user.save();

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id).populate('user').populate('products');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
};

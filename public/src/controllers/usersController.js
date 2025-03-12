const User = require('../models/User');

// Get all users (com informações de profile e orders)
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('profile').populate('orders');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Add a new user (alternative to signup via authController)
exports.addUser = async (req, res) => {
    const { username, name, cpf, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newUser = new User({ username, name, cpf, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding user' });
    }
};

// Update an existing user
exports.updateUser = async (req, res) => {
    const username = req.params.username;
    const updatedData = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate({ username }, updatedData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const username = req.params.username;

    try {
        const deletedUser = await User.findOneAndDelete({ username });
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting user' });
    }
};

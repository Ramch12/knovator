const Product = require('../models/product'); // Assuming your Product model is in the models folder

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, images } = req.body;

        // Create a new product instance
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            images
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        // Send a response with the saved product
        res.status(201).json(savedProduct);
    } catch (error) {
        // Handle any errors that occur during the save process
        res.status(400).json({ error: error.message });
    }
};

const getProduct = async (req, res) => {
    const products = await Product.find().populate('category');
    res.send(products);
}

module.exports = {
    createProduct,
    getProduct
};

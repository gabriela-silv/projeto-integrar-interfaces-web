const Product = require("../models/product");

const createProduct = async (name, price, type, description) => {
  const newProduct = new Product({
    name,
    price,
    type,
    description,
  });

  await newProduct.save();
  return newProduct;
};

const getAllProducts = async () => {
  const products = await Product.find();
  return products;
};

const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);
  return true;
};

const editProduct = async (id, name, price, type, description) => {
  let product = await Product.findByIdAndUpdate(
    id,
    { name, price, type, description },
    { new: true }
  );
  return product;
};

module.exports = { getAllProducts, createProduct, editProduct, deleteProduct };

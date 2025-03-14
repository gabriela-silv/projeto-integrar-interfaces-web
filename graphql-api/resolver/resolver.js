const productController = require("../controllers/productController");

const resolvers = {
  Query: {
    products: async () => await productController.getAllProducts(),
  },

  Mutation: {
    createProduct: async (_, { name, price, type, description }) => {
      return await productController.createProduct(
        name,
        price,
        type,
        description
      );
    },
    updateProduct: async (_, { id, name, price, type, description }) => {
      return await productController.editProduct(
        id,
        name,
        price,
        type,
        description
      );
    },
    deleteProduct: async (_, { id }) => {
      return await productController.deleteProduct(id);
    },
  },
};

module.exports = resolvers;

const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    type: String!
    description: String!
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(
      name: String!
      price: Float!
      type: String!
      description: String!
    ): Product

    updateProduct(
      id: ID!
      name: String!
      price: Float!
      type: String!
      description: String!
    ): Product

    deleteProduct(id: ID!): Boolean
  }
`;

module.exports = { typeDefs };

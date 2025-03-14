const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const authMiddleware = require('../middlewares/authMiddleware');


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Server error
 */
router.get('/', authMiddleware, productsController.getProducts);

/**
 * @swagger
 * /api/products/{productCode}:
 *   get:
 *     summary: Retrieve a product by productCode
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The product code
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.get('/:productCode', authMiddleware, productsController.getProductByCode);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       description: Product data to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productCode
 *               - name
 *               - currentPrice
 *               - category
 *               - description
 *             properties:
 *               productCode:
 *                 type: string
 *               name:
 *                 type: string
 *               currentPrice:
 *                 type: number
 *               promotionPrice:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post('/', authMiddleware, productsController.addProduct);

/**
 * @swagger
 * /api/products/{productCode}:
 *   put:
 *     summary: Update a product by productCode
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The product code
 *     requestBody:
 *       description: Updated product data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               currentPrice:
 *                 type: number
 *               promotionPrice:
 *                 type: number
 *               category:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.put('/:productCode', authMiddleware, productsController.updateProduct);

/**
 * @swagger
 * /api/products/{productCode}:
 *   delete:
 *     summary: Delete a product by productCode
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productCode
 *         schema:
 *           type: string
 *         required: true
 *         description: The product code
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.delete('/:productCode', authMiddleware, productsController.deleteProduct);

/**
 * @swagger
 * /api/products/apply-discount:
 *   post:
 *     summary: Apply a discount to a product
 *     tags: [Products]
 *     requestBody:
 *       description: Discount data containing discount code and product code
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - discountCode
 *               - productCode
 *             properties:
 *               discountCode:
 *                 type: string
 *               productCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: Discount applied successfully
 *       400:
 *         description: Invalid discount code or product not found
 *       500:
 *         description: Server error
 */
router.post('/apply-discount', authMiddleware, productsController.applyDiscount);

module.exports = router;

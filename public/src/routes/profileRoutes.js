const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile endpoints
 */

/**
 * @swagger
 * /api/profile/update-image:
 *   post:
 *     summary: Update user profile image
 *     tags: [Profile]
 *     requestBody:
 *       description: User ID and image data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - image
 *             properties:
 *               userId:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile image updated successfully
 *       400:
 *         description: Missing userId or image
 *       500:
 *         description: Server error
 */
router.post('/update-image', profileController.updateProfileImage);

/**
 * @swagger
 * /api/profile/update:
 *   post:
 *     summary: Update user profile information
 *     tags: [Profile]
 *     requestBody:
 *       description: User ID and profile data (address, phone, etc.)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       500:
 *         description: Server error
 */
router.post('/update', profileController.updateProfile);

module.exports = router;

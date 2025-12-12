// BackEnd/routes/users.js 
import express from 'express'; 
import { protect } from '../middleware/authMiddleware.js'; 
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile management and protected routes
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get current user profile (Protected)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user data.
 *       401:
 *         description: Unauthorized - Token is missing or invalid.
 */
router.route('/profile').get(protect, (req, res) => {
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
});

export default router;

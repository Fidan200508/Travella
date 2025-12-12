// BackEnd/routes/auth.js - Yekun, Səhvsiz Swagger Şərhləri 
import express from "express"; 
import { registerUser, authUser } from "../controllers/authController.js"; 
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User registration and login operations
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user and get a JWT Token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: SamraTraveler
 *               email:
 *                 type: string
 *                 format: email
 *                 example: samra.user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePassword123!
 *     responses:
 *       201:
 *         description: Registration successful, returns user data and JWT Token.
 *       400:
 *         description: Email already exists.
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login and get a JWT Token
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: samra.user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: SecurePassword123!
 *     responses:
 *       200:
 *         description: Login successful, returns user data and JWT Token.
 *       401:
 *         description: Invalid email or password.
 */
router.post("/login", authUser);

export default router;
// BackEnd/routes/planRoutes.js

import express from 'express';
import { 
    getMyPlans, 
    createPlan, 
    getPlanById, 
    updatePlan, 
    deletePlan 
} from '../controllers/planController.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router
    .route('/')
    .get(protect, getMyPlans) // GET /api/plans
    .post(protect, createPlan);

router
    .route('/:id')
    .get(protect, getPlanById) // <-- GET /api/plans/:id
    .put(protect, updatePlan)    // <-- PUT /api/plans/:id
    .delete(protect, deletePlan); // <-- DELETE /api/plans/:id

/**
 * @swagger
 * tags:
 *   name: Travel Plans
 *   description: CRUD operations for user travel plans. All endpoints require JWT authentication.
 */

/**
 * @swagger
 * /api/plans:
 *   get:
 *     summary: Get all travel plans for the authenticated user.
 *     tags: [Travel Plans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's travel plans.
 *       401:
 *         description: Unauthorized (Missing or invalid token).
 *   post:
 *     summary: Create a new travel plan.
 *     tags: [Travel Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Baku-Tbilisi Road Trip
 *               description:
 *                 type: string
 *                 example: A 5-day trip covering historical sights.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-10-05"
 *               budget:
 *                 type: number
 *                 example: 850
 *     responses:
 *       201:
 *         description: Plan successfully created.
 *       400:
 *         description: Invalid data provided.
 *       401:
 *         description: Unauthorized.
 */

/**
 * @swagger
 * /api/plans/{id}:
 *   get:
 *     summary: Get a single plan by ID.
 *     tags: [Travel Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Plan ID
 *     responses:
 *       200:
 *         description: Plan details.
 *       401:
 *         description: Unauthorized or not your plan.
 *       404:
 *         description: Plan not found.
 *
 *   put:
 *     summary: Update an existing plan by ID.
 *     tags: [Travel Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Plan ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Trip Title
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Plan successfully updated.
 *       401:
 *         description: Unauthorized or not your plan.
 *       404:
 *         description: Plan not found.
 *
 *   delete:
 *     summary: Delete a plan by ID.
 *     tags: [Travel Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Plan ID
 *     responses:
 *       200:
 *         description: Plan successfully deleted.
 *       401:
 *         description: Unauthorized or not your plan.
 *       404:
 *         description: Plan not found.
 */

export default router;
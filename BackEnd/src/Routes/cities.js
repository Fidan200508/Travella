/**
 * @swagger
 * /cities:
 *   get:
 *     summary: Get all cities
 *     responses:
 *       200:
 *         description: List of cities
 */

/**
 * @swagger
 * /cities/{city}/places:
 *   get:
 *     summary: Get places for a city
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *     responses:
 *       200:
 *         description: Places list
 */


import express from "express";
import { getCities, getPlacesByCity } from "../controllers/citiesController.js";

const router = express.Router();

router.get("/", getCities);
router.get("/:city/places", getPlacesByCity);

export default router;

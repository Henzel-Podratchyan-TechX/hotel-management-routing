const express = require("express");
const router = express.Router();
const roomsController = require('../controllers/rooms.controller');
const { validateRoom } = require('../middleware/validations/rooms.validation');

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         room_number:
 *           type: string
 *         floor:
 *           type: string
 *         status:
 *           type: string
 *           enum: [available, occupied, maintenance]
 *       required:
 *         - room_number
 *         - floor
 *         - status
 */

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: List of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */
router.get("/",  roomsController.getAll);

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Get a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The room ID
 *     responses:
 *       200:
 *         description: Room found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/:id", roomsController.getOne);

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_number:
 *                 type: string
 *               floor:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [available, occupied, maintenance]
 *             required:
 *               - room_number
 *               - floor
 *               - status
 *     responses:
 *       201:
 *         description: Room created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Invalid or missing fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/", validateRoom, roomsController.create);

/**
 * @swagger
 * /api/rooms/{id}:
 *   patch:
 *     summary: Update a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               room_number:
 *                 type: string
 *               floor:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [available, occupied, maintenance]
 *     responses:
 *       200:
 *         description: Room updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       400:
 *         description: Invalid status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.patch("/:id", validateRoom, roomsController.update);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The room ID
 *     responses:
 *       204:
 *         description: Room deleted successfully
 *       404:
 *         description: Room not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete("/:id", roomsController.delete);

module.exports = router;

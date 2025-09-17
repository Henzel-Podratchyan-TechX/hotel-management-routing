const express = require("express");
const router = express.Router();

let rooms = [];
let idCounter = 1;

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
router.get("/", (req, res) => res.json(rooms));

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
router.get("/:id", (req, res) => {
    const room = rooms.find(r => r.id === parseInt(req.params.id));
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json(room);
});

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
router.post("/", (req, res) => {
    const { room_number, floor, status } = req.body;
    if (!room_number || !floor || !status || !["available", "occupied", "maintenance"].includes(status)) {
        return res.status(400).json({ error: "Invalid or missing fields" });
    }

    const room = { id: idCounter++, room_number, floor, status };
    rooms.push(room);
    res.status(201).json(room);
});

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
router.patch("/:id", (req, res) => {
    const room = rooms.find(r => r.id === parseInt(req.params.id));
    if (!room) return res.status(404).json({ error: "Room not found" });

    if (req.body.status && !["available", "occupied", "maintenance"].includes(req.body.status)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    Object.assign(room, req.body);
    res.json(room);
});

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
router.delete("/:id", (req, res) => {
    const index = rooms.findIndex(r => r.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Room not found" });

    rooms.splice(index, 1);
    res.status(204).end();
});

module.exports = router;

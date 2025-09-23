const express = require("express");
const router = express.Router();
const RoomRepository = require("../repositories/rooms.repository");
const { RoomStatus } = require("../models/room.model");
const Log = require("../utils/Logger");
const repo = new RoomRepository();

const TAG = "room-routes"

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
router.get("/",  async (req, res) => {
    try {
        const rooms = await repo.getAllRooms();
        Log.i(TAG, rooms);
        res.json(rooms);
    } catch (err) {
        Log.e(TAG, err.message);
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
});

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
router.get("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const room = await repo.getRoomById(id);

        Log.d(TAG, room)

        if (!room) {
            return res.status(404).json({ error: "Room not found" })
        }

        res.json(room);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch room"})
    }
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
router.post("/", async (req, res) => {
    try {
        const { room_number, floor, status} = req.body;

        if (!room_number || !floor || !status) {
            return res.status(400).json({ error : "Missing required fields"})
        }

        if (!Object.values(RoomStatus).includes(status)) {
            return res.status(400).json({ error: "Invalid status"})
        }

        const newRoom = await repo.createRoom({ room_number, floor, status });

        Log.d(TAG, newRoom)
        res.status(200).json(newRoom);
    } catch (err) {
        Log.e(TAG, err)
        res.status(500).json({ error: err.message || "Failed to create room" });
    }
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
router.patch("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedRoom = await repo.updateRoom(id, req.body);

        if (!updatedRoom) {
            return res.status(400).json({ error: "Room not found" });
        }

        Log.d(TAG, updatedRoom)

        res.json(updatedRoom);
    } catch (err) {
        Log.e(TAG, err)
        res.status(400).json({ error: err.message || "Failed to update room" });
    }
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
router.delete("/:id", async (req, res) => {
   try {
       const id = parseInt(req.params.id);
       const deleted = await repo.deleteRoom(id);

       if (!deleted) {
           return res.status(400).json({ error: "Room not found" })
       }

       Log.d(TAG, deleted)

       res.status(204).end()
   } catch (err) {
       Log.e(TAG, err)
       res.status(500).json({ error: "Failed to delete room" })
   }
});

module.exports = router;

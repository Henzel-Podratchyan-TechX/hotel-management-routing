const express = require("express");
const router = express.Router();
const GuestRepository = require("../repositories/guests.repository");
const Log = require("../utils/Logger");
const repo = new GuestRepository();

const TAG = "gust-routes"

/**
 * @swagger
 * /api/guests:
 *   get:
 *     summary: Get all guests
 *     tags: [Guests]
 *     responses:
 *       200:
 *         description: List of guests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Guest'
 */
router.get("/", async (req, res) => {
    try {
        const guests = await repo.getAllGuests();
        Log.i(TAG, guests);
        res.json(guests);
    } catch (err) {
        Log.e(TAG, err.message);
        res.status(500).json({error: "Failed to fetch guests"});
    }
});

/**
 * @swagger
 * /api/guests/{id}:
 *   get:
 *     summary: Get a guest by ID
 *     tags: [Guests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The guest ID
 *     responses:
 *       200:
 *         description: Guest found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guest'
 *       404:
 *         description: Guest not found
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
        const id = parseInt(req.params.id);
        const guest = await repo.getGuestById(id);

        Log.d(TAG, guest)

        if (!guest) return res.status(404).json({ error: "Guest not found" });

        res.json(guest);
    } catch (err) {
        Log.e(TAG, err.message);
        res.status(500).json({ error: "Failed to fetch guest" });
    }
});

/**
 * @swagger
 * /api/guests:
 *   post:
 *     summary: Create a new guest
 *     tags: [Guests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GuestInput'
 *     responses:
 *       201:
 *         description: Guest created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guest'
 *       400:
 *         description: Bad request
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
        const { first_name, last_name, email, phone, room_n, cleaned_at } = req.body;

        if (!first_name || !last_name || !email) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const newGuest = await repo.createGuest({
            first_name,
            last_name,
            email,
            phone,
            room_n,
            cleaned_at
        });

        Log.d(TAG, newGuest)

        res.status(201).json(newGuest);
    } catch (err) {
        Log.e(TAG, err)
        res.status(500).json({ error: "Failed to create guest" });
    }
});

/**
 * @swagger
 * /api/guests/{id}:
 *   patch:
 *     summary: Update a guest by ID
 *     tags: [Guests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The guest ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GuestInput'
 *     responses:
 *       200:
 *         description: Guest updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guest'
 *       404:
 *         description: Guest not found
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
        const updatedGuest = await repo.updateGuest(id, req.body);

        Log.d(TAG, updatedGuest)

        if (!updatedGuest) return res.status(404).json({ error: "Guest not found" });

        res.json(updatedGuest);
    } catch (err) {
        Log.e(TAG, err)
        res.status(500).json({ error: "Failed to update guest" });
    }
});

/**
 * @swagger
 * /api/guests/{id}:
 *   delete:
 *     summary: Delete a guest by ID
 *     tags: [Guests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The guest ID
 *     responses:
 *       204:
 *         description: Guest deleted successfully
 *       404:
 *         description: Guest not found
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
        const deleted = await repo.deleteGuest(id);

        Log.d(TAG, deleted)

        if (!deleted) return res.status(404).json({ error: "Guest not found" });

        res.status(204).end();
    } catch (err) {
        Log.e(TAG, err)
        res.status(500).json({ error: "Failed to delete guest" });
    }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Guest:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         room_n:
 *           type: string
 *         cleaned_at:
 *           type: string
 *           format: date-time
 *     GuestInput:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         room_n:
 *           type: string
 *         cleaned_at:
 *           type: string
 *           format: date-time
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 */

module.exports = router;

const express = require("express");
const router = express.Router();

let guests = [];
let idCounter = 1;

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
router.get("/", (req, res) => {
    res.json(guests);
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
router.get("/:id", (req, res) => {
    const guest = guests.find(g => g.id === parseInt(req.params.id));
    if (!guest) return res.status(404).json({ error: "Guest not found" });
    res.json(guest);
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
router.post("/", (req, res) => {
    const { first_name, last_name, email, phone, room_n, cleaned_at } = req.body;
    if (!first_name || !last_name || !email) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const guest = { id: idCounter++, first_name, last_name, email, phone, room_n, cleaned_at };
    guests.push(guest);
    res.status(201).json(guest);
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
router.patch("/:id", (req, res) => {
    const guest = guests.find(g => g.id === parseInt(req.params.id));
    if (!guest) return res.status(404).json({ error: "Guest not found" });

    Object.assign(guest, req.body);
    res.json(guest);
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
router.delete("/:id", (req, res) => {
    const index = guests.findIndex(g => g.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Guest not found" });

    guests.splice(index, 1);
    res.status(204).end();
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

const express = require("express");
const router = express.Router();
const bookingsController = require('../controllers/bookings.controller');
const { validateBooking } = require('../middleware/validations/bookings.validation');

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         guest_id:
 *           type: integer
 *         room_id:
 *           type: integer
 *         check_in_date:
 *           type: string
 *           format: date
 *         check_out_date:
 *           type: string
 *           format: date
 *         num_guests:
 *           type: integer
 *         status:
 *           type: string
 *       required:
 *         - guest_id
 *         - room_id
 *         - check_in_date
 *         - check_out_date
 *         - num_guests
 *         - status
 */

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 */
router.get("/", bookingsController.getAll);

/**
 * @swagger
 * /api/bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The booking ID
 *     responses:
 *       200:
 *         description: Booking found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/:id", bookingsController.getOne);

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guest_id:
 *                 type: integer
 *               room_id:
 *                 type: integer
 *               check_in_date:
 *                 type: string
 *                 format: date
 *               check_out_date:
 *                 type: string
 *                 format: date
 *               num_guests:
 *                 type: integer
 *               status:
 *                 type: string
 *             required:
 *               - guest_id
 *               - room_id
 *               - check_in_date
 *               - check_out_date
 *               - num_guests
 *               - status
 *     responses:
 *       201:
 *         description: Booking created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/", validateBooking, bookingsController.create);


/**
 * @swagger
 * /api/bookings/{id}:
 *   patch:
 *     summary: Update a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               guest_id:
 *                 type: integer
 *               room_id:
 *                 type: integer
 *               check_in_date:
 *                 type: string
 *                 format: date
 *               check_out_date:
 *                 type: string
 *                 format: date
 *               num_guests:
 *                 type: integer
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Booking updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       404:
 *         description: Booking not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.patch("/:id", validateBooking, bookingsController.update);


/**
 * @swagger
 * /api/bookings/{id}:
 *   delete:
 *     summary: Delete a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The booking ID
 *     responses:
 *       204:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete("/:id", bookingsController.delete);

module.exports = router;

const express = require("express");
const router = express.Router();

let bookings = [];
let idCounter = 1;

router.get("/", (req, res) => res.json(bookings));

router.get("/:id", (req, res) => {
    const booking = bookings.find(b => b.id === parseInt(req.params.id));
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
});

router.post("/", (req, res) => {
    const { guest_id, room_id, check_in_date, check_out_date, num_guests, status } = req.body;
    if (!guest_id || !room_id || !check_in_date || !check_out_date || !num_guests || !status) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const booking = { id: idCounter++, guest_id, room_id, check_in_date, check_out_date, num_guests, status };
    bookings.push(booking);
    res.status(201).json(booking);
});

router.patch("/:id", (req, res) => {
    const booking = bookings.find(b => b.id === parseInt(req.params.id));
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    Object.assign(booking, req.body);
    res.json(booking);
});

router.delete("/:id", (req, res) => {
    const index = bookings.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Booking not found" });

    bookings.splice(index, 1);
    res.status(204).end();
});

module.exports = router;

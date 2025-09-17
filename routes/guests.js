const express = require("express");
const router = express.Router();

let guests = [];
let idCounter = 1;

router.get("/", (req, res) => {
    res.json(guests);
});

router.get("/:id", (req, res) => {
    const guest = guests.find(g => g.id === parseInt(req.params.id));
    if (!guest) return res.status(404).json({ error: "Guest not found" });
    res.json(guest);
});

router.post("/", (req, res) => {
    const { first_name, last_name, email, phone, room_n, cleaned_at } = req.body;
    if (!first_name || !last_name || !email) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const guest = { id: idCounter++, first_name, last_name, email, phone, room_n, cleaned_at };
    guests.push(guest);
    res.status(201).json(guest);
});

router.patch("/:id", (req, res) => {
    const guest = guests.find(g => g.id === parseInt(req.params.id));
    if (!guest) return res.status(404).json({ error: "Guest not found" });

    Object.assign(guest, req.body);
    res.json(guest);
});

router.delete("/:id", (req, res) => {
    const index = guests.findIndex(g => g.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Guest not found" });

    guests.splice(index, 1);
    res.status(204).end();
});

module.exports = router;

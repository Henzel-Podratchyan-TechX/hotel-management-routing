const express = require("express");
const router = express.Router();

let rooms = [];
let idCounter = 1;

router.get("/", (req, res) => res.json(rooms));

router.get("/:id", (req, res) => {
    const room = rooms.find(r => r.id === parseInt(req.params.id));
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.json(room);
});

router.post("/", (req, res) => {
    const { room_number, floor, status } = req.body;
    if (!room_number || !floor || !status || !["available", "occupied", "maintenance"].includes(status)) {
        return res.status(400).json({ error: "Invalid or missing fields" });
    }

    const room = { id: idCounter++, room_number, floor, status };
    rooms.push(room);
    res.status(201).json(room);
});

router.patch("/:id", (req, res) => {
    const room = rooms.find(r => r.id === parseInt(req.params.id));
    if (!room) return res.status(404).json({ error: "Room not found" });

    if (req.body.status && !["available", "occupied", "maintenance"].includes(req.body.status)) {
        return res.status(400).json({ error: "Invalid status" });
    }

    Object.assign(room, req.body);
    res.json(room);
});

router.delete("/:id", (req, res) => {
    const index = rooms.findIndex(r => r.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Room not found" });

    rooms.splice(index, 1);
    res.status(204).end();
});

module.exports = router;

function validateRoom(req, res, next) {
    const { room_number, floor, status } = req.body;
    if (!room_number || !floor || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    next();
}

module.exports = { validateRoom };

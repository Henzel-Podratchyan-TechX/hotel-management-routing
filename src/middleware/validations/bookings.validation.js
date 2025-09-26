function validateBooking(req, res, next) {
    const { guest_id, room_id, check_in_date, check_out_date, num_guests, status } = req.body;
    if (!guest_id || !room_id || !check_in_date || !check_out_date || !num_guests || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    next();
}

module.exports = { validateBooking };

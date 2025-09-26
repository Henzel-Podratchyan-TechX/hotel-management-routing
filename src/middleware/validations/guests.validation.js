function validateGuest(req, res, next) {
    const { first_name, last_name, email } = req.body;
    if (!first_name || !last_name || !email) {
        return res.status(400).json({ error: 'First name, last name, and email are required' });
    }
    next();
}

module.exports = { validateGuest };

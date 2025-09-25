const bookingsService = require('../services/bookings.service');
const Log = require('../utils/Logger');

const TAG = "BookingsController"

class BookingsController {
    async getAll(req, res, next) {
        try {
            const bookings = await bookingsService.getAllBookings();
            res.json(bookings);
            Log.d(TAG, bookings.toString());
        } catch (err) {
            Log.e(TAG, err);
            next(err);
        }
    }

    async getOne(req, res, next) {
        try {
            const booking = await bookingsService.getBookingById(req.params.id);
            res.json(booking);
            Log.d(TAG, booking);
        } catch (err) {
            Log.e(TAG, err);
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const newBooking = await bookingsService.createBooking(req.body);
            res.status(201).json(newBooking);
            Log.d(TAG, newBooking);
        } catch (err) {
            Log.e(TAG, err);
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const updated = await bookingsService.updateBooking(req.params.id, req.body);
            res.json(updated);
            Log.d(TAG, updated);
        } catch (err) {
            Log.e(TAG, err.message);
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            await bookingsService.deleteBooking(req.params.id);
            res.status(204).send();
            Log.d(TAG, "Guest deleted successfully");
        } catch (err) {
            Log.e(TAG, err);
            next(err);
        }
    }
}

module.exports = new BookingsController();

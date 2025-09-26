const guestsService = require('../services/guests.service');
const Log = require('../utils/Logger');

const TAG = "GuestsController"

class GuestsController {
    async getAll(req, res, next) {
        try {
            const guests = await guestsService.getAllGuests();
            res.json(guests);
            Log.d(TAG, guests.toString());
        } catch (err) {
            Log.e(TAG, err);
            next(err);
        }
    }

    async getOne(req, res, next) {
        try {
            const guest = await guestsService.getGuestById(req.params.id);
            res.json(guest);
            Log.d(TAG, guest);
        } catch (err) {
            Log.e(TAG, err);
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const newGuest = await guestsService.createGuest(req.body);
            res.status(201).json(newGuest);
            Log.d(TAG, newGuest);
        } catch (err) {
            Log.e(TAG, err);
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const updated = await guestsService.updateGuest(req.params.id, req.body);
            res.json(updated);
            Log.d(TAG, updated);
        } catch (err) {
            Log.e(TAG, err.message);
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            await guestsService.deleteGuest(req.params.id);
            res.status(204).send();
            Log.d(TAG, "Guest deleted successfully");
        } catch (err) {
            Log.e(TAG, err);
            next(err);
        }
    }
}

module.exports = new GuestsController();

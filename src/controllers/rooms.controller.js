const roomsService = require('../services/rooms.service');
const Log = require('../utils/Logger');

const TAG = "RoomsController"

class RoomsController {
    async getAll(req, res, next) {
        try {
            const bookings = await roomsService.getAllRooms();
            res.json(bookings);
            Log.d(TAG, bookings.toString());
        } catch (err) {
            Log.e(TAG, err);
            next(err);
        }
    }

    async getOne(req, res, next) {
        try {
            const room = await roomsService.getRoomById(req.params.id);
            res.json(room);
            Log.d(TAG, room);
        } catch (err) {
            Log.e(TAG, err);
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            const newRoom = await roomsService.createRoom(req.body);
            res.status(201).json(newRoom);
            Log.d(TAG, newRoom);
        } catch (err) {
            Log.e(TAG, err);
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const updated = await roomsService.updateRoom(req.params.id, req.body);
            res.json(updated);
            Log.d(TAG, updated);
        } catch (err) {
            Log.e(TAG, err.message);
            next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const deleted = await roomsService.deleteRoom(req.params.id);
            res.status(204).send();
            Log.d(TAG, deleted);
        } catch (err) {
            Log.e(TAG, err);
            next(err);
        }
    }
}

module.exports = new RoomsController();

const bookingsRepository = require("../repositories/rooms.repository");
const createHttpError = require("../utils/http-errors");

class RoomService {
    async getAllRooms() {
        return await bookingsRepository.getAllRooms();
    }

    async getRoomById(id) {
        const room = await bookingsRepository.getRoomById(id);
        if (!room) throw createHttpError(404, "Room not found");
        return room;
    }

    async createRoom(data) {
        if (
            !data.room_number
            || !data.floor
            || !data.status
        ) {
            throw createHttpError(400, "Empty fields are presented");
        }
        return await bookingsRepository.createRoom(data);
    }

    async updateRoom(id, data) {
        const updated = await bookingsRepository.updateRoom(id, data);
        if (!updated) throw createHttpError(404, "Room not found");
        return updated;
    }

    async deleteRoom(id) {
        const deleted = await bookingsRepository.deleteRoom(id);
        if (!deleted) throw createHttpError(404, "Room not found");
        return deleted;
    }
}

module.exports = new RoomService();

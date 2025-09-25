const fs = require("fs").promises;
const path = require("path");
const { Room, RoomStatus } = require("../models/room.model");
const Log = require("../utils/Logger");

const TAG = "RoomRepository";

const filePath = path.join(__dirname, "data.local/rooms.json");

class RoomRepository {
    async _readFile() {
        const rawData = await fs.readFile(filePath, "utf8");
        const data = JSON.parse(rawData);
        return data.rooms.map(r => new Room(r.id, r.room_number, r.floor, r.status));
    }

    async _writeFile(rooms) {
        const data = { rooms: rooms.map(r => ({
                id: r.id,
                room_number: r.room_number,
                floor: r.floor,
                status: r.status
            })) };
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    }

    async getAllRooms() {
        const data = this._readFile();
        Log.d(TAG, data);
        return data;
    }

    async getRoomById(id) {
        const rooms = await this._readFile();
        const room = rooms.find(r => r.id === Number(id)) || null;
        Log.d(TAG, room);
        return room;
    }

    async createRoom(roomData) {
        const rooms = await this._readFile();

        const newId = rooms.length ? Math.max(...rooms.map(r => r.id)) + 1 : 1;

        const newRoom = new Room(newId,
            roomData.room_number,
            roomData.floor,
            roomData.status
        );

        Log.d(TAG, newRoom);

        rooms.push(newRoom);
        await this._writeFile(rooms);

        return newRoom;
    }

    async updateRoom(id, updatedData) {
        const rooms = await this._readFile();
        const index = rooms.findIndex(r => r.id === Number(id));

        if (index === -1) return null;

        rooms[index] = new Room(
            id,
            updatedData.room_number ?? rooms[index].room_number,
            updatedData.floor ?? rooms[index].floor,
            updatedData.status ?? rooms[index].status
        );

        Log.d(TAG, rooms[index]);

        await this._writeFile(rooms);
        return rooms[index];
    }

    async deleteRoom(id) {
        const rooms = await this._readFile();
        const index = rooms.findIndex(r => r.id === id);

        if (index === -1) return false;

        Log.d(TAG, rooms[index]);

        rooms.splice(index, 1);
        await this._writeFile(rooms);

        return true;
    }
}

module.exports = new RoomRepository();

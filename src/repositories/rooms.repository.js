const { Room } = require("../models/room.model");
const db = require('./connection');
const Log = require("../utils/Logger");

const TAG = "RoomRepository";

class RoomRepository {
    async getAllRooms() {
        const data = await db.query("SELECT * FROM room ORDER BY id ASC");
        Log.d(TAG, data.rows);
        return data.rows.map(
            r =>
                new Room(
                    r.room_number,
                    r.floor,
                    r.status,
                )
        );
    }

    async getRoomById(id) {
        const data = await db.query("SELECT * FROM room WHERE id = $1", [id]);
        const r = data.rows[0];
        Log.d(TAG, r);
        return r
            ? new Room(
                r.id,
                r.room_number,
                r.floor,
                r.status
            )
            : null;
    }

    async createRoom(roomData) {
        const data = await db.query(
            `INSERT INTO room (room_number, floor, status)
                    VALUES ($1, $2, $3)
                    RETURNING *`,
            [
                roomData.room_number,
                roomData.floor,
                roomData.status,
            ]
        );
        Log.d(TAG, data.rows[0]);
        return data.rows[0];
    }

    async updateRoom(id, updatedData) {
        const fields = [];
        const values = [];
        let index = 1;

        for (const [key, value] of Object.entries(updatedData)) {
            fields.push(`${key} = $${index}`);
            values.push(value);
            index++;
        }

        if (fields.length === 0) return null;

        values.push(id);

        const data = await db.query(
            `UPDATE room SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`,
            values
        );

        const r = data.rows[0];
        Log.d(TAG, r);
        return r
            ? new Room(
                r.id,
                r.room_number,
                r.floor,
                r.status
            )
            : null;
    }

    async deleteRoom(id) {
        const data = await db.query("DELETE FROM room WHERE id = $1", [id]);
        Log.d(TAG, data.rowCount);
        return data.rowCount > 0;
    }
}

module.exports = new RoomRepository();

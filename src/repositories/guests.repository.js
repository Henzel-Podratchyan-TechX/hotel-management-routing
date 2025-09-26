const { Guest } = require("../models/guest.model");
const db = require('./connection');
const Log = require("../utils/Logger");

const TAG = "GuestRepository";

class GuestRepository {
    async getAllGuests() {
        const data = await db.query("SELECT * FROM guest ORDER BY id ASC");
        Log.d(TAG, data.rows);
        return data.rows.map(
            g =>
                new Guest(
                    g.id,
                    g.first_name,
                    g.last_name,
                    g.email,
                    g.phone,
                    g.room_n,
                    g.cleaned_at
                )
        );
    }

    async getGuestById(id) {
        const data = await db.query("SELECT * FROM guest WHERE id = $1", [id]);
        const g = data.rows[0];
        Log.d(TAG, g);
        return g
            ? new Guest(
                g.id,
                g.first_name,
                g.last_name,
                g.email,
                g.phone,
                g.room_n,
                g.cleaned_at
            )
            : null;
    }

    async createGuest(guestData) {
        const data = await db.query(
            `INSERT INTO guest (first_name, last_name, email, phone, room_n, cleaned_at)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING *`,
            [
                guestData.first_name,
                guestData.last_name,
                guestData.email,
                guestData.phone,
                guestData.room_n,
                guestData.cleaned_at,
            ]
        );
        Log.d(TAG, data.rows[0]);
        return data.rows[0];
    }

    async updateGuest(id, updatedData) {
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
            `UPDATE guest SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`,
            values
        );

        const g = data.rows[0];
        Log.d(TAG, g);
        return g
            ? new Guest(
                g.id,
                g.first_name,
                g.last_name,
                g.email,
                g.phone,
                g.room_n,
                g.cleaned_at
            )
            : null;
    }

    async deleteGuest(id) {
        const data = await db.query("DELETE FROM guest WHERE id = $1", [id]);
        Log.d(TAG, data.rowCount);
        return data.rowCount > 0;
    }
}

module.exports = new GuestRepository();

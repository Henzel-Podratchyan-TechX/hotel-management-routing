const { Booking } = require("../models/booking.model");
const db = require('./connection');
const Log = require("../utils/Logger");

const TAG = "BookingRepository";

class BookingRepository {
    async getAllBookings() {
        const data = await db.query("SELECT * FROM booking ORDER BY id ASC");
        Log.d(TAG, data.rows);
        return data.rows.map(
            b =>
                new Booking(
                    b.id,
                    b.guest_id,
                    b.room_id,
                    b.check_in_date,
                    b.check_out_date,
                    b.num_guests,
                    b.status
                )
        );
    }

    async getBookingById(id) {
        const data = await db.query("SELECT * FROM booking WHERE id = $1", [id]);
        const b = data.rows[0];
        Log.d(TAG, b);
        return b
            ? new Booking(
                b.id,
                b.guest_id,
                b.room_id,
                b.check_in_date,
                b.check_out_date,
                b.num_guests,
                b.status
            )
            : null;
    }

    async createBooking(bookingData) {
        const data = await db.query(
            `INSERT INTO booking (guest_id, room_id, check_in_date, check_out_date, num_guests, status)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING *`,
            [
                bookingData.guest_id,
                bookingData.room_id,
                bookingData.check_in_date,
                bookingData.check_out_date,
                bookingData.num_guests,
                bookingData.status
            ]
        );
        Log.d(TAG, data.rows[0]);
        return data.rows[0];
    }

    async updateBooking(id, updatedData) {
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
            `UPDATE booking SET ${fields.join(", ")} WHERE id = $${index} RETURNING *`,
            values
        );

        const b = data.rows[0];
        Log.d(TAG, b);
        return b
            ? new Booking(
                b.id,
                b.guest_id,
                b.room_id,
                b.check_in_date,
                b.check_out_date,
                b.num_guests,
                b.status
            )
            : null;
    }

    async deleteBooking(id) {
        const data = await db.query("DELETE FROM booking WHERE id = $1", [id]);
        Log.d(TAG, data.rowCount);
        return data.rowCount > 0;
    }
}

module.exports = new BookingRepository();

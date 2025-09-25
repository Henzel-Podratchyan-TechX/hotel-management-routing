const fs = require("fs").promises;
const path = require("path");
const { Booking } = require("../models/booking.model");
const Log = require("../utils/Logger");

const TAG = "BookingRepository";

const filePath = path.join(__dirname, "./data.local/bookings.json");

class BookingRepository {
    async _readFile() {
        const rawData = await fs.readFile(filePath, "utf8");
        const data = JSON.parse(rawData);
        return data.bookings.map(
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

    async _writeFile(bookings) {
        const data = { bookings: bookings.map(b => ({ ...b })) };
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    }

    async getAllBookings() {
        const data = await this._readFile();
        Log.d(TAG,  data)
        return data
    }

    async getBookingById(id) {
        const bookings = await this._readFile();
        const booking = bookings.find(b => b.id === Number(id)) || null;
        Log.d(TAG, booking);
        return booking;
    }

    async createBooking(bookingData) {
        const bookings = await this._readFile();

        const newId = bookings.length
            ? Math.max(...bookings.map(b => b.id)) + 1
            : 1;

        const newBooking = new Booking(
            newId,
            bookingData.guest_id,
            bookingData.room_id,
            bookingData.check_in_date,
            bookingData.check_out_date,
            bookingData.num_guests,
            bookingData.status
        );

        Log.d(TAG, newBooking);

        bookings.push(newBooking);
        await this._writeFile(bookings);

        return newBooking;
    }

    async updateBooking(id, updatedData) {
        const bookings = await this._readFile();
        const index = bookings.findIndex(b => b.id === Number(id));

        if (index === -1) return null;

        bookings[index] = new Booking(
            id,
            updatedData.guest_id ?? bookings[index].guest_id,
            updatedData.room_id ?? bookings[index].room_id,
            updatedData.check_in_date ?? bookings[index].check_in_date,
            updatedData.check_out_date ?? bookings[index].check_out_date,
            updatedData.num_guests ?? bookings[index].num_guests,
            updatedData.status ?? bookings[index].status
        );

        Log.d(TAG, bookings[index]);

        await this._writeFile(bookings);

        return bookings[index];
    }

    async deleteBooking(id) {
        const bookings = await this._readFile();
        const index = bookings.findIndex(b => b.id === id);

        if (index === -1) return false;

        Log.d(TAG, bookings[index]);

        bookings.splice(index, 1);
        await this._writeFile(bookings);

        return true;
    }
}

module.exports = new BookingRepository();

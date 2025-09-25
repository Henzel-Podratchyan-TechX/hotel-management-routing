const bookingsRepository = require("../repositories/bookings.repository");
const createHttpError = require("../utils/http-errors");
const {Booking} = require("../models/booking.model");

class BookingService {
    async getAllBookings() {
        return await bookingsRepository.getAllBookings();
    }

    async getBookingById(id) {
        const booking = await bookingsRepository.getBookingById(id);
        if (!Booking) throw createHttpError(404, "Booking not found");
        return booking;
    }

    async createBooking(data) {
        if (
            !data.guest_id
            || !data.room_id
            || !data.check_in_date
            || !data.check_out_date
            || !data.num_guests
            || !data.status
        ) {
            throw createHttpError(400, "Empty fields are presented");
        }
        return await bookingsRepository.createBooking(data);
    }

    async updateBooking(id, data) {
        const updated = await bookingsRepository.updateBooking(id, data);
        if (!updated) throw createHttpError(404, "Booking not found");
        return updated;
    }

    async deleteBooking(id) {
        const deleted = await bookingsRepository.deleteBooking(id);
        if (!deleted) throw createHttpError(404, "Booking not found");
        return deleted;
    }
}

module.exports = new BookingService();

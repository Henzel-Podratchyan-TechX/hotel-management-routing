const guestsRepository = require("../repositories/guests.repository");
const createHttpError = require("../utils/http-errors");

class GuestService {
    async getAllGuests() {
        return await guestsRepository.getAllGuests();
    }

    async getGuestById(id) {
        const guest = await guestsRepository.getGuestById(id);
        if (!guest) throw createHttpError(404, "Guest not found");
        return guest;
    }

    async createGuest(data) {
        if (
            !data.first_name
            || !data.last_name
            || !data.email
            || !data.phone
            || !data.room_n
            || !data.cleaned_at
        ) {
            throw createHttpError(400, 'Empty fields are presented');
        }
        return await guestsRepository.createGuest(data);
    }

    async updateGuest(id, data) {
        const updated = await guestsRepository.updateGuest(id, data);
        if (!updated) throw createHttpError(404, 'Guest not found');
        return updated;
    }

    async deleteGuest(id) {
        const deleted = await guestsRepository.deleteGuest(id);
        if (!deleted) throw createHttpError(404, 'Guest not found');
        return deleted;
    }
}

module.exports = new GuestService();

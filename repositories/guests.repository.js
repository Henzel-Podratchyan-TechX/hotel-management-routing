const fs = require("fs").promises;
const path = require("path");
const Guest = require("../models/guest.model");

const filePath = path.join(__dirname, "data.local/guests.json");

class GuestRepository {
    async _readFile() {
        const rawData = await fs.readFile(filePath, "utf8");
        return JSON.parse(rawData);
    }

    async _writeFile(data) {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    }

    async getAllGuests() {
        const data = await this._readFile();
        return data.guests.map(
            g => new Guest(
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
        const data = await this._readFile();
        return data.guests.find(g => g.id === id) || null;
    }

    async createGuest(guestData) {
        const data = await this._readFile();

        const newId = data.guests.length
            ? Math.max(...data.guests.map(g => g.id)) + 1
            : 1;

        const newGuest = new Guest(
            newId,
            guestData.first_name,
            guestData.last_name,
            guestData.email,
            guestData.phone,
            guestData.room_n,
            guestData.cleaned_at
        );

        data.guests.push({
            id: newGuest.guest_id,
            first_name: newGuest.first_name,
            last_name: newGuest.last_name,
            email: newGuest.email,
            phone: newGuest.phone,
            room_n: newGuest.room_n,
            cleaned_at: newGuest.cleaned_at
        });

        await this._writeFile(data);
        return newGuest;
    }

    async updateGuest(id, updatedData) {
        const data = await this._readFile();
        const index = data.guests.findIndex(g => g.id === id);

        if (index === -1) return null;

        data.guests[index] = {
            ...data.guests[index],
            ...updatedData,
            id
        };

        await this._writeFile(data);

        const g = data.guests[index];
        return new Guest(
            g.id,
            g.first_name,
            g.last_name,
            g.email,
            g.phone,
            g.room_n,
            g.cleaned_at
        );
    }

    async deleteGuest(id) {
        const data = await this._readFile();
        const index = data.guests.findIndex(g => g.id === id);

        if (index === -1) return false;

        data.guests.splice(index, 1);
        await this._writeFile(data);
        return true;
    }
}

module.exports = GuestRepository;

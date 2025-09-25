class Booking {
    constructor(
        id,
        guest_id,
        room_id,
        check_in_date,
        check_out_date,
        num_guests,
        status
    ) {
        this.id = id;
        this.guest_id = guest_id;
        this.room_id = room_id;
        this.check_in_date = check_in_date;
        this.check_out_date = check_out_date;
        this.num_guests = num_guests;
        this.status = status
    }

    toString() {
        return JSON.stringify(this);
    }
}

class BookingStatus {
    static reserved = "reserved";
    static checked_in = "checked_in";
    static checked_out = "checked_out";
    static cancelled = "cancelled";
}

module.exports = {
    Booking: Booking,
    BookingStatus: BookingStatus
};

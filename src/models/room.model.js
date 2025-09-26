class Room {
    constructor(
        id,
        room_number,
        floor,
        status
    ) {
        this.id = id;
        this.room_number = room_number;
        this.floor = floor;
        this.status = status;
    }

    toString() {
        return JSON.stringify(this);
    }
}

class RoomStatus {
    static available = "available";
    static occupied = "occupied";
    static maintenance = "maintenance";
}

module.exports = {
    Room: Room,
    RoomStatus: RoomStatus
}

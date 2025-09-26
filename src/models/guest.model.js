class Guest {
    constructor(
        id,
        first_name,
        last_name,
        email,
        phone,
        room_n,
        cleaned_at
    ) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        this.room_n = room_n;
        this.cleaned_at = cleaned_at;
    }

    toString() {
        return JSON.stringify(this);
    }
}

module.exports = Guest;

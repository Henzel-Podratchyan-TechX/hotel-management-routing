const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ status: "ok" });
});

const guestRouter = require("./routes/guests");
const roomRouter = require("./routes/rooms");
const bookingRouter = require("./routes/bookings");

app.use("/api/guests", guestRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

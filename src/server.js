const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');

const Log = require("./utils/Logger");
const TAG = "server"

const app = express();
app.use(express.json());

app.use(logger);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
    res.json({ status: "ok" });
});
const guestRouter = require("./routes/guests.routes");
const roomRouter = require("./routes/rooms.routes");
const bookingRouter = require("./routes/bookings.routes");

app.use("/api/guests", guestRouter);
app.use("/api/rooms", roomRouter);
app.use("/api/bookings", bookingRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => Log.i(TAG, `🚀 Server running on port ${PORT}`));

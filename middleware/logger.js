const Log = require("../utils/Logger");
const TAG = "logger"

function logger(req, res, next) {
    Log.d(TAG, `${req.method} ${req.originalUrl}`);
    next();
}

module.exports = logger;

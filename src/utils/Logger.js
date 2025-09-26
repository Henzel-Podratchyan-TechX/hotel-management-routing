class Log {
    static i(tag, message) {
        console.log("ℹ️  INFO", " | ", tag, " | ", `${message}`);
    }
    static d(tag, message) {
        console.log("☑️  DEBUG", " | ", tag, " | ", `${message}`);
    }
    static e(tag, message) {
        console.log("📛  ERROR", " | ", tag, " | ", `${message}`);
    }
    static w(tag, message) {
        console.log("⚠️  WARNING", " | ", tag, " | ", `${message}`);
    }
}

module.exports = Log;

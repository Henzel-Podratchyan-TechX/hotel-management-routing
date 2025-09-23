class Log {
    static i(tag, message) {
        console.log("ℹ️",  tag, `${message}`);
    }
    static d(tag, message) {
        console.log("☑️", tag, `${message}`);
    }
    static e(tag, message) {
        console.log("📛", tag, `${message}`);
    }
    static w(tag, message) {
        console.log("⚠️", tag, `${message}`);
    }
}

module.exports = Log;

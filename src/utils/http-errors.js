function createHttpError(status, message) {
    const error = new Error(message || 'Error');
    error.status = status;
    return error;
}

module.exports = createHttpError;

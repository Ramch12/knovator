class CustomErrorResponse extends Error {
    constructor(statusCode, message, data) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
}
module.exports = { CustomErrorResponse };
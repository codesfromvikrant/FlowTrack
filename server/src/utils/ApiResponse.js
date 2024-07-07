module.exports = class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode
    this.data = data
    this.message = message
    this.status = statusCode < 400 ? "success" : "error"
  }

  send(res) {
    return res.status(this.statusCode).json({
      status: this.status,
      message: this.message,
      data: this.data
    })
  }
}

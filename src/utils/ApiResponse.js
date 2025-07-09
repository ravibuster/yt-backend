class ApiResponse {
  constructor(res, data = null, message = 'Success', statusCode = 200) {
    this.res = res;
    this.data = data;
    this.message = message;
    this.statusCode = statusCode;
  }
}

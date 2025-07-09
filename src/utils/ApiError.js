class ApiError extends Error {
  constructor(
    statusCode,
  message = 'An error occurred',
  errors = [],
  stack  = ""
) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
    this.stack = stack;
    this.data = null;
    
    if (stack) {
      this.stack = stack;
    }else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

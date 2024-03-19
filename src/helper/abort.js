class AppError extends Error {
  constructor(message, statusCode) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = statusCode;
    this.message = message;
    this.name = "AppError";
  }
}

export const abort = (status, message) => {
  throw new AppError(message, status);
};

export const handleError = (fuc) => async (req, res, next) => {
  try {
    await fuc(req, res, next);
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    res.status(err.status).send({
      message: err.message,
    });
  }
};

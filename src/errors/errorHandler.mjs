import { logger } from "../utils/logger.mjs";

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = status === 500 ? "Internal Server Error" : err.message; // escondemos el error interno al usuario
  if (status === 500) {
    logger.log("error", err.message);
  }
  res.status(status).json({
    error: {
      message,
      status,
    },
  });
};

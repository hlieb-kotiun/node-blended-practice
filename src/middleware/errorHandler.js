// export const errorHandler = (error, req, res, next) => {
//   console.error('Error message: ', error.message);

import { HttpError } from 'http-errors';

//   res.status(error.status ?? 500).json({ message: error.message });
// };

export const errorHandler = (error, req, res, next) => {
  console.error('Error message: ', error.message);

  if (error instanceof HttpError) {
    res.status(error.status).json({ message: error.message });
    return;
  }

  res.status(500).json({ message: 'Something went wrong!' });
};

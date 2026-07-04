export const errorHandler = (error, req, res, next) => {
  console.error('Error message: ', error.message);

  res.status(error.status ?? 500).json({ message: error.message });
};

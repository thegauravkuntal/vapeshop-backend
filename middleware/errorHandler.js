const errorHandler = (err, req, res, next) => {
  console.error('API Error:', err.message);

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  try {
    res.status(statusCode).json({
      message: err.message || 'Internal server error',
    });
  } catch {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = errorHandler;

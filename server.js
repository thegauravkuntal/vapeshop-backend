require('dns').setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    if (!origin || origin === process.env.FRONTEND_URL) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/images', require('./routes/images'));

app.get('/', (req, res) => {
  res.json({ message: 'Vape Shop API is running' });
});

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 5000;

(async () => {
  const dbConnected = await connectDB();
  if (dbConnected) {
    console.log('Starting server with database connection...');
  } else {
    console.log('Starting server WITHOUT database — API calls will fail until DB connects.');
  }
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
})();

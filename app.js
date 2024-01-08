// app.js

const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userManagement', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Connect to Redis
const client = redis.createClient();
client.on('connect', () => {
  console.log('Connected to Redis');
});

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

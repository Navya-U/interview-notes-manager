const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const privateRoutes = require('./routes/privateRoutes');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Interview Notes Manager API running');
});

app.use('/api', authRoutes);
app.use('/api/notes', noteRoutes);

app.use('/api', privateRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

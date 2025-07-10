require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const newsRoute = require('./routes/newsRoute');

const app = express();
connectDB(); // Conecta a MongoDB

app.use(express.json());
app.use('/api/news', newsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

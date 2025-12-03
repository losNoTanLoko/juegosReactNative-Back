// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB (cambiar MONGO_URI en .env)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Conectado a MongoDB"))
    .catch(err => console.log("Mongo error:", err));

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/scores', require('./routes/scores'));

app.get('/', (req, res) => res.send('API funcionando 🚀'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

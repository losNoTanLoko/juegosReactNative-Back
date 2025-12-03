const express = require('express');
const router = express.Router();
const Score = require('../models/Score');
const auth = require('../middleware/auth');
const User = require('../models/User');

// POST /api/scores  => guardar puntaje (protegido)
router.post('/', auth, async (req, res) => {
   try {
    const { score, time } = req.body;

    // Validaciones
    if (typeof score !== 'number' || score < 0) {
      return res.status(400).json({ message: 'Puntaje inválido' });
    }
    if (typeof time !== 'number' || time < 0) {
      return res.status(400).json({ message: 'Tiempo inválido' });
    }

    // Obtener info del usuario desde el token
    const userId = req.user.id;
    const user = await User.findById(userId);
    const userName = user ? user.name : req.user.email;

    // Crear y guardar puntaje
    const newScore = new Score({ userId, userName, score, time });
    await newScore.save();

    res.status(201).json(newScore);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error guardando puntaje' });
  }
});

// GET /api/scores/top => obtener ranking de puntajes
router.get('/top', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const topScores = await Score.find().sort({ score: -1, time: 1 }).limit(limit).lean();
    res.json(topScores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo ranking' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Score = require('../models/Score');
const auth = require('../middleware/auth');
const User = require('../models/User');

// POST /api/scores  => guardar puntaje (protegido)
router.post('/', auth, async (req, res) => {
  try {
    const { score, time } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId);
    const userName = user ? user.name : req.user.email;
    const newScore = new Score({ userId, userName, score, time });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error guardando puntaje' });
  }
});

// GET /api/scores/top?limit=10 => ranking (público)
router.get('/top', async (req, res) => {
   try {
    const userId = req.user.id;
    const scores = await Score.find({ userId }).sort({ score: -1, time: 1 }).lean();
    res.json(scores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error obteniendo puntajes' });
  }
});

module.exports = router;

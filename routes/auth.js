const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registro (solo para dev)
router.post('/register', async (req,res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Usuario ya existe' });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hash });
    await user.save();

    const payload = { id: user._id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'tu_secreto_aqui', { expiresIn: '7d' });
    res.json({ token, user: payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error servidor' });
  }
});

// Login
router.post('/login', async (req,res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Credenciales inválidas' });

    const payload = { id: user._id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'tu_secreto_aqui', { expiresIn: '7d' });
    res.json({ token, user: payload });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error servidor' });
  }
});

module.exports = router;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const signToken = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

const setAuthCookie = (res, token) => {
const isProd = process.env.NODE_ENV === 'production';
res.cookie('token', token, {
  httpOnly: true,
  sameSite: isProd ? 'none' : 'lax',
  secure:   isProd,
  maxAge: 7*24*60*60*1000
});
};

exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body || {};
    if (!nombre || !email || !password) return res.status(400).json({ message: 'Datos incompletos' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'El email ya está registrado' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre, email, password: hash });

    const token = signToken({ uid: user._id, email: user.email });
    setAuthCookie(res, token);

    res.status(201).json({ ok: true, user: { id: user._id, nombre: user.nombre, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error en registro' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Datos incompletos' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = signToken({ uid: user._id, email: user.email });
    setAuthCookie(res, token);

    res.json({ ok: true, user: { id: user._id, nombre: user.nombre, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Error en login' });
  }
};

exports.logout = async (_req, res) => {
  res.clearCookie('token', { httpOnly: true, sameSite: 'lax', secure: false });
  res.json({ ok: true });
};

exports.me = async (req, res) => {
  const user = req.user; // viene del middleware
  res.json({ ok: true, user: { id: user._id, nombre: user.nombre, email: user.email } });
};

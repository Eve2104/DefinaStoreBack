const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = async function authRequired(req, res, next){
  try{
    const token = req.cookies?.token;
    if(!token) return res.status(401).json({ message: 'No autenticado' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.uid).select('_id nombre email');
    if(!user) return res.status(401).json({ message: 'No autenticado' });

    req.user = user;
    next();
  }catch(err){
    return res.status(401).json({ message: 'Sesión inválida' });
  }
}

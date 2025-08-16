const Carrito = require('../models/carrito.model.js');

exports.subirCarrito = async (req, res) => {
  const nuevoCarrito = new Carrito({ productos: req.body });
  const guardado = await nuevoCarrito.save();

  res.status(201).json({ mensaje: 'Carrito guardado', carrito: guardado });
};

const express = require('express');
const router = express.Router();
const Producto = require('../models/producto.model');

router.get('/', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

router.post('/', async (req, res) => {
  const nuevo = await Producto.create(req.body);
  res.json(nuevo);
});

router.put('/:id', async (req, res) => {
  const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

router.delete('/:id', async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Producto eliminado' });
});

module.exports = router;

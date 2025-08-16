const express = require('express');
const router = express.Router();
const controller = require('../controllers/producto.controller');
const upload = require('../config/multer');
const Producto = require('../models/producto.model');

// Redirección inicial
router.get('/', (req, res) => res.redirect('/productos'));

// CRUD visual
router.get('/productos', controller.getAll);
router.get('/productos/nuevo', controller.renderNuevo);
router.post('/productos', upload.single('imagen'), async (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;
  
    await Producto.create({ nombre, descripcion, precio, imagen });
    res.redirect('/productos');
  });
router.get('/productos/editar/:id', controller.renderEditar);
router.post('/productos/editar/:id', upload.single('imagen'), async (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    const actual = await Producto.findById(req.params.id);
  
    const imagen = req.file
      ? `/uploads/${req.file.filename}`
      : actual.imagen;
  
    await Producto.findByIdAndUpdate(req.params.id, { nombre, descripcion, precio, imagen });
    res.redirect('/productos');
  });
router.post('/productos/eliminar/:id', controller.eliminar);   // ← POST en lugar de DELETE
router.get('/carrito', (req, res) => {
    // Simulación de carrito (luego puede venir del frontend)
    const carrito = [
      { nombre: 'Vestido Rosa', cantidad: 2, precio: 1200 },
      { nombre: 'Camisa Blanca', cantidad: 1, precio: 900 }
    ];
  
    const total = carrito.reduce((sum, item) => sum + item.cantidad * item.precio, 0);
  
    res.render('carrito/carrito', {
      layout: 'main',
      titulo: 'Carrito',
      carrito,
      total
    });
  });
  
module.exports = router;

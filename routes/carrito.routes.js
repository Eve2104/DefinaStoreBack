const express = require('express');
const router = express.Router();
const { subirCarrito } = require('../controllers/carrito.controller');

router.post('/confirmar', subirCarrito);

module.exports = router;

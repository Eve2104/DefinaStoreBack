const express = require('express');
const router = express.Router();   
const productoController = require('../controllers/producto.controller.js');

router.post('/', productoController.createProducto); // Crear un nuevo producto
router.get('/', productoController.getProductos); // Obtener todos los productos
router.get('/:id', productoController.getProductoById); // Obtener un producto por ID
router.put('/:id', productoController.updateProducto); // Actualizar un producto por ID
router.delete('/:id', productoController.deleteProducto); // Eliminar un producto por ID

module.exports = router; // Exportar las rutas de productos



const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  productos: [
    {
      nombre: String,
      cantidad: Number,
      precio: Number
    }
  ],
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Carrito', carritoSchema);

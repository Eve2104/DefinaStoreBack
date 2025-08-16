const Producto = require('../models/producto.model');

exports.getAll = async (req, res) => {
  const productos = await Producto.find();
  res.render('productos/productos', { layout: 'main', titulo: 'Productos', productos });
};

exports.renderNuevo = (req, res) => {
  res.render('productos/nuevo-producto', { layout: 'main', titulo: 'Nuevo Producto' });
};

exports.renderEditar = async (req, res) => {
  const producto = await Producto.findById(req.params.id);
  res.render('productos/editar-producto', { layout: 'main', titulo: 'Editar Producto', producto });
};

exports.crear = async (req, res) => {
  await Producto.create(req.body);
  res.redirect('/productos');
};

exports.actualizar = async (req, res) => {
  await Producto.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/productos');
};

exports.eliminar = async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.redirect('/productos');
};

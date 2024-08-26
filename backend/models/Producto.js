const { DataTypes } = require('sequelize');
const { bd } = require('../config/bd');

const Producto = bd.define('Producto', {
  id_producto: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre_producto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Producto', // Nombre de la tabla en la base de datos
  timestamps: false // Deshabilitar timestamps si no los necesitas
});

Producto.sync();
module.exports = Producto;

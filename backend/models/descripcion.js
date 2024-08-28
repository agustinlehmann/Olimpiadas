const { DataTypes } = require('sequelize');
const { bd } = require('../config/bd');
const Producto = require('./Producto'); // Asegúrate de que la ruta sea correcta

const Descripcion = bd.define('Descripcion', {
  id_descripcion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  id_producto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Producto,
      key: 'id_producto'
    }
  },
  detalle: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Descripcion', // Nombre de la tabla en la base de datos
  timestamps: false // Deshabilitar timestamps si no los necesitas
});

Descripcion.sync();
module.exports = Descripcion;

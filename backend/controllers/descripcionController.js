const Descripcion = require('../models/descripcion'); // Asegúrate de que la ruta sea correcta

// Crear una nueva descripción
const crearDescripcion = async (req, res) => {
  const { id_producto, detalle } = req.body;

  try {
    const nuevaDescripcion = await Descripcion.create({ id_producto, detalle });
    res.status(201).json(nuevaDescripcion);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la descripción', details: error.message });
  }
};

// Obtener todas las descripciones
const obtenerDescripciones = async (req, res) => {
  try {
    const descripciones = await Descripcion.findAll();
    res.status(200).json(descripciones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las descripciones', details: error.message });
  }
};

// Obtener una descripción por ID
const obtenerDescripcionPorId = async (req, res) => {
  const { id_descripcion } = req.params;

  try {
    const descripcion = await Descripcion.findByPk(id_descripcion);

    if (!descripcion) {
      return res.status(404).json({ error: 'Descripción no encontrada' });
    }

    res.status(200).json(descripcion);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la descripción', details: error.message });
  }
};

// Actualizar una descripción por ID
const actualizarDescripcion = async (req, res) => {
  const { id_descripcion } = req.params;
  const { detalle } = req.body;

  try {
    const descripcion = await Descripcion.findByPk(id_descripcion);

    if (!descripcion) {
      return res.status(404).json({ error: 'Descripción no encontrada' });
    }

    descripcion.detalle = detalle;
    await descripcion.save();

    res.status(200).json(descripcion);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la descripción', details: error.message });
  }
};

// Eliminar una descripción por ID
const eliminarDescripcion = async (req, res) => {
  const { id_descripcion } = req.params;

  try {
    const descripcion = await Descripcion.findByPk(id_descripcion);

    if (!descripcion) {
      return res.status(404).json({ error: 'Descripción no encontrada' });
    }

    await descripcion.destroy();

    res.status(200).json({ message: 'Descripción eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la descripción', details: error.message });
  }
};

module.exports = {
  crearDescripcion,
  obtenerDescripciones,
  obtenerDescripcionPorId,
  actualizarDescripcion,
  eliminarDescripcion
};

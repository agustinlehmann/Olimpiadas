const express = require('express');
const router = express.Router();
const descripcionController = require('../controllers/descripcionController'); // Asegúrate de que la ruta sea correcta

// Crear una nueva descripción
router.post('/descripciones', descripcionController.crearDescripcion);

// Obtener todas las descripciones
router.get('/descripciones', descripcionController.obtenerDescripciones);

// Obtener una descripción por ID
router.get('/descripciones/:id_descripcion', descripcionController.obtenerDescripcionPorId);

// Actualizar una descripción por ID
router.put('/descripciones/:id_descripcion', descripcionController.actualizarDescripcion);

// Eliminar una descripción por ID
router.delete('/descripciones/:id_descripcion', descripcionController.eliminarDescripcion);

module.exports = router;

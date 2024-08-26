const Producto = require('../models/Producto');
const { validationResult } = require('express-validator');

const crearProducto = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nombre_producto, precio, stock } = req.body;

        if (!nombre_producto || precio === undefined || stock === undefined) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        if (typeof nombre_producto !== 'string' || typeof precio !== 'number' || typeof stock !== 'number') {
            return res.status(400).json({ error: 'Datos inválidos' });
        }

        if (precio <= 0 || stock < 0) {
            return res.status(400).json({ error: 'El precio debe ser mayor a 0 y el stock no puede ser negativo' });
        }

        const nuevoProducto = await Producto.create({
            nombre_producto,
            precio,
            stock
        });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { nombre_producto, precio, stock } = req.body;
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        if (nombre_producto !== undefined && typeof nombre_producto !== 'string') {
            return res.status(400).json({ error: 'nombre_producto debe ser una cadena' });
        }
        if (precio !== undefined && typeof precio !== 'number') {
            return res.status(400).json({ error: 'precio debe ser un número' });
        }
        if (stock !== undefined && typeof stock !== 'number') {
            return res.status(400).json({ error: 'stock debe ser un número' });
        }

        if (precio !== undefined && precio <= 0) {
            return res.status(400).json({ error: 'El precio debe ser mayor a 0' });
        }
        if (stock !== undefined && stock < 0) {
            return res.status(400).json({ error: 'El stock no puede ser negativo' });
        }

        producto.nombre_producto = nombre_producto || producto.nombre_producto;
        producto.precio = precio || producto.precio;
        producto.stock = stock || producto.stock;

        await producto.save();
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
        return res.status(400).json({ error: 'ID inválido' });
    }

    try {
        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await producto.destroy();
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
};

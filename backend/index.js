const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const productoRoutes = require('./routes/productoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/productos', productoRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pedidos', pedidoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
});

app.use('/', (req, res)=>{
    res.json("history")
});
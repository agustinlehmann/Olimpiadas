const { Sequelize } = require('sequelize');

const bd = new Sequelize('ecommerce', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

async function conectarBD() {
  try {
    // Conectar al servidor de base de datos
    await bd.authenticate();
    console.log('Connection has been established successfully.');

    // Crear la base de datos si no existe
    await bd.query('CREATE DATABASE IF NOT EXISTS ecommerce');
    console.log('Database created or already exists.');
    
    // Re-conectar a la base de datos
    bd.config.database = 'ecommerce'; // Cambiar la base de datos a la recién creada
    await bd.authenticate();
    console.log('Reconnected to the database successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { bd, conectarBD };
<<<<<<< HEAD

=======
>>>>>>> 5c3f557792a8b58c1764f3159d2b3eac6ac6063c

const { Sequelize } = require('sequelize');

const bd = new Sequelize('ecommerce', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

async function conectarBD() {
  try {
    await bd.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { bd, conectarBD }; // Exporta ambos: la instancia de Sequelize y la función de conexión

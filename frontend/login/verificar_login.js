const logeado = document.getElementById('logeadosino');
verificarLogin();
function verificarLogin() {
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log('Usuario logueado');
      logeado.textContent = 'Cerrar Sesión';
      logeado.addEventListener('click', cerrarSesion);
    } else {
      console.log('Usuario no logueado');
    }
  }

function cerrarSesion() {
    localStorage.removeItem('authToken');
    window.location.href = '../index.html';
  }
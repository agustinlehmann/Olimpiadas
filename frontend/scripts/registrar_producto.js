document.addEventListener('DOMContentLoaded', function() {
const form = document.querySelector('form');
  
  form.addEventListener('submit', function(event) {
      const nombre = document.getElementById('nombreproducto').value;
      const precio = document.getElementById('precio').value
      const cantidad = document.getElementById('stock').value
      let errorMessage = '';
      if(nombre === ''){
        errorMessage += 'El nombre del producto no puede estar vacío.\n';
      } else if(nombre.length < 5){
        errorMessage += 'El nombre del producto debe tener al menos 5 caracteres.\n';
      }

      if (precio === '') {
          errorMessage += 'El precio no puede estar vacía.\n';
      }

      if(cantidad === ''){
        errorMessage += 'La cantidad no puede estar vacía.\n';
      }

      if (errorMessage) {
        alert(errorMessage);
        event.preventDefault();
      } else {
        console.log("registro completo")
        event.preventDefault();
        const precio2 = parseInt(precio)
        const cantidad2 = parseInt(cantidad)
        registrarprodu(nombre, precio2, cantidad2);
      }
  });
});
function registrarprodu(nombre, precio2, cantidad){
const producto = {
    nombre_producto: nombre,
    precio: precio2,
    stock: cantidad,
  }
  
  fetch('https://solofutbol-api.vercel.app/api/productos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(producto),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

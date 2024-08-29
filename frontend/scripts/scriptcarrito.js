document.addEventListener('DOMContentLoaded', function() {
    const procederpago = document.getElementById('procederpago');
    const pagar = document.getElementById('pagar');

    // Verifica el estado del carrito cuando se carga la página
    function verificarCarrito() {
        const carritoJSON = localStorage.getItem('cart');
        const carrito = JSON.parse(carritoJSON);

        if (!carrito || carrito.length === 0) {
            procederpago.style.display = 'none'; // Oculta el botón de proceder al pago si el carrito está vacío
            return false; // Retorna false para no permitir el pago
        }
        return true; // Retorna true si el carrito tiene productos
    }

    // Inicializa la verificación del carrito
    verificarCarrito();

    procederpago.addEventListener('click', function(event) {
        event.preventDefault();
        
        const token = localStorage.getItem('authToken');
        
        if (!token) {
            alert('Debe iniciar sesión para proceder con el pago.');
            window.location.href = 'login/login.html';
            return; // Salir de la función si el usuario no está autenticado
        }

        // Verificar si el carrito tiene productos antes de permitir el pago
        if (!verificarCarrito()) {
            return; // No permitir el pago si el carrito está vacío
        }

        // Configura el evento de clic para el botón de pago si el carrito no está vacío
        pagar.addEventListener('click', function(event) {
            const tarjeta = document.getElementById('cardNumber').value.trim();
            const fecha = document.getElementById('expiryDate').value.trim();
            const cvv = document.getElementById('cvv').value.trim();
            let errorMessage = '';
            
            if (tarjeta.length < 16) {
                document.getElementById('cardNumberError').textContent = 'Número de tarjeta inválido.';
                errorMessage += 'Por favor, ingresa el número de la tarjeta.\n';
            }
            var expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!expiryDatePattern.test(fecha)) {
                document.getElementById('expiryDateError').textContent = 'Fecha de expiración inválida (debe ser MM/AA).';
                errorMessage += 'Por favor, ingresa la fecha de expiración.\n';
            }
            if (cvv.length !== 3 || isNaN(cvv)) {
                document.getElementById('cvvError').textContent = 'CVV inválido.';
                errorMessage += 'Por favor, ingresa el código de seguridad.\n';
            }
            
            if (errorMessage) {
                alert(errorMessage);
                event.preventDefault();
            } else {
                alert("Pago realizado con éxito");
                event.preventDefault();
                const token1 = localStorage.getItem('authToken');
                validarToken(token1);
            }
        });
    });

    function validarToken(token) {
        fetch('https://solofutbol-api.vercel.app/api/usuarios/validar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("ID de usuario:", data.id_usuario);
            const carritoJSON = localStorage.getItem('cart');
            const carrito = JSON.parse(carritoJSON);
            console.log("Carrito parseado:", carrito);
            let total = 0;
            carrito.forEach(item => {
                const { name, price, quantity, id } = item;
                const priceFloat = typeof price === 'string' ? parseFloat(price) : price;
                const idFloat = typeof id === 'string' ? parseFloat(id) : id;
                const itemTotal = priceFloat * quantity;
                const id2 = idFloat;
                total += itemTotal;
                const pedido = {
                    "id_usuario": data.id_usuario,
                    "id_producto": id2,
                    "cantidad": quantity,
                    "total": itemTotal 
                };
                crearPedido(pedido);
            });
            localStorage.removeItem('cart');
        })
        .catch(error => {
            console.error('Error:', error);
            reiniciar();
        });
    }

    function reiniciar() {
        localStorage.removeItem('authToken');
        window.location.href = 'login/login.html';
        return false;
    }

    function crearPedido(pedido) {
        console.log(pedido);
        fetch('https://solofutbol-api.vercel.app/api/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pedido)
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
});

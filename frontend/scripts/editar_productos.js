const agregarcosas = document.getElementById('agregarcosas');

fetch('http://localhost:3000/api/productos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        agregarcosas.innerHTML = data.map(product => `
                <div class="col-lg-3 col-md-4 mb-4">
                    <div class="card product-card">
                        <img class="card-img-top">
                        <div class="card-body">
                        <form id="asd${product.id_producto}">
                            <h5 class="card-title">${product.nombre_producto}</h5>
                            <p class="card-text" data-price="${product.precio}">$${product.precio}</p>
                            <p class="card-text" data-price="${product.stock}">Stock: ${product.stock}</p>
                            <div class="d-flex justify-content-between">
                                <a href="#" id="a${product.id_producto}" class="btn btn-primary buy-btn" data-name="${product.nombre_producto}" data-price="${product.precio}">
                                    <i class="bi bi-pencil-square text-white"></i>
                                </a>
                                <a href="#" id="b${product.id_producto}" class="btn btn-danger buy-btn" data-name="${product.nombre_producto}" data-price="${product.precio}">
                                    <i class="bi bi-trash text-trash"></i>
                                </a>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>`).join('');
          for (let key in data){
            const boton1 = document.getElementById('a'+data[key].id_producto)
            const boton2 = document.getElementById('b'+data[key].id_producto)
            const divasd = document.getElementById('asd'+data[key].id_producto)
            console.log(boton1)
            console.log(boton2)
            let id = Number(data[key].id_producto);
            boton1.addEventListener('click', ()=>actualizar(id, divasd))
            boton2.addEventListener("click", ()=>eliminar(id))
          }
    })

    .catch(error => {
        console.error('Error:', error);
    });


function eliminar(id2){
    console.log('id '+id2)
    fetch('http://localhost:3000/api/productos/'+id2, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log('Eliminado correctamente')
        location.reload();
    })
    .catch(error => console.error(error));
}

function actualizar(id2, div){
    const nombre = document.createElement('input');
    const precio = document.createElement('input');
    const cantidad = document.createElement('input');
    const boton = document.createElement('button');
    nombre.type = 'text';
    nombre.placeholder = 'Nombre del producto';
    precio.type = 'number';
    precio.placeholder = 'Precio del producto';
    cantidad.type = 'number';
    cantidad.placeholder = 'Stock del producto';
    boton.type="submit";
    boton.textContent = 'Actualizar';
    div.appendChild(nombre);
    div.appendChild(precio);
    div.appendChild(cantidad);
    div.appendChild(boton);
    boton.addEventListener('click', ()=>{
        const precio2 = parseInt(precio.value)
        const cantidad2 = parseInt(cantidad.value)
        actualizarProducto(id2, nombre.value, precio2, cantidad2);
        div.innerHTML = '';
    });
}
function actualizarProducto(id2, nombre, precio2, cantidad){
    const producto = {
        nombre_producto: nombre,
        precio: precio2,
        stock: cantidad,
      }
    console.log('id '+id2)
    fetch('http://localhost:3000/api/productos/'+id2, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(producto),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log('Actualizado correctamente')
        location.reload();
    })
    .catch(error => console.error(error));
}

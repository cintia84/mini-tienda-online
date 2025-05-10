 
document.addEventListener("DOMContentLoaded", () => {
    const agregarProductoAlcarrito = document.querySelectorAll(".add-to-cart");
    const mostrarPoductosAlcarrito = document.getElementById("cart-list");
    const mostrarTotal = document.getElementById("total");
    let productoAgregadosAlCarrito = [];
    
    agregarProductoAlcarrito.forEach(boton => {
        boton.addEventListener("click", () => {
            const nombreDelProducto = boton.getAttribute("data-name");
            // Eliminar los puntos del precio antes de convertirlo a número
            const precioDelProducto = parseFloat(boton.getAttribute("data-price").replace(/\./g, ""));
            
            const producto = {
                nombre: nombreDelProducto,
                precio: precioDelProducto,
                cantidad: 1
            };
            
            const productoexisteAlcarrito = productoAgregadosAlCarrito.find(p => p.nombre === nombreDelProducto);
            
            if (productoexisteAlcarrito) {
                productoAgregadosAlCarrito = productoAgregadosAlCarrito.map(p => {
                    if (p.nombre === nombreDelProducto) {
                        return { ...p, cantidad: p.cantidad + 1 };
                    }
                    return p;
                });
            } else {
                // Aquí estaba el error principal - ahora agregamos el nuevo producto
                productoAgregadosAlCarrito = [...productoAgregadosAlCarrito, producto];
            }
            
            actulizarCarrito();
        });
    });
    
    function actulizarCarrito() {
        mostrarPoductosAlcarrito.innerHTML = "";
        let total = 0;
        
        productoAgregadosAlCarrito.forEach(producto => {
            const li = document.createElement("li");
            li.textContent = `${producto.cantidad}x ${producto.nombre} - $${producto.precio.toLocaleString()} (Subtotal: $${(producto.precio * producto.cantidad).toLocaleString()})`;
            mostrarPoductosAlcarrito.appendChild(li);
            
            total += producto.precio * producto.cantidad;
        });
        
        mostrarTotal.textContent = `Total: $${total.toLocaleString()}`;
    }
});
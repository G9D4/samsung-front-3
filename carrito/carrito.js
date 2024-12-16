let carritoInvitado = JSON.parse(localStorage.getItem("cart"))
console.log('carritoInvitado',carritoInvitado)

const carritoContainer = document.getElementById('carrito');
const totalContainer = document.getElementById('total');

const renderCarrito = () => {
    if (!carritoInvitado || carritoInvitado.length === 0) {
        carritoContainer.innerHTML = "<p>El carrito está vacío.</p>";
        totalContainer.textContent = "Total: S/. 0.00";
        return;
    }

    let total = 0;
    let renderedCarrito = '';

    carritoInvitado.forEach((item) => {
        const product = data.productos.find(p => p.id === item.id);
        const subtotal = product.precio * item.quantity;
        total += subtotal;

        renderedCarrito += `
            <article class="cart-item">
                <div>
                    <img src=${product.url[0]} alt="${product.nombre}">
                </div>
                <div>
                    <h1>${product.nombre}</h1>
                    <p>Precio: S/. ${product.precio}</p>
                    <p>Cantidad: 
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        ${item.quantity}
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </p>
                    <p>Subtotal: S/. ${subtotal.toFixed(2)}</p>
                </div>
                <button class="delete-btn" onclick="removeFromCart(${item.id})">Eliminar</button>
            </article>
        `;
    });

    carritoContainer.innerHTML = renderedCarrito;
    totalContainer.textContent = `Total: S/. ${total.toFixed(2)}`;
};


//Actualiza cantidad de productos
const updateQuantity = (productId, change) => {
    const itemIndex = carritoInvitado.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        carritoInvitado[itemIndex].quantity += change;

        // Eliminar el producto si la cantidad llega a 0
        if (carritoInvitado[itemIndex].quantity <= 0) {
            carritoInvitado.splice(itemIndex, 1);
        }
        localStorage.setItem("cart", JSON.stringify(carritoInvitado));
        renderCarrito();
    }
};

//Eliminar producto ;-;
const removeFromCart = (productId) => {
    carritoInvitado = carritoInvitado.filter(item => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(carritoInvitado));
    renderCarrito();
};

renderCarrito();
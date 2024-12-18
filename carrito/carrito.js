import data from '../data.json' with { type: "json" };

let carritoInvitado = JSON.parse(localStorage.getItem("cart"))
console.log('carritoInvitado',carritoInvitado)

    const carritoContainer = document.getElementById('carrito');
    let totalContainer = document.getElementById('total');


const renderCarrito = () => {
    if (!carritoInvitado || carritoInvitado.length === 0) {
        carritoContainer.innerHTML = `
                                  <p>El carrito está vacío.</p>
                                  <a href="../home/home.html" class="seguir-comprando">Haz click aquí para continuar comprando.</a>
                                  `;
        totalContainer.style.display = 'none'
        return;
    }

    totalContainer.style.display = 'flex'

    let total = 0;
    let renderedCarrito = '';

    carritoInvitado.forEach((item) => {
        const product = data.productos.find(p => p.id === item.id);
        const subtotal = product.precio * item.quantity;
        total += subtotal;

        console.log("Producto guardado" + product);

        renderedCarrito += `
            <table class="table-desktop">
                <tr>
                    <th>Articulo</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th></th>
                </tr>
                <tr>
                    <td>
                        <img src=${product.url[0]} alt="producto 1">
                    </td>
                    <td>${product.descripcion}</td>
                    <td>${product.precio}</td>
                    <td>
                        <input type="number" name="cantidad${product.id}" id="cantidad${product.id}" value=${item.quantity}>
                    </td>
                    <td>${subtotal}</td>
                    <td></td>

                </tr>
            </table>
        `;

    });

    carritoContainer.innerHTML = renderedCarrito;
    totalContainer.innerHTML = `
          <form id="form-pedido" method="get">
          <h2>Resumen:</h2>
          <p>Subtotal: </p>
          <p>US$ ${25}</p>
          <p>Impuestos: </p>
          <p>US$ ${666}</p>
          <h3>Total incluyendo impuestos US$ ${1043}</h3>
          <h3>Total sin incluir impuetos US$ ${68464}</h3>
          <p>Total: S/. ${total.toFixed(2)}</p>
          </form>
          <button class="terciary-btn">Aplicar Código de descuento</button>
          <a href="../checkout/checkouy.html">
             <button class="primary-btn">Finalizar pedido</button>
          </a>
        `;
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
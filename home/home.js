import data from '../data.json' with { type: "json" };

const mobile = document.getElementById('mobile');
const tvAudio = document.getElementById('tvAudio');
const electrodomesticos = document.getElementById('electrodomesticos');
const tecnologiaAi = document.getElementById('tecnologiaAi');

const renderProducts = (event) => {
    
    const category = event.target.id;
    const productsData = data.productos.filter(p => p.categoria === category);
    const productsContainer = document.getElementById('products');
    let renderedProducts = ''
    productsData.forEach((element) => {
        renderedProducts +=
            `<article class="product-item">
                <div>
                    <a>
                        <img src=${element.url[0]} alt="Producto 1">
                    </a>
                </div>
                <div >
                    <h1 class="product__title">${element.nombre}</h1>
                    <h2 class="product__price">S/. ${element.precio}</h2>
                </div>
                <button class="primary-btn" onclick="addToCart(${element.id})">Agregar al carrito</button>
            </article>`
    })
    productsContainer.innerHTML = renderedProducts;
};

window.addToCart = (productId) => {
    console.log(productId);
    // Agregar codigo para agregar al carrito
}

mobile.addEventListener('click', renderProducts);
tvAudio.addEventListener('click', renderProducts);
electrodomesticos.addEventListener('click', renderProducts);
tecnologiaAi.addEventListener('click', renderProducts);

mobile.click(); //Permite que al cargar la pagina por primera vez aparezcan los productos de mobile

// Funcion para render de novedades, buscar entre los productos cuales tienen la propiedad "novedades" en true
// Funcion para render de mas elegidos, buscar entre los productos cuales tienen la propiedad "elegidos" en true

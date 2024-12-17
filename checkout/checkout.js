import { getCartGuest } from "../helpers/general.js";
import data from '../data.json' with { type: "json" };

const cartItems = getCartGuest();

const renderItemsSection = () => {
    const cartContainer = document.getElementById("cart-items-section");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartTotal = document.getElementById("cart-total");
    let renderedItems = '';
    let priceSum = null;
    
    cartItems.forEach(element => {
        let productInfo = data.productos.filter(p => p.id == element.id)[0];
        priceSum = priceSum + productInfo.precio;
        renderedItems +=
        `<article class="checkout-detail_product">
            <div class="checkout-detail_product_image">
                <img src=${productInfo.url[0]} alt=${productInfo.id}>
                <span>${element.quantity}</span>
            </div>
            <p>${productInfo.nombre}</p>
            <p>S/. ${productInfo.precio.toFixed(2)}</p>
        </article>`
    });

    cartContainer.innerHTML = renderedItems;
    cartSubtotal.innerHTML = `S/. ${priceSum.toFixed(2)}`;
    cartTotal.innerHTML = `S/. ${(13 + priceSum).toFixed(2)}`;
};



renderItemsSection();


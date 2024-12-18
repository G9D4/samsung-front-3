import { getCartGuest } from "../helpers/general.js";
import data from '../data.json' with { type: "json" };

const form = document.getElementById('checkout-form');
const cartItems = getCartGuest();
const inputDni = document.getElementById('dni');
const inputTelefono = document.getElementById('telefono');
const inputNumeroTarjeta = document.getElementById('numeroTarjeta');
const inputFechaExpiracion = document.getElementById('fechaExpiracion');
const inputCvc = document.getElementById('cvc');

const formatDni = (event) => {

    let value = event.srcElement.value;

    const eKey = 69;

    if (event.keyCode != eKey) {
        inputDni.value = value.substr(0, 7);
    } else {
        event.preventDefault();
    }
}

const formatTelefono = (event) => {

    let value = event.srcElement.value;

    const eKey = 69;

    if (event.keyCode != eKey) {
        inputTelefono.value = value.substr(0, 8);
    } else {
        event.preventDefault();
    }
}

const formatNumeroTarjeta = (event) => {

    let value = event.srcElement.value;

    const eKey = 69;

    if (event.keyCode != eKey) {
        inputNumeroTarjeta.value = value.substr(0, 18);
    } else {
        event.preventDefault();
    }
}

const formatExpirationDate = (event) => {

    let value = event.srcElement.value;

    const allowedKeyArray = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8];

    const isAllowedKey = allowedKeyArray.includes(event.keyCode)

    if (isAllowedKey) {
        if (value.length > 1 && event.keyCode != 8) {
            if (value.includes('/')) {
                value = value.replace('/', "");
            }
            inputFechaExpiracion.value = value.substr(0, 2) + "/" + value.substr(2);
        }
    } else {
        event.preventDefault();
    }
}

const formatCvc = (event) => {

    let value = event.srcElement.value;

    const eKey = 69;

    if (event.keyCode != eKey) {
        inputCvc.value = value.toString().substr(0, 3);
    } else {
        event.preventDefault();
    }
}

// Algoritmo de Luhn
const checkCardNumber = (x) => {
    let numberArray = Array.from(x).reverse();
    let doubleNumber = numberArray.map((y, index) => index % 2 !== 0 ? y * 2 : y);
    let cipherSum = doubleNumber.map((z) => z > 9 ? z = 1 + (z % 10) : parseInt(z));
    let sumArray = cipherSum.reduce((a, b) => a + b);
    return sumArray % 10 == 0 ? true : false;
}

const checkExpDate = (value) => {

    if (value.length === 5) {
        const cardMonth = value.substr(0, 2).substr(0, 1) == 0 ? Number(value.substr(1, 1)) : Number(value.substr(0, 2));
        const cardYear = Number(20 + value.substr(3));

        let currentMonth = new Date().getMonth();
        let currentYear = new Date().getFullYear();

        if (cardYear < currentYear || (cardYear === currentYear && cardMonth < currentMonth)) {
            return "Fecha inválida";
        } else {
            return true;
        }
    } else {
        return "La fecha de expiración debe tener el formato MM/AA"
    }
};

const displayError = (field, message) => {
    const input = form[field];
    let errorElement = input.nextElementSibling;
    if (!errorElement || !errorElement.classList.contains("error-message")) {
        errorElement = document.createElement("span");
        errorElement.classList.add("error-message");
        input.after(errorElement);
    }
    errorElement.textContent = message;
}

const clearError = (field) => {
    const input = form[field];
    const errorElement = input.nextElementSibling;
    if (errorElement && errorElement.classList.contains("error-message")) {
        errorElement.textContent = "";
    }
}

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

const validators = {
    email: (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
            displayError("email", "El correo electrónico no es válido");
            return "El correo electrónico no es válido";
        }
        clearError("email");
        return "";
    },
    nombre: (value) => {
        const regex = /^[a-zA-ZÀ-ſ\s]+$/;
        if (!regex.test(value)) {
            displayError("nombre", "El nombre solo debe contener letras y espacios");
            return "El nombre solo debe contener letras y espacios";
        }
        clearError("nombre");
        return "";
    },
    apellidos: (value) => {
        const regex = /^[a-zA-ZÀ-ſ\s]+$/;
        if (!regex.test(value)) {
            displayError("apellidos", "Los apellidos solo deben contener letras y espacios");
            return "Los apellidos solo deben contener letras y espacios";
        }
        clearError("apellidos");
        return "";
    },
    dni: (value) => {
        const regex = /^\d{8}$/;
        if (!regex.test(value)) {
            displayError("dni", "El DNI debe contener exactamente 8 dígitos");
            return "El DNI debe contener exactamente 8 dígitos";
        }
        clearError("dni");
        return "";
    },
    telefono: (value) => {
        const regex = /^\d{7,9}$/;
        if (!regex.test(value)) {
            displayError("telefono", "El teléfono debe contener entre 7 a 9 dígitos");
            return "El teléfono debe contener entre 7 a 9 dígitos";
        }
        clearError("telefono");
        return "";
    },
    numeroTarjeta: (value) => {
        const regex = /^\d{16,19}$/;
        if (!regex.test(value)) {
            displayError("numeroTarjeta", "El número de tarjeta debe contener entre 16 a 19 dígitos");
            return "El número de tarjeta debe contener entre 16 a 19 dígitos";
        }
        // if (!checkCardNumber(value)) {
        //     displayError("numeroTarjeta", "Número de tarjeta inválido");
        //     return "Número de tarjeta inválido";
        // }
        clearError("numeroTarjeta");
        return "";
    },
    nombreTitular: (value) => {
        const regex = /^[a-zA-ZÀ-ſ\s]+$/;
        if (!regex.test(value)) {
            displayError("nombreTitular", "El nombre solo debe contener letras y espacios");
            return "El nombre solo debe contener letras y espacios";
        }
        clearError("nombreTitular");
        return "";
    },
    fechaExpiracion: (value) => {

        if (!checkExpDate(value)) {
            displayError("fechaExpiracion", checkExpDate(value));
            return checkExpDate(value);
        }
        clearError("fechaExpiracion");
        return "";
    },
    cvc: (value) => {
        const regex = /^\d{3,4}$/;
        if (!regex.test(value)) {
            displayError("cvc", "El número de tarjeta debe contener entre 3 a 4 dígitos");
            return "El número de tarjeta debe contener entre 3 a 4 dígitos";
        }
        clearError("cvc");
        return "";
    },

};

renderItemsSection();
inputDni.addEventListener('keydown', formatDni);
inputTelefono.addEventListener('keydown', formatTelefono);
inputNumeroTarjeta.addEventListener('keydown', formatNumeroTarjeta);
inputFechaExpiracion.addEventListener('keydown', formatExpirationDate);
inputCvc.addEventListener('keydown', formatCvc);

form.addEventListener("submit", function (e) {
    
    e.preventDefault();

    const formValues = {
        email: form.email.value.trim().toLowerCase(),
        nombre: form.nombre.value,
        apellidos: form.apellidos.value,
        dni: form.dni.value,
        telefono: form.telefono.value,
        numeroTarjeta: form.numeroTarjeta.value,
        nombreTitular: form.nombreTitular.value,
        fechaExpiracion: form.fechaExpiracion.value,
        cvc: form.cvc.value
    };

    let isValid = true;

    Object.keys(validators).forEach((field) => {
        // const input = form[field];
        const error = validators[field](formValues[field], formValues);
        if (error) {
            isValid = false;
        }
    });

    if (isValid) {
        alert("¡Compra registrada exitosamente!");
        // window.location.href = "../home/home.html";
    }
});
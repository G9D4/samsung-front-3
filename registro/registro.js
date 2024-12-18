import data from '../data.json' with { type: "json" };

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("main.registro form");

    // Validaciones
    const validators = {
        nombres: (value) => {
            const regex = /^[a-zA-ZÀ-ſ\s]+$/;
            if (!regex.test(value)) {
                displayError("nombres", "El nombre solo debe contener letras y espacios");
                return "El nombre solo debe contener letras y espacios";
            }
            clearError("nombres");
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
        telefono: (value) => {
            const regex = /^\d{9}$/;
            if (!regex.test(value)) {
                displayError("telefono", "El teléfono debe contener exactamente 9 dígitos");
                return "El teléfono debe contener exactamente 9 dígitos";
            }
            clearError("telefono");
            return "";
        },
        correo: (value) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Validación de correo
            if (!regex.test(value)) {
                displayError("correo", "El correo electrónico no es válido");
                return "El correo electrónico no es válido";
            }
            clearError("correo");
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const correoExiste = usuarios.some(usuario => usuario.correo === value.trim());
            if (correoExiste) {
                displayError("correo", "El correo electrónico ya está registrado");
                return "El correo electrónico ya está registrado";
            }
            clearError("correo");
            return "";
        },
        password: (value) => {
            const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (!regex.test(value)) {
                displayError("password", "La contraseña debe tener al menos 8 caracteres, incluir letras y números");
                return "La contraseña debe tener al menos 8 caracteres, incluir letras y números";
            }
            clearError("password");
            return "";
        },
        password_confirm: (value, formValues) => {
            if (value !== formValues.password) {
                displayError("password_confirm", "Las contraseñas no coinciden");
                return "Las contraseñas no coinciden";
            }
            clearError("password_confirm");
            return "";
        }
    };

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const formValues = {
            nombres: form.nombres.value,
            apellidos: form.apellidos.value,
            telefono: form.telefono.value,
            correo: form.correo.value,
            password: form.password.value,
            password_confirm: form.password_confirm.value
        };

        let isValid = true;

        // Validar cada campo
        Object.keys(validators).forEach((field) => {
            const input = form[field];
            const error = validators[field](formValues[field], formValues);
            if (error) {
                isValid = false;
            }
        });

        // Si todas las validaciones pasan
        if (isValid) {
            alert("Formulario validado con éxito");
            // displayError("exito", "Formulario validado con éxito");

            // Obtener usuarios
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            const nuevoUsuario = {
                id: Date.now(), // Un ID único basado en la fecha y hora por ahora hasta obtener el id de data.json
                nombres: formValues.nombres,
                apellidos: formValues.apellidos,
                telefono: formValues.telefono,
                correo: formValues.correo,
                password: formValues.password
            };
            usuarios.push(nuevoUsuario);

            // Guardar usuarios  solucionar
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            console.log('Nuevo usuario registrado:', nuevoUsuario); 

            form.reset(); // Limpiar formulario
            // clearError("exito");
        }
    });

    function displayError(field, message) {
        const input = form[field];
        let errorElement = input.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains("error-message")) {
            errorElement = document.createElement("div");
            errorElement.classList.add("error-message");
            input.after(errorElement);
        }
        errorElement.textContent = message;
    }

    function clearError(field) {
        const input = form[field];
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains("error-message")) {
            errorElement.textContent = "";
        }
    }
});

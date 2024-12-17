import data from '../data.json' with { type: "json" };

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("main.registro form");

    // Validaciones
    const validators = {
        nombres: (value) => {
            const regex = /^[a-zA-ZÀ-ſ\s]+$/;
            if (!value.trim()) {
                alert("El nombre es obligatorio");
                return "El nombre es obligatorio";
            }
            if (!regex.test(value)) {
                alert("El nombre solo debe contener letras y espacios");
                return "El nombre solo debe contener letras y espacios";
            }
            return "";
        },
        apellidos: (value) => {
            const regex = /^[a-zA-ZÀ-ſ\s]+$/;
            if (!value.trim()) {
                alert("Los apellidos son obligatorios");
                return "Los apellidos son obligatorios";
            }
            if (!regex.test(value)) {
                alert("Los apellidos solo deben contener letras y espacios");
                return "Los apellidos solo deben contener letras y espacios";
            }
            return "";
        },
        telefono: (value) => {
            const regex = /^\d{9}$/;
            if (!regex.test(value)) {
                alert("El teléfono debe contener exactamente 9 dígitos");
                return "El teléfono debe contener exactamente 9 dígitos";
            }
            return "";
        },
        correo: (value) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Validación de correo
            if (!regex.test(value)) {
                alert("El correo electrónico no es válido");
                return "El correo electrónico no es válido";
            }
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const correoExiste = usuarios.some(usuario => usuario.correo === value.trim());
            if (correoExiste) {
                alert("El correo electrónico ya está registrado");
                return "El correo electrónico ya está registrado";
            }
            return "";
        },
        password: (value) => {
            const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (!regex.test(value)) {
                alert("La contraseña debe tener al menos 8 caracteres, incluir letras y números");
                return "La contraseña debe tener al menos 8 caracteres, incluir letras y números";
            }
            return "";
        },
        passwordConfirm: (value, formValues) => {
            if (value !== formValues.password) {
                alert("Las contraseñas no coinciden");
                return "Las contraseñas no coinciden";
            }
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
            passwordConfirm: form.password_confirm.value
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
        }
    });
});

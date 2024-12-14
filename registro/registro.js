import data from '../data.json' with { type: "json" };

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("main.registro form");

    // Validaciones
    const validators = {
        nombres: (value) => {
            const regex = /^[a-zA-ZÀ-ſ\s]+$/;
            if (!value.trim()) {
                alert("El nombre es obligatorio");
                console.log("Error: El nombre es obligatorio");
                return "El nombre es obligatorio";
            }
            if (!regex.test(value)) {
                alert("El nombre solo debe contener letras y espacios");
                console.log("Error: El nombre solo debe contener letras y espacios");
                return "El nombre solo debe contener letras y espacios";
            }
            return "";
        },
        apellidos: (value) => {
            const regex = /^[a-zA-ZÀ-ſ\s]+$/;
            if (!value.trim()) {
                alert("Los apellidos son obligatorios");
                console.log("Error: Los apellidos son obligatorios");
                return "Los apellidos son obligatorios";
            }
            if (!regex.test(value)) {
                alert("Los apellidos solo deben contener letras y espacios");
                console.log("Error: Los apellidos solo deben contener letras y espacios");
                return "Los apellidos solo deben contener letras y espacios";
            }
            return "";
        },
        telefono: (value) => {
            const regex = /^\d{9}$/;
            if (!regex.test(value)) {
                alert("El teléfono debe contener exactamente 9 dígitos");
                console.log("Error: El teléfono debe contener exactamente 9 dígitos");
                return "El teléfono debe contener exactamente 9 dígitos";
            }
            return "";
        },
        correo: (value) => {
            const regex = /^[A-Za-z0-9_@.\/#$&+-@*]*$/;  // la misma validacion de contraseña que se utilizo en back-end
            if (!regex.test(value)) {
                alert("El correo electrónico no es válido");
                console.log("Error: El correo electrónico no es válido");
                return "El correo electrónico no es válido";
            }
            const correoExiste = data.usuarios && data.usuarios.some(usuario => usuario.correo === value.trim());
            if (correoExiste) {
                alert("El correo electrónico ya está registrado");
                console.log("Error: El correo electrónico ya está registrado");
                return "El correo electrónico ya está registrado";
            }
            return "";
        },
        password: (value) => {
            const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
            if (!regex.test(value)) {
                alert("La contraseña debe tener al menos 8 caracteres, incluir letras y números");
                console.log("Error: La contraseña debe tener al menos 8 caracteres, incluir letras y números");
                return "La contraseña debe tener al menos 8 caracteres, incluir letras y números";
            }
            return "";
        },
        passwordConfirm: (value, formValues) => {
            if (value !== formValues.password) {
                alert("Las contraseñas no coinciden");
                console.log("Error: Las contraseñas no coinciden");
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
            console.log("Nuevo usuario registrado:", {
                id: Date.now(), // cambiar a un id valido
                nombres: formValues.nombres,
                apellidos: formValues.apellidos,
                telefono: formValues.telefono,
                correo: formValues.correo
            });

            form.reset(); // Limpiar formulario
        }
    });
});
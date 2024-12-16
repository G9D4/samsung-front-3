document.addEventListener("DOMContentLoaded", async function () {
    let data;

    try {
        const response = await fetch('../data.json');
        if (!response.ok) throw new Error("Error al cargar datos");
        data = await response.json();
    } catch (error) {
        console.error("Error al cargar el archivo JSON:", error);
        return;
    }

    const form = document.querySelector("main.login form");

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
        password: (value) => {
            const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
            if (!regex.test(value)) {
                displayError("password", "La contraseña debe tener al menos 8 caracteres, incluir letras y números");
                return "La contraseña debe tener al menos 8 caracteres, incluir letras y números";
            }
            clearError("password");
            return "";
        }
    };

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const formValues = {
            email: form.email.value.trim().toLowerCase(),
            password: form.password.value
        };

        let isValid = true;

        const emailError = validators.email(formValues.email);

        if (emailError) {
            isValid = false;
            // return "";
        }

        if (isValid) {
            const usuarios = data.usuarios || [];
            const usuario = usuarios.find(
                (user) => user.email.toLowerCase() === formValues.email
            );

            if (!usuario) {
                displayError("email", "El usuario no existe");
                // return '';
                isValid = false;
            } else {
                const passwordError = validators.password(formValues.password);

                if (passwordError) {
                    isValid = false;
                }

                if (isValid && usuario.password !== formValues.password) {
                    displayError("password", "La contraseña no coincide con el usuario");
                    isValid = false;
                }
            }
        }

        if (isValid) {
            alert("Inicio de sesión exitoso.");
            window.location.href = "../home/home.html";
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

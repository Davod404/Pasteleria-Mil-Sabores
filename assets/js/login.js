const formulario = document.querySelector("form");

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (email === "") {
        alert("Debes ingresar tu correo electrónico.");
        return;
    }

    if (password === "") {
        alert("Debes ingresar tu contraseña.");
        return;
    }

    const usuarioGuardado = JSON.parse(
        localStorage.getItem("usuario")
    );

    if (!usuarioGuardado) {
        alert("No existe ningún usuario registrado.");
        return;
    }

    if (
        email === usuarioGuardado.email &&
        password === usuarioGuardado.password
    ) {
        localStorage.setItem("sesionActiva", "true");

        alert(`Bienvenido, ${usuarioGuardado.nombre}`);

        window.location.href = "index.html";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
});
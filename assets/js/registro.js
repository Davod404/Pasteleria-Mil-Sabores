const formulario = document.querySelector("form");

formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const fechaNacimiento = document.getElementById("fecha-nacimiento").value;
    const codigo = document.getElementById("codigo-registro").value.trim().toUpperCase();

    if (nombre === "") {
        alert("Debes ingresar tu nombre completo.");
        return;
    }

    if (email === "") {
        alert("Debes ingresar tu correo electrónico.");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
    }

    if (fechaNacimiento === "") {
        alert("Debes ingresar tu fecha de nacimiento.");
        return;
    }

    const fecha = new Date(fechaNacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fecha.getFullYear();

    const mes = hoy.getMonth() - fecha.getMonth();

    if (
        mes < 0 ||
        (mes === 0 && hoy.getDate() < fecha.getDate())
    ) {
        edad--;
    }

    const esDuoc = email.toLowerCase().endsWith("@duocuc.cl");
    const mayor50 = edad >= 50;
    const tieneFelices50 = codigo === "FELICES50";

    const usuario = {
        nombre: nombre,
        email: email,
        password: password,
        fechaNacimiento: fechaNacimiento,
        edad: edad,
        esDuoc: esDuoc,
        mayor50: mayor50,
        felices50: tieneFelices50
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    alert("Registro exitoso.");

    window.location.href = "login.html";
});
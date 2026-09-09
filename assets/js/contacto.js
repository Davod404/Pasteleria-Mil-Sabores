document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-contacto");
    const feedback = document.getElementById("mensaje-feedback");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre-contacto").value.trim();
        const email = document.getElementById("email-contacto").value.trim();
        const motivo = document.getElementById("motivo").value;
        const mensaje = document.getElementById("mensaje").value.trim();

        if (nombre.length < 3) {
            mostrarError("El nombre debe tener al menos 3 caracteres.");
            return;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email)) {
            mostrarError("Por favor ingresa un correo electrónico válido (ejemplo: usuario@correo.com).");
            return;
        }

        if (motivo === "") {
            mostrarError("Debes seleccionar un motivo para tu consulta.");
            return;
        }

        if (mensaje.length < 10) {
            mostrarError("El mensaje debe contener al menos 10 caracteres explicativos.");
            return;
        }

        feedback.style.color = "green";
        feedback.textContent = "¡Mensaje enviado con éxito! Nos comunicaremos pronto.";
        form.reset();
    });

    function mostrarError(texto) {
        feedback.style.color = "var(--danger, #d32f2f)";
        feedback.textContent = texto;
    }
});
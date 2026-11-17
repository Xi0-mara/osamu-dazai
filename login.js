const formLogin = document.getElementById("form-login");
const formRegistro = document.getElementById("form-registro");
const mensaje = document.getElementById("mensaje");
const enlaceCambiar = document.getElementById("enlace-cambiar");
const textoCambiar = document.getElementById("texto-cambiar");
const subtitulo = document.getElementById("subtitulo");

clienteSupabase.auth.getSession().then(function (respuesta) {
    if (respuesta.data.session) {
        window.location.href = "index.html";
    }
});

function mostrarMensaje(texto, tipo) {
    mensaje.innerText = texto;
    mensaje.className = "mensaje " + tipo;
}

function leerError(error) {
    const texto = (error.message || "").toLowerCase();

    if (texto.includes("invalid login credentials")) {
        return "Correo o contraseña incorrectos.";
    }
    if (texto.includes("email not confirmed")) {
        return "Debes confirmar tu correo antes de entrar. Revisa tu bandeja de entrada.";
    }
    if (texto.includes("already registered") || texto.includes("already been registered")) {
        return "Ese correo ya tiene una cuenta. Inicia sesión.";
    }
    if (texto.includes("password should be at least")) {
        return "La contraseña debe tener mínimo 6 caracteres.";
    }
    if (texto.includes("rate limit") || texto.includes("too many")) {
        return "Demasiados intentos. Espera un momento e inténtalo de nuevo.";
    }
    if (texto.includes("failed to fetch") || texto.includes("network")) {
        return "No se pudo conectar con la base de datos. Revisa tu internet.";
    }

    return "No se pudo completar la acción: " + error.message;
}

let modoRegistro = false;

enlaceCambiar.addEventListener("click", function (e) {
    e.preventDefault();
    modoRegistro = !modoRegistro;

    formLogin.classList.toggle("oculto", modoRegistro);
    formRegistro.classList.toggle("oculto", !modoRegistro);

    textoCambiar.innerText = modoRegistro ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?";
    enlaceCambiar.innerText = modoRegistro ? "Inicia sesión" : "Regístrate";
    subtitulo.innerText = modoRegistro ? "Crea tu cuenta" : "Inicia sesión para continuar";
    mostrarMensaje("", "");
});


formLogin.addEventListener("submit", async function (e) {
    e.preventDefault();

    const correo = document.getElementById("login-correo").value.trim();
    const password = document.getElementById("login-clave").value;

    const boton = formLogin.querySelector("button[type=submit]");
    boton.disabled = true;
    boton.innerText = "Entrando...";

    const { data, error } = await clienteSupabase.auth.signInWithPassword({
        email: correo,
        password: password
    });

    boton.disabled = false;
    boton.innerText = "Entrar";

    console.log("Respuesta de login:", data, error);

    if (error) {
        mostrarMensaje(leerError(error), "error");
        return;
    }

    window.location.href = "index.html";
});


formRegistro.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombre = document.getElementById("registro-nombre").value.trim();
    const correo = document.getElementById("registro-correo").value.trim();
    const password = document.getElementById("registro-clave").value;

    const boton = formRegistro.querySelector("button[type=submit]");
    boton.disabled = true;
    boton.innerText = "Creando cuenta...";

    const { data, error } = await clienteSupabase.auth.signUp({
        email: correo,
        password: password,
        options: {
            data: { nombre: nombre }
        }
    });

    boton.disabled = false;
    boton.innerText = "Crear cuenta";

    console.log("Respuesta de registro:", data, error);

    if (error) {
        mostrarMensaje(leerError(error), "error");
        return;
    }

    if (data.session) {
        window.location.href = "index.html";
    } else {
        mostrarMensaje("Cuenta creada. Revisa tu correo para confirmarla y luego inicia sesión.", "exito");
        formRegistro.reset();
    }
});

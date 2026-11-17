(async function () {
    const { data } = await clienteSupabase.auth.getSession();

    if (!data.session) {
        window.location.href = "login.html";
        return;
    }

    document.documentElement.style.visibility = "visible";

    const usuario = data.session.user;
    const nombre = (usuario.user_metadata && usuario.user_metadata.nombre) || usuario.email;

    const barra = document.createElement("div");
    barra.className = "barra-sesion";
    barra.innerHTML = `<span></span><button id="btn-salir">Cerrar sesión</button>`;
    barra.querySelector("span").textContent = "Hola, " + nombre;
    document.body.appendChild(barra);

    document.getElementById("btn-salir").addEventListener("click", async function () {
        await clienteSupabase.auth.signOut();
        window.location.href = "login.html";
    });
})();

clienteSupabase.auth.onAuthStateChange(function (evento) {
    if (evento === "SIGNED_OUT") {
        window.location.href = "login.html";
    }
});

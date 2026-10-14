document.addEventListener("DOMContentLoaded", () => {
    console.log("¡JavaScript conectado con éxito!");

    const tarjetaBienvenida = document.createElement('div');
    tarjetaBienvenida.innerHTML = `
        <div class="modal-bienvenida">
            <h3>¡Bienvenido/a a mi página!</h3>
            <p>Explora más sobre ella y conoce sobre el</p>
            <button id="cerrar-modal">¡Entendido!</button>
        </div>
    `;
    document.body.appendChild(tarjetaBienvenida);

    const btnCerrar = document.getElementById('cerrar-modal');
    btnCerrar.addEventListener('click', () => {
        tarjetaBienvenida.style.opacity = '0';
        setTimeout(() => {
            tarjetaBienvenida.remove();
        }, 300);
    });
});

const imagenesGaleria = document.querySelectorAll('.galería img');

imagenesGaleria.forEach(foto => {
    foto.addEventListener('mouseover', () => {
        foto.style.transform = 'scale(1.08)';
        foto.style.transition = 'transform 0.3s ease';
        foto.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
    });

    foto.addEventListener('mouseout', () => {
        foto.style.transform = 'scale(1)';
        foto.style.boxShadow = 'none';
    });
});

const contenedorGaleria = document.querySelector('.galería');
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');

if (btnNext && btnPrev && contenedorGaleria) {
    btnNext.addEventListener('click', () => {
        contenedorGaleria.scrollBy({ left: 270, behavior: 'smooth' });
    });

    btnPrev.addEventListener('click', () => {
        contenedorGaleria.scrollBy({ left: -270, behavior: 'smooth' });
    });
}

const tituloPrincipal = document.querySelector('header h1');
if (tituloPrincipal) {
    tituloPrincipal.addEventListener('click', () => {
        if (tituloPrincipal.style.color === 'rgb(0, 0, 0)') {
            tituloPrincipal.style.color = '#ffffff';
        } else {
            tituloPrincipal.style.color = '#000000'; 
        }
    });
}

const botonModo = document.createElement('button');
botonModo.innerText = 'Cambiar Tema';
botonModo.style.position = 'fixed';
botonModo.style.bottom = '20px';
botonModo.style.right = '20px';
botonModo.style.padding = '10px 15px';
botonModo.style.borderRadius = '20px';
botonModo.style.border = 'none';
botonModo.style.backgroundColor = '#678fff';
botonModo.style.color = 'white';
botonModo.style.cursor = 'pointer';
botonModo.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
document.body.appendChild(botonModo);

botonModo.addEventListener('click', () => {
    document.body.classList.toggle('modo-oscuro');
});
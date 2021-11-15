//Vamos a arrancar nuestra aplicacion una ves que este listo una funcion que arranque otras funciones.

document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
    scrollNav();
    navegacionFija();
}


function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <=12; i++) {
        const imagen = document.createElement('picture');
      
          imagen.innerHTML = `
              <source srcset="build/img/thumb/${i}.avif" type="image/avif">
              <source srcset="build/img/thumb/${i}.webp" type="image/webp">
              <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
          `;
        
        imagen.onclick = function () {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);

    }
    
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');

    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    //Crea el overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }


    //Boton para cerrar el modal.
    const cerrarModal = document.createElement('P');//se crea un parrafo
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');

    cerrarModal.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    overlay.appendChild(cerrarModal);



    //A;adirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}


function scrollNav() {

    //Primero se debe leer los enlaces
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    //Iteramos cada enlace
    enlaces.forEach(enlace => {
        //le asociamos un event listener
        enlace.addEventListener('click', function (e) {

            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);

            seccion.scrollIntoView({ behavior: "smooth"});
        });

    });

}


function navegacionFija() {
    
    //Selecciono el header que va a quedar fijo
    const barra = document.querySelector('.header');

    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', function () {
        if( sobreFestival.getBoundingClientRect().top < 0){
            barra.classList.add('fijo');
        }else{
            barra.classList.remove('fijo');
        }
    });
}
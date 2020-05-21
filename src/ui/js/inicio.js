const btnDesplegar = document.getElementById('desplegar');
btnDesplegar.addEventListener('click', (e) => {
    e.preventDefault();
    const icon = document.querySelector('.fa');

    icon.classList.toggle('fa-arrow-down');
    icon.classList.toggle('fa-arrow-up');
   const desplega = document.querySelectorAll('.desplegable');

    desplega.forEach(elementos => {

        elementos.classList.toggle('ydesplegable');
        
    })

});

const btnToggle = document.querySelector('.toggle-btn');
btnToggle.addEventListener('click', function () {

    const x = document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('btnmenu').classList.toggle('ver');
    if ('click') {
        document.getElementById('menu').classList.toggle('fadeOutLeft');

    } else {

    }

});
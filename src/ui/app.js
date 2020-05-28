// este es un  documento para el frontend de la aplicacion 

const alumnofrm = document.getElementById('alumnofrm');

// requiero este modulo para comunicar enlazar el frontend con main


// ahora que ya cargue remote lo ocupo y le digo de donde traer x cosa de main

const { remote } = require('electron')
const main = remote.require('./main')                   //main es mi back end

const id = document.getElementById('id');
const name = document.getElementById('name');
const apellido = document.getElementById('apellido');
const padre = document.getElementById('padre');
var nacimiento = document.getElementById('nacimiento');

const tel =document.getElementById('tele')
const grado = document.getElementById('grado');
const sexo = document.getElementById('sexo');
const modalidad = document.getElementById('modalidad');

const alumnosLista = document.getElementById('filas')
// en este caso una funcion

// selecionar objetos para frontend
const btnToggle = document.querySelector('.toggle-btn');
const ulmenu = document.querySelector('#menu');


// prevenir le recarga de pagina cuando entre a un hiperenlace


let alumno = [];


btnToggle.addEventListener('click', function () {

    const x = document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('btnmenu').classList.toggle('ver');
    if ('click') {
        document.getElementById('scc').classList.toggle('active')
        document.getElementById('menu').classList.toggle('fadeOutLeft');

    } else {

    }

});



const fecha= new Date
const curYear = fecha.getFullYear()
alumnofrm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // crear un objeto que almacena el frm

    const alumno = {
        id_alumno: id.value,
        nombre_alumno: name.value,
        apellido_alumno: apellido.value,
        sexo_alumno: sexo.value,
        nacimiento_alumno: nacimiento.value,
        grado_alumno: grado.value,
        modalidad_alumno: modalidad.value,
        padre_alumno: padre.value,
        domicilio_alumno: domicilio.value,
        alumno_telefono:tel.value,
        ano:curYear

    }

    await main.createAlumno(alumno);


    getAlumno();

})



// para pintar los alumnos llamamos el id de html y lo reseteamos luego recoroo los datos del servido 1 a 1 y 
// le digo que me llene el html += dice que se le agrea uno mas a alumno lista que es html
function renderAlumnos(alumnosObj) {
    alumnosLista.innerHTML = '';
    alumnosObj.forEach(alumno => {
        alumnosLista.innerHTML +=
            `
            <tr class="animated fadeInLeft">
                <td> ${alumno.id_alumno}</td>
                <td>${alumno.nombre_alumno} </td>
                <td> ${alumno.apellido_alumno} </td>
            </tr>
        `
    });
}



getAlumno = async () => {


    alumno = await main.getAlumno();

    renderAlumnos(alumno);
};


async function init() {
    await getAlumno();
};


const a = document.querySelectorAll("a")




init();








// barra con items desplegables
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




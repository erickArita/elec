const { remote } = require('electron')
const main = remote.require('./main')


const btnToggle = document.querySelector('.toggle-btn');
btnToggle.addEventListener('click', function () {
    const x = document.getElementById('sidebar').classList.toggle('active');

    if ('click') {
        document.getElementById('menu').classList.toggle('fadeOutLeft');

    }
    document.getElementById('menu').classList.toggle('fadeInLeft');
    document.getElementById('btnmenu').classList.toggle('ver');
});
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
// id a buscar


// la llamo en el reder
async function buscarAlumno() {

    const id = document.getElementById('intablaGrado').value;

    const result = await main.getthinkById(id);

    console.log(result)
    renderTabla(result);
}

const tablaGenerar = document.getElementById('tablagenerar');
function renderTabla(result) {

    tablaGenerar.innerHTML = '';
    tablaGenerar.innerHTML +=
        `
            <tr class="animated bounceInLeft" > 
            <tr class="animated bounceInLeft" > 
            <td > <a href="#modal1" id="show-modal" onclick="editAlumno(${result.id_alumno})"><i id="edit" class="fa fa-pen-square animated " ></i></a>
            <i id="delete"  class="fa fa-trash-alt animated " onclick="deleteAlumno(${result.id_alumno})" ></i></td>
                <td> ${result.id_alumno}</td>
                <td  id="nombre" style="width: auto;">${result.nombre_alumno}</td>
                <td style="width: auto;"> ${result.apellido_alumno}</td>
                <td> ${result.sexo_alumno} </td>
                <td> ${edad(result.nacimiento_alumno)} </td>
                <td> ${result.grado_alumno} </td>
                <td> ${result.modalidad_alumno} </td>
                <td> ${result.domicilio_alumno} </td>
                <td> ${result.padre_alumno} </td>
                
            </tr>
        `

};

async function editAlumno(x) {
    const result = await main.getthinkById(x)

    id.value = result.id_alumno;
    nombr.value = result.nombre_alumno;
    apellido.value = result.apellido_alumno;
    padre.value = result.padre_alumno;
    nacimiento.value = result.nacimiento_alumno;
    grado.value = result.grado_alumno;
    sexo.value = result.sexo_alumno;
    modalidad.value = result.modalidad_alumno;
    domicilio.value = result.domicilio_alumno;
};


function edad(nacimiento) {
    var now = new Date();
    var ano = now.getFullYear();
    var edad = ano - nacimiento;
    return edad;
};


alumnofrm.addEventListener('submit', async (e) => {
    e.preventDefault();


    const id_alumno = id.value
    const alumno = {
        id_alumno: id.value,
        nombre_alumno: nombr.value,
        apellido_alumno: apellido.value,
        sexo_alumno: sexo.value,
        nacimiento_alumno: nacimiento.value,
        grado_alumno: grado.value,
        modalidad_alumno: modalidad.value,
        padre_alumno: padre.value,
        domicilio_alumno: domicilio.value
    };

    const result = await main.updateAlumno(alumno, id_alumno);
    if (result.affectedRows == 1) {
        window.location.href = '#'
    }

    renderTabla();
    console.log(result, 'color:yellow');
});


async function deleteAlumno(id) {

    if (confirm('Desea eliminar este alumno')) {
        const result = await main.deleteAlumno(id);
        console.log('borrado');
        
    } else {

    }

};

const a = document.querySelectorAll("a")


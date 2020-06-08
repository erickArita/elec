
const { remote } = require('electron');
const main = remote.require('./main');
const customTitlebar = require('custom-electron-titlebar');

// 2. Create the custom titlebar with your own settings
//    To make it work, we just need to provide the backgroundColor property
//    Other properties are optional.
let MyTitleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#000000'),
    shadow: true,
    icon: '../logo-2.png',
    overflow: "hidden",
    menu: false
});

// 3. Update Titlebar text
MyTitleBar.updateTitle(`IHER LEGA  `);

// ahora que ya cargue remote lo ocupo y le digo de donde traer x cosa de main

//   llener el formulario
var id = document.getElementById('id');
var nombre = document.getElementById('nombr');
var apellido = document.getElementById('apellido');
var padre = document.getElementById('padre');
var nacimiento = document.getElementById('nacimiento');
var grado = document.getElementById('grado');
var sexo = document.getElementById('sexo');
var modalidad = document.getElementById('modalidad');
var domicilio = document.getElementById('domicilio');
let tel = document.getElementById('tele')
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
// lamar al frm y sus input
// este es un  documento para el frontend de la aplicacion 

const alumnofrm = document.getElementById('alumnofrm');
const guardar = document.getElementById('save');







// pag buscar  insertar en el dom
const generarBtn = document.getElementById('generarBtn');
const tablaGenerar = document.getElementById('tablagenerar');

generarBtn.addEventListener('click', (e) => {
    e.preventDefault();

    getTablas();
});
// pone el a:o actuar en un input de busqueda
function ponerYear() {
    let inputYear = document.getElementById('year')
    const now = new Date();
    const ano = now.getFullYear();
    console.log(inputYear)
    inputYear.value = ano;
}

getTablas = async (e) => {

    const intablaGrado = document.getElementById('intablaGrado').value;
    const tablaGrado = document.getElementById('tablaGrado').value;
    const years = document.getElementById('year').value



    let sTabla = await main.getTablas(intablaGrado, tablaGrado, parseInt(years));


    renderTabla(sTabla);

   


};

 

function edad(nacimiento) {
    var now = new Date();
    var ano = now.getFullYear();
    var edad = ano - nacimiento;
    return edad;
};

renderTabla = (sTabla) => {

    tablaGenerar.innerHTML = '';
    sTabla.forEach(x => {


        tablaGenerar.innerHTML +=
            `
            <tr > 
            <td ><a href="#modal2"><i id="show-modal"  class="fa fa-arrow-up animated" onclick="ascenderAlumno(${x.id_alumno})"></a></i> <a href="#modal1" id="show-modal" onclick="editAlumno(${x.id_alumno})"><i id="edit" class="fa fa-pen-square animated " ></i></a>
            <i id="delete"  class="fa fa-trash-alt animated " onclick="deleteAlumno(${x.id_alumno})" ></i></td>
                <td> ${x.id_alumno}</td>
                <td  id="nombre" style="width: auto;"><spam id="vlr">${x.nombre_alumno}</spam> </td>
                <td style="width: auto;"> ${x.apellido_alumno}</td>
                <td> ${x.sexo_alumno} </td>
                <td> ${edad(x.nacimiento_alumno)} </td>
                <td> ${x.grado_alumno} </td>
                <td> ${x.modalidad_alumno} </td>
                <td> ${x.domicilio_alumno} </td>
                <td> ${x.padre_alumno} </td>
                <td>${x.alumno_telefono}</td>
            </tr>
        `
    });
};

const input = document.getElementById('intablaGrado');

input.addEventListener('click', () => {
    var select = document.getElementById('tablaGrado');
    var selectProperties = document.getElementById('tablaGrado');

    if (input.value <= 9) {

        select.innerHTML = `<option value=1>BÁSICA</option>`
        console.log('7 a 9');

    } else {

        if (input.value == 10) {
            select.innerHTML = `<option value=2>AÑO FUNDAMENTO</option>`
        } else {

            select.innerHTML = ` 
            <option value=3>BCH</option>
            <option value=4>BCH AC</option>
            <option value=5>BTPAE</option>
            <option value=6>BTPCF</option>
            <option value=7>BTPI</option>`


        }
    }


});


// exportar ecxel
const $btnExportar = document.querySelector("#btnExportar")
$btnExportar.addEventListener("click", function (e) {

    let tableExport = $("#tabla").tableExport({
        formats: ["xlsx"], // (String[]), filetype(s) for the export, (default: ['xls', 'csv', 'txt'])
        filename: "id", // (id, String), filename for the downloaded file, (default: 'id')
        exportButtons: false, // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
        position: "top", // (top, bottom), position of the  caption element relative to table, (default: 'bottom')
        ignoreRows: null, // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
        ignoreCols: 0, // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
        trimWhitespace: false
    }).reset();


    let datos = tableExport.getExportData();
    let preferenciasDocumento = datos.tabla.xlsx;
    tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);

});




async function deleteAlumno(id) {

    if (confirm('Desea eliminar este alumno')) {
        const result = await main.deleteAlumno(id);
        console.log('borrado');
        getTablas();
    }

};


async function editAlumno(x) {
    const result = await main.getthinkById(x)

    id.value = result.id_alumno;
    nombre.value = result.nombre_alumno;
    apellido.value = result.apellido_alumno;
    padre.value = result.padre_alumno;
    nacimiento.value = result.nacimiento_alumno;
    grado.value = result.grado_alumno;
    sexo.value = result.sexo_alumno;
    modalidad.value = result.modalidad_alumno;
    domicilio.value = result.domicilio_alumno;
    tel.value = result.alumno_telefono;
};

// modal window
alumnofrm.addEventListener('submit', async (e) => {
    e.preventDefault();


    const id_alumno = id.value
    const alumno = {
        id_alumno: id.value,
        nombre_alumno: nombre.value,
        apellido_alumno: apellido.value,
        sexo_alumno: sexo.value,
        nacimiento_alumno: nacimiento.value,
        grado_alumno: grado.value,
        modalidad_alumno: modalidad.value,
        padre_alumno: padre.value,
        domicilio_alumno: domicilio.value,
        alumno_telefono: tel.value
    };
    console.log(alumno)
    const result = await main.updateAlumno(alumno, id_alumno);
     

    getTablas();
    console.log(result, 'color:yellow');
});

const a = document.querySelectorAll("a")

// ascender alumno a otro grado

function ascenderAlumno(x) {

    const modalForm = document.getElementById('ascender')
    modalForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const modalidad = document.getElementById('modalidadAsc').value

        const grado = document.getElementById('gradoAsc').value

        console.log(x, parseInt(grado), parseInt(modalidad))

        const alumnoviejo = await main.AlumnoAscendido(x, grado, modalidad)

    })

}
let sel = document.getElementById('modalidadAsc')
let output = document.getElementById('gradoAsc')
output.addEventListener('click', () => {


    if (output.value <= 9) {

        sel.innerHTML = `<option value=1>BÁSICA</option>
       `

    }
    if (output.value == 9) {

        sel.innerHTML = `<option value=1>BÁSICA</option>
        
        `
    }

    if (output.value == 10) {
        sel.innerHTML = `<option value=2>AÑO FUNDAMENTO</option>`
    }


    if (output.value == 11) {
        sel.innerHTML = ` 
        <option value=3>BCH</option>
        <option value=4>BCH AC</option>
        <option value=5>BTPAE</option>
        <option value=6>BTPCF</option>
        <option value=7>BTPI</option>`
    }



});
module.exports = { getTablas }
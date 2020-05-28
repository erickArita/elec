// ahora que ya cargue remote lo ocupo y le digo de donde traer x cosa de main

const { remote } = require('electron')
const main = remote.require('./main')                   //main es mi back end





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
// efectos en la barra de menu 
const btnToggle = document.querySelector('.toggle-btn');
btnToggle.addEventListener('click', function () {

    const x = document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('btnmenu').classList.toggle('ver');
    if ('click') {
        document.getElementById('menu').classList.toggle('fadeOutLeft');

    } else {

    }

    // mover el contenido cuando se presiona el boton de menu
    const moverContenido = document.querySelector('#moveContent');
    moverContenido.classList.toggle('moveStart')

});


// selecciona modalidad dependiendo el grado
let input = document.getElementById('intablaGrado');

let select = document.getElementById('tablaGrado');
let selectProperties = document.getElementById('tablaGrado');
input.addEventListener('click', () => {
    if (input.value <= 9) {

        select.innerHTML = `<option value=1>BÁSICA</option>`

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

            if (input.value == 12) {
                select.innerHTML = ` 
        
            <option value=5>BTPAE</option>
            <option value=6>BTPCF</option>
            <option value=7>BTPI</option>`
            }
        }
    }


});

//  funcion para sacar el promedio
function promedio(objeto, divisor, Scut, Fcut) {
    // le paso los alumnos y saco los valores de cada uno
    let valores = Object.values(objeto);
    console.log(valores)
    // seleccionamos los valores que queremos
    let notas = valores.slice(Scut, Fcut)
    // filtramos que boolean nos debuelve true si es numero
    var promedio = notas.filter(Boolean);
    // quitamos los que son falses y sumamos los valores y diviorD
    let total = promedio.reduce((a, b) => (a + b), 0);
    totalNeto = total / divisor
    // quitamos las cifras decimales y lo limitamos a 2
    return totalNeto.toFixed(2);
}

// pone el a:o actuar en un input de busqueda
function ponerYear(){
    let inputYear = document.getElementById('year')
    const now = new Date();
    const ano = now.getFullYear();
    console.log(inputYear)
    inputYear.value = ano;
}
const generar = document.getElementById('generarBtn')
generar.addEventListener('click', () => {

    const grado = input.value;
    const modalidad = select.value;
    const year = document.getElementById('year').value
    console.log(grado, modalidad,year)

    getNotas(grado, modalidad,year)
})
let nota = [];
async function getNotas(grado, modalidad,year) {

    nota = await main.getNotas(grado, modalidad,year);
    renderTabla(nota);
    console.log(nota)
}

// exportar exel
const $btnExportar = document.querySelector("#btnExportar")
$btnExportar.addEventListener("click", function (e) {

    let tableExport = $("#tbl").tableExport({
        formats: ["xlsx"], // (String[]), filetype(s) for the export, (default: ['xls', 'csv', 'txt'])
        filename: input.value + '°', // (id, String), filename for the downloaded file, (default: 'id')
        exportButtons: false, // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
        position: "top", // (top, bottom), position of the  caption element relative to table, (default: 'bottom')
        ignoreRows: null, // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
        ignoreCols: 0, // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
        bootstrap: true,

        trimWhitespace: false
    }).reset();


    let datos = tableExport.getExportData();
    let preferenciasDocumento = datos.tbl.xlsx;
    tableExport.export2file(preferenciasDocumento.data, preferenciasDocumento.mimeType, preferenciasDocumento.filename, preferenciasDocumento.fileExtension, preferenciasDocumento.merges, preferenciasDocumento.RTL, preferenciasDocumento.sheetname);

});

let tabla = document.getElementById('tbl');

function renderTabla(notas) {


    if (input.value <= 9) {
        tabla.innerHTML = '';
        tabla.innerHTML = `  
        <thead class="thead-light ">
            <th>Número de identidad</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Español</th>
            <th>Ingles</th>
            <th>Educación Artistísca</th>
            <th>Matemáticas</th>
            <th>Tecnología</th>
            <th>Ciencias Naturales</th>
            <th>Estudios Sociales</th>
            <th>Educación Cívica</th>
            <th>Educación Fisica y Deportes</th>
            <th>Promedio</th> 
        </thead>`

        notas.forEach(x => {
            console.log(x)


            tabla.innerHTML +=
                `            
                <tbody id="tablaGenerar">
        
                    <tr>
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>
                        <td> ${x.espanol} </td>
                        <td>${x.ingles}</td>
                        <td>${x.educacionart}</td>
                        <td>${x.matematicas}</td>
                        <td>${x.tecnologia}</td>
                        <td>${ x.cienciasnaturales}</td>
                        <td>${x.estudios_sociales}</td>
                        <td>${x.educacion_civica}</td>
                        <td>${x.educacion_fisicay_deportes}</td>
                        <td>${promedio(x, 9, 7, 16)}</td>                 <!--objeto,divisor,hasta donde corto-->
                    </tr>
                    </tbody>  `

        });
    }
    if (select.value == 2 & input.value == 10) {
        tabla.innerHTML = '';
        tabla.innerHTML = `  
        <thead class="thead-light ">
            <th>Número de identidad</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Matemáticas I</th>
            <th>Biología I</th>
            <th>Psicología</th>
            <th>Informática</th>
            <th>Química I</th>
            <th>Español</th>
            <th>Sociología</th>
            <th>Física I</th>
            <th>Inglés I</th>
            <th>Filosofía</th>
            <th>Matemáticas II</th>
            <th>Historia de Honduras</th>
            <th>Biología II</th>
            <th>Química II</th>
            <th>Español II</th>
            <th>Inglés II</th>
            <th> Orientación Vocacional</th>
            <th> Física II</th>
            <th> Lenguaje Artístisco</th>
            <th> Educación Física</th>
            <th>Promedio</th>
        </thead>`
        notas.forEach(x => {
            tabla.innerHTML +=
                `            
                <tbody id="tablaGenerar">
                                
                    <tr>
                        <td>${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td>${x.apellido_alumno}</td>
                        <td>${x.matematicasi}</td>
                        <td>${x.biologiai}</td>
                        <td>${x.psicologia}</td>
                        <td>${x.informatica}</td>
                        <td>${x.quimicai}</td>
                        <td>${x.espanol}</td>
                        <td>${x.sociologia}</td>
                        <td>${x.fisicai}</td>
                        <td>${x.inglesi}</td>
                        <td>${x.filosofia}</td>
                        <td>${x.matematicasii}</td>
                        <td>${x.historia_honduras}</td>
                        <td>${x.biologiaii}</td>
                        <td>${x.quimicaii}</td>
                        <td>${x.espanolii}</td>
                        <td>${x.inglesii}</td>
                        <td>${x.orientacion_vo}</td>
                        <td>${x.fisicaii}</td>
                        <td>${x.lenguaje_art}</td>
                        <td>${x.educacion_fisica}</td>    
                        <td>${promedio(x, 20, 7, 28)}</td>      
                    </tr>
                    </tbody>
             `
        });
    }

    if (select.value == 3 & input.value == 11) {
        tabla.innerHTML = '';
        tabla.innerHTML = `  
        <thead class="thead-light ">
            <th>Número de identidad</th>
            <th>Nombre</th>
            <th>Apellido</th>
           <th> <p class="vertical">Matemáticas III</p>	</th>
            <th><p  class="vertical">Química III</p></th>
            <th> <p  class="vertical">Lengua y Literatura</p>		</th>
            <th> <p  class="vertical">Educación Física</p>	</th>
             <th> <p  class="vertical">Inglés III</p>	</th>
             <th> <p  class="vertical">Fundamentos de la Invest. Social</p>	</th>
            <th> <p  class="vertical">Física III</p> 	</th>
             <th> <p  class="vertical">Lógica Simbólica</p>	</th>
            <th> <p  class="vertical">Orientacion a la Educ. Superior</p> 	</th>
            <th> <p  class="vertical">Aprecación Artística</p> 	</th>
             <th> <p  class="vertical">Introducción a la Economía</p> 	</th>
            <th> <p  class="vertical">Tec. de la Info. y Comunicación</p> </th>	
            <th> <p  class="vertical">Matemáticas IV</p> 	</th>
            <th> <p  class="vertical">Biología Humana</p> </th>	
            <th> <p  class="vertical">Lenguaje y Pensamiento Crítico</p> 	</th>
            <th> <p  class="vertical">Física IV</p> 	</th>
            <th> <p  class="vertical">Inglés IV</p> 	</th>
            <th> <p  class="vertical">Historia Contemporánea</p> 	</th>
            <th> <p  class="vertical">Antropología	</p> </th>
            <th> <p  class="vertical">Fundamento de Etica Profesional</p> </th>	
            <th> <p  class="vertical">Dibujo Técnico</p> 	</th>
            <th> <p  class="vertical">Educación Ambiental	</p></th>
            <th> <p  class="vertical">Diseño de Proyectos Científicos</p> </th>	
            <th> <p  class="vertical">Introduccion a la Programación</p></th>
            <th><p  class="vertical">Promedio</p></th>

        </thead>`

        notas.forEach(x => {
            tabla.innerHTML +=
                `            
                <tbody id="tablaGenerar">
                                
                    <tr>
                     
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>
                        <td> ${x.matematicas_iii} </td>
                        <td> ${x.quimica_iii} </td>
                        <td>${x.lengua_literatu}</td>
                        <td>${x.edu_fisica}</td>
                        <td>${x.ingles_iii}</td>
                        <td>${x.fun_inves_social}</td>
                        <td>${x.fisica_iii}</td>
                        <td>${x.logica_simbol}</td>
                        <td>${x.orientac_edu_superior}</td>
                        <td>${x.apreciacion_art}</td>
                        <td>${x.intro_economia}</td>
                        <td>${x.tic}</td>
                        <td>${x.matematicas_iv}</td>
                        <td>${x.biologia_humana}</td>
                        <td>${x.leng_pensamien_critico}</td>
                        <td>${x.fisica_iv}</td>
                        <td>${x.ingles_iv}</td>
                        <td>${x.historia_contep}</td>
                        <td>${x.antropologia}</td>
                        <td>${x.fundament_etica_profecinal}</td>
                        <td>${x.dibujo_tecnico}</td>
                        <td>${x.edu_ambiental}</td>
                        <td>${x.diseno_proyectos_ci}</td>
                        <td> ${x.intro_programacion} </td>
                        <td>${promedio(x,24,7,30)} </td>
                    </tr>
                    </tbody>
             `
        });
    }
    if (select.value == 4 & input.value == 11) {
        tabla.innerHTML = '';
        tabla.innerHTML = `  
        <thead class="thead-light ">
            <th>Número de identidad</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th><p  class="vertical">Matemáticas I</p></th>
            <th><p  class="vertical">Español I</p></th>
            <th><p  class="vertical">Inglés I</p></th>
            <th><p  class="vertical">Química I</p></th>
            <th><p  class="vertical">Informática I</p></th>
            <th><p  class="vertical">Física I</p></th>
            <th><p  class="vertical">Biología I</p></th>
            <th><p  class="vertical">Filosofía</p></th>
            <th><p  class="vertical">Psicología</p></th>
            <th><p  class="vertical">Sociología</p></th>
            <th><p  class="vertical">Matemáticas II</p></th>
            <th><p  class="vertical">Español II</p></th>
            <th><p  class="vertical">Inglés II</p></th>
            <th><p  class="vertical">Química II</p></th>
            <th><p  class="vertical"> Física II</p></th>
            <th><p  class="vertical">Biología II</p></th>
            <th><p  class="vertical"> Lenguaje Artístisco</p></th>
            <th><p  class="vertical"> Orientación Vocacional</p></th>
            <th><p  class="vertical">Historia de Honduras</p></th>
            <th><p  class="vertical"> Educación Física</p></th>
            <th> <p class="vertical">Matemáticas III</p></th>
            <th> <p  class="vertical">Lengua y Literatura</p></th>
            <th> <p  class="vertical">Introducción a la Economía</p> 	</th>
            <th> <p  class="vertical">Fundamentos de la Invest. Social</p>	</th>
            <th><p  class="vertical">Química III</p></th>
            <th> <p  class="vertical">Matemáticas IV</p> </th>
            <th> <p  class="vertical">Inglés III</p>	</th>
            <th> <p  class="vertical">Lógica Simbólica</p>	</th>
            <th> <p  class="vertical">Orientacion a la Educ. Superior</p> 	</th>
            <th> <p  class="vertical">Tec. de la Info. y Comunicación</p> </th>	
            <th> <p  class="vertical">Aprecación Artística</p> 	</th>
            <th> <p  class="vertical">Física III</p> 	</th>
            <th> <p  class="vertical">Lenguaje y Pensamiento Crítico</p> 	</th>
            <th> <p  class="vertical">Antropología	</p> </th>
            <th> <p  class="vertical">Historia Contemporánea</p> 	</th>
            <th> <p  class="vertical">Educación Física y Deporte II</p>	</th>
            <th> <p  class="vertical">Educación Ambiental	</p></th>
            <th> <p  class="vertical">Diseño de Proyectos Científicos</p> </th>	
            <th> <p  class="vertical">Física IV</p> 	</th>
            <th> <p  class="vertical">Biología Humana</p> </th>	
            <th> <p  class="vertical">Programación</p></th>
            <th> <p  class="vertical">Dibujo Técnico</p> 	</th>
            <th> <p  class="vertical">Inglés IV</p> 	</th>
            <th> <p  class="vertical">Fundamento de Etica Profesional</p> </th>	
            <th> <p  class="vertical">Promedio</p> </th>	
        </thead>`

        notas.forEach(x => {
            tabla.innerHTML +=
                `            
                <tbody id="tablaGenerar">
                                
                    <tr>
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>
                        <td>${x.matematicas_i}</td>
                        <td>${x.espanol_i}</td>
                        <td>${x.ingles_i}</td>
                        <td>${x.quimica_i}</td>
                        <td>${x.informatica}</td>
                        <td>${x.fisica_i}</td>
                        <td>${x.biologia_i}</td>
                        <td>${x.filosofia}</td>
                        <td>${x.psicologia}</td>
                        <td>${x.sociologia}</td>
                        <td>${x.matematicas_ii}</td>
                        <td>${x.espanol_ii}</td>
                        <td>${x.ingles_ii}</td>
                        <td>${x.quimica_ii}</td>
                        <td>${x.fisica_ii}</td>
                        <td>${x.biologia_ii}</td>
                        <td>${x.lenguaje_art}</td>
                        <td>${x.orientacion_voca}</td>
                        <td>${x.historia_honduras}</td>
                        <td>${x.educacion_fisica}</td>
                        <td>${x.matematicas_iii}</td>
                        <td>${x.lengua_literatura}</td>
                        <td>${x.intro_economia}</td>
                        <td>${x.fundameto_invest}</td>
                        <td>${x.quimica_iii}</td>
                        <td>${x.matematicas_iv}</td>
                        <td>${x.ingles_iii}</td>
                        <td>${x.logica_simbolica}</td>
                        <td>${x.orient_edu_superior}</td>
                        <td>${x.tic}</td>
                        <td>${x.apreciacion_art}</td>
                        <td>${x.fisica_iii}</td>
                        <td>${x.lenguaje_pensamieto_critico}</td>
                        <td>${x.antropologia}</td>
                        <td>${x.histo_contemporanea}</td>
                        <td>${x.edu_fisica_deporte_ii}</td>
                        <td>${x.edu_ambiental}</td>
                        <td>${x.diseno_proyect_cient}</td>
                        <td>${x.fisica_iv}</td>
                        <td>${x.biologia_human}</td>
                        <td>${x.programacion}</td>
                        <td>${x.ingles_iv}</td>
                        <td>${x.dibujo_tecnico}</td>
                        <td>${x.funda_etica_pro}</td>
                        <td>${promedio(x, 44, 7, 49)}</td>
                    </tr>
                    </tbody>
             `
        });
    }

    if (select.value == 5 & input.value == 11) {
        tabla.innerHTML = '';
        tabla.innerHTML = `  
        <thead class="thead-light ">
            <th>Número de identidad </th>
            <th>Nombre</th>
            <th> Apellido </th>
            <th><p  class="vertical">Matemáticas III	</p></th>
            <th><p  class="vertical">Lengua y Literatura</p></th>
            <th><p  class="vertical">Inglés Técnico III	</p></th>
            <th><p  class="vertical">Orientación Profesional	</p></th>
            <th><p  class="vertical">Contabilidad Básica I	</p></th>
            <th><p  class="vertical">Comportamiento Organizacional	</p></th>
            <th><p  class="vertical">Desarrollo Socioeconómico	</p></th>
            <th><p  class="vertical">Administración General	</p></th>
            <th><p  class="vertical">Estadística Para Administradores I	</p></th>
            <th><p  class="vertical">Desarrollo de Cultura de Calidad</p></th>	
            <th><p  class="vertical">Gestión de Proyectos</p></th>	
            <th><p  class="vertical">Legislación (Laboral)</p></th>	
            <th><p  class="vertical">Mercadotecnia</p></th>	
            <th><p  class="vertical">Organización del Trabajo</p></th>	
            <th><p  class="vertical">Contabilidad Básica II</p></th>	
            <th><p  class="vertical">Contabilidad de Sociedades</p></th>	
            <th><p  class="vertical">Metodología de la Investigación</p></th>	
            <th><p  class="vertical">Proyectos y Presupuesto	</p></th>
            <th><p  class="vertical">Legislación Mercantil</p></th>	
            <th><p  class="vertical">Contabilidad de Costos</p></th>	
            <th><p  class="vertical">Investigación de Mercados</p></th>	
            <th><p  class="vertical">Estadística Para Administradores II</p></th>	
            <th><p  class="vertical">Informática Administrativa</p></th>
            <th><p  class="vertical">Promedio</p></th>
        </thead>`

        notas.forEach(x => {
            tabla.innerHTML +=
                `            
                <tbody id="tablaGenerar">
                                
                    <tr>
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>
                        <td>${x.matematicasiii}</td>
                        <td>${x.lengua_literatura}</td>
                        <td>${x.ingles_tiii}</td>
                        <td>${x.orientacion_prof}</td>
                        <td>${x.contabilidad_bai}</td>
                        <td>${x.compotamiento_orga}</td>
                        <td>${x.desarrolo_socioeco}</td>
                        <td>${x.adminis_ge}</td>
                        <td>${x.estadistica_admin_i}</td>
                        <td>${x.desarrolo_cultura}</td>
                        <td>${x.gestion_proyectos}</td>
                        <td>${x.legislacion}</td>
                        <td>${x.mercadotecnia}</td>
                        <td>${x.organizacion_trabajo}</td>
                        <td>${x.contabilidad_basic_ii}</td>
                        <td>${x.contabilidad_sociedades}</td>
                        <td>${x.metodologia_investiga}</td>
                        <td>${x.proyectos_presu}</td>
                        <td>${x.legislacion_mercanti}</td>
                        <td>${x.contabilidad_costos}</td>
                        <td>${x.investiga_mercados}</td>
                        <td>${x.estadistica_admin_ii}</td>
                        <td>${x.informmatica_adminis}</td>
                        <td>${promedio(x, 23, 7, 31)}</td>
                    </tr>
                    </tbody>
             `
        });
    }
    if (select.value == 6 & input.value == 11) {
        tabla.innerHTML = '';
        tabla.innerHTML = `  
        <thead class="thead-light ">
            <th>Número de identidad</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th><p  class="vertical">Matemática Aplicada	</th>
            <th><p  class="vertical">Inglés Técnico	</th>
            <th><p  class="vertical">Lengua y Literatura	</th>
            <th><p  class="vertical">Administracion General</th>	
            <th><p  class="vertical">Etica y Orientación Profesional	</th>
            <th><p  class="vertical">Contabilidad I	</th>
            <th><p  class="vertical">Mercadotecnia	</th>
            <th><p  class="vertical">Legislación Bancaria</th>	
            <th><p  class="vertical">Proyectos y Presupuesto</th>	
            <th><p  class="vertical">Organización del Trabajo</th>	
            <th><p  class="vertical">Matemática Financiera</th>	
            <th><p  class="vertical">Contabilidad II</th>
            <th><p  class="vertical">Promedio</th>
        </thead>`

        notas.forEach(x => {
            tabla.innerHTML +=
                `            
                <tbody id="tablaGenerar">
                                
                    <tr>
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>
                        <td> ${x.matematica_aplicada} </td>
                        <td> ${x.ingles_tec} </td>
                        <td> ${x.lengua_literatura} </td>
                        <td> ${x.administra_general} </td>
                        <td> ${x.etica_orientacion} </td>
                        <td> ${x.contabilidad_i} </td>
                        <td> ${x.mercadotecnia} </td>
                        <td> ${x.legislacion_bancaria} </td>
                        <td> ${x.proyectos_presupuest} </td>
                        <td> ${x.organizacion_trabajo} </td>
                        <td> ${x.matematica_financiera} </td>
                        <td> ${x.contabilidad_ii} </td>
                        <td> ${promedio(x, 12, 7, 19)} </td>
                    </tr>
                    </tbody>
             `
        });
    }
    if (select.value == 7 & input.value == 11) {
        tabla.innerHTML = '';
        tabla.innerHTML = `  
        <thead class="thead-light ">
            <th>Número de identidad</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th><p  class="vertical">Matemática III</th>
            <th><p  class="vertical">Lengua y Literatura</th>
            <th><p  class="vertical">Informática I</th>
            <th><p  class="vertical">Física Aplicada</th>
            <th><p  class="vertical">Inglés Técnico III</th>
            <th><p  class="vertical">Análisis y Diseño I</th>
            <th><p  class="vertical">Ética y Orientación Profesional</th>
            <th><p  class="vertical">Laboratorio de Informática I</th>
            <th><p  class="vertical">Programación I</th>
            <th><p  class="vertical">Mercadotecnia</th>
            <th><p  class="vertical">Organización del Trabajo</th>
            <th><p  class="vertical">Proyectos y Presupuesto</th>
            <th><p  class="vertical">Legislación</th>
            <th><p  class="vertical">Laboratorio de Informática II</th>
            <th><p  class="vertical">Informática II</th>
            <th><p  class="vertical">Programación II</th>
            <th><p  class="vertical">Análisis y Diseño II</th>
            <th><p  class="vertical">Promedio</th>
        </thead>`

        notas.forEach(x => {
            tabla.innerHTML +=
                `            
                <tbody id="tablaGenerar">
                                
                    <tr>
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>
                         
                        <td> ${x.matematica_iii} </td> 
                        <td> ${x.lengua_literatura} </td> 
                        <td> ${x.informatica_i} </td> 
                        <td> ${x.fisica_aplicada} </td> 
                        <td> ${x.ingles_tecnico_iii} </td> 
                        <td> ${x.analisis_diseno_i} </td> 
                        <td> ${x.etica_orientacion} </td> 
                        <td> ${x.lab_info} </td> 
                        <td> ${x.frogramacion_i} </td> 
                        <td> ${x.mercadotecnia} </td> 
                        <td> ${x.organizacion_trabajo} </td> 
                        <td> ${x.proyectos_presupuesto} </td> 
                        <td> ${x.legislacion} </td> 
                        <td> ${x.lab_info_ii} </td> 
                        <td> ${x.informatica_ii} </td> 
                        <td> ${x.programacion_ii} </td> 
                        <td> ${x.analisis_diseno_ii} </td>
                        <td> ${promedio(x, 17, 8, 24)} </td>
                    </tr>
                    </tbody>
             `
        });
    }


    if (select.value == 5 & input.value == 12) {
        tabla.innerHTML = '';
        tabla.innerHTML = `  
            <thead class="thead-light ">
            <th>Número de identidad</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th><p  class="vertical">Gestión de Talento Humano I</p></th>
            <th><p  class="vertical">Higiene y Seguridad Industrial	</th>
            <th><p  class="vertical">Administración de la Producción	</th>
            <th><p  class="vertical">Planeación Estratégica	</th>
            <th><p  class="vertical">Mercadotecnia Aplicada a los Servicios	</th>
            <th><p  class="vertical">Matématica Financiera	</th>
            <th><p  class="vertical">Gestion Presupuestaria	</th>
            <th><p  class="vertical">Mercadotecnia Internacional	</th>
            <th><p  class="vertical">Administración de Recursos Financieros	</th>
            <th><p  class="vertical">Gestión del Talento Humano II	</th>
            <th><p  class="vertical">Gestión de Instituciones	</th>
            <th><p  class="vertical">Administración de Ventas (Pasantias)	</th>
            <th><p  class="vertical">Auditoría</th>
            <th><p  class="vertical">Promedio</th>

            </thead>`

        notas.forEach(x => {
            tabla.innerHTML +=
                `            
                <tbody id="tablaGenerar">
                                
                    <tr>
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>
                        <td> ${x.gestion_talent_humano_i} </td>  
                        <td> ${x.higiene_segurudad_indus} </td>  
                        <td> ${x.administracion_produc} </td>  
                        <td> ${x.planeacion_estrategica} </td>  
                        <td> ${x.mercadotecnia_apli_servicios} </td>  
                        <td> ${x.matematica_finan} </td>  
                        <td> ${x.gestion_presupuestaria} </td>  
                        <td> ${x.mercadotecnia_internacional} </td>  
                        <td> ${x.administracion_recursos_finan} </td>  
                        <td> ${x.gestion_talent_humano_ii} </td>  
                        <td> ${x.gestio_instituciones} </td>  
                        <td> ${x.administracion_ventas} </td>  
                        <td> ${x.auditoria} </td> 
                        <td> ${promedio(x, 13, 7, 20)} </td>   
                
                    </tr>
                    </tbody>`

        });
    }
    // contaduria y finanzas
    if (select.value == 6 & input.value == 12) {
        tabla.innerHTML = '';
        tabla.innerHTML = `  
            <thead class="thead-light">
            <th>Número de identidad</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th><p  class="vertical">Economía</p></th>
            <th><p  class="vertical">Legislación</p></th>
            <th><p  class="vertical">Operaciones Tributarias	</p></th>
            <th><p  class="vertical">Contabilidad Bancaria	</p></th>
            <th><p  class="vertical">Admin Financiera I	</p></th>
            <th><p  class="vertical">Informática Contable</p></th>	
            <th><p  class="vertical">Admin Financiera II</p></th>	
            <th><p  class="vertical">Servicio al Cliente</p></th>	
            <th><p  class="vertical">Contabilidad de Costos</p></th>
            <th><p  class="vertical">Auditoría</th>
            <th><p  class="vertical">Promedio</th>

            </thead>`

        notas.forEach(x => {
            tabla.innerHTML +=
                `            
                <tbody id="tablaGenerar">
                                
                    <tr>
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>                   
                        <td>${x.economiai} </td>
                        <td> ${x.legislacion}</td>
                        <td> ${x.operaciones_tributa} </td>  
                        <td> ${x.contabilidad_bancaria} </td>  
                        <td> ${x.administracion_finan_i} </td>  
                        <td> ${x.informatica_contable} </td>  
                        <td> ${x.administracion_finan_ii} </td>  
                        <td> ${x.servicio_cliente} </td>  
                        <td> ${x.contabilidad_costos} </td>  
                        <td> ${x.auditoria} </td> 
                        <td> ${promedio(x, 10, 7, 20)} </td>   
                
                    </tr>
                    </tbody>`

        });
    }

    // informatica 12
    if (select.value == 7 & input.value == 12) {
        tabla.innerHTML = '';
        tabla.innerHTML = `  
            <thead class="thead-light">
            <th>Número de identidad</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th><p  class="vertical">Laboratorio de Informática III</p></th>
            <th><p  class="vertical">Programación III</p></th>
            <th><p  class="vertical">Mantenimiento y Reparación I</p></th>
            <th><p  class="vertical">Redes Informática I</p></th>
            <th><p  class="vertical">Diseño Web I</p></th>
            <th><p  class="vertical">Laboratorio de Informática IV</p></th>	
            <th><p  class="vertical">Diseño Web II</p></th>	
            <th><p  class="vertical">Programación IV</p></th>	
            <th><p  class="vertical">Mantenimiento y Reparación II</p></th>
            <th><p  class="vertical">Redes Informática II</th>
            <th><p  class="vertical">Promedio</th>

            </thead>`

        notas.forEach(x => {
            tabla.innerHTML +=
                `            
                <tbody id="tablaGenerar">
                                
                    <tr>
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>            
                        <td>${x.lab_info_iii } </td>
                        <td> ${x.programacion_iii }</td>
                        <td> ${x.mantenimiento_repa_i } </td>  
                        <td> ${x.redes_informatica_i } </td>  
                        <td> ${x.diseno_web_i } </td>  
                        <td> ${x.lab_info_iv } </td>  
                        <td> ${x.diseno_web_ii } </td>  
                        <td> ${x.programacion_iv } </td>  
                        <td> ${x.mantenimiento_repa_ii } </td>  
                        <td> ${x.redes_informatica_ii } </td> 
                        <td> ${promedio(x, 10, 7, 20)} </td>   
                
                    </tr>
                    </tbody>`

        });
    }
};
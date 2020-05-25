// ahora que ya cargue remote lo ocupo y le digo de donde traer x cosa de main

const { remote } = require('electron')
const main = remote.require('./main')                   //main es mi back-end




// fleha de la barra de nav
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

const generar = document.getElementById('generarBtn')
generar.addEventListener('click', () => {

    const grado = input.value;
    const modalidad = select.value;


    getNotas(grado, modalidad)
})

let nota = [];

async function getNotas(grado, modalidad) {

    nota = await main.getNotas(grado, modalidad);


    renderTabla(nota);
}

// asifnar notas,
async function updateCell(id, idnota, moda, grado) {
    const td = document.getElementById(id);

    console.log
    let tdV = td.children;
    console.log(tdV)
    if (moda == 1) {

        console.log(id)
        // objeto en el cual van todas las notas
        const basica = {

            espanol: tdV.item(3).querySelector('input').value,
            ingles: tdV.item(4).querySelector('input').value,
            educacionart: tdV.item(5).querySelector('input').value,
            matematicas: tdV.item(6).querySelector('input').value,
            tecnologia: tdV.item(7).querySelector('input').value,
            cienciasnaturales: tdV.item(8).querySelector('input').value,
            estudios_sociales: tdV.item(9).querySelector('input').value,
            educacion_civica: tdV.item(10).querySelector('input').value,
            educacion_fisicay_deportes: tdV.item(11).querySelector('input').value

        }
        await main.updateNotas(basica, moda, grado, idnota)
    }

    if (moda == 2) {

        console.log(idnota)
        // objeto en el cual van todas las notas
        const basica = {

            matematicasi: tdV.item(3).querySelector('input').value,
            biologiai: tdV.item(4).querySelector('input').value,
            psicologia: tdV.item(5).querySelector('input').value,
            informatica: tdV.item(6).querySelector('input').value,
            quimicai: tdV.item(7).querySelector('input').value,
            espanol: tdV.item(8).querySelector('input').value,
            sociologia: tdV.item(9).querySelector('input').value,
            fisicai: tdV.item(10).querySelector('input').value,
            inglesi: tdV.item(11).querySelector('input').value,
            filosofia: tdV.item(12).querySelector('input').value,
            matematicasii: tdV.item(13).querySelector('input').value,
            historia_honduras: tdV.item(14).querySelector('input').value,
            biologiaii: tdV.item(15).querySelector('input').value,
            quimicaii: tdV.item(16).querySelector('input').value,
            espanolii: tdV.item(17).querySelector('input').value,
            inglesii: tdV.item(18).querySelector('input').value,
            orientacion_vo: tdV.item(19).querySelector('input').value,
            fisicaii: tdV.item(20).querySelector('input').value,
            lenguaje_art: tdV.item(21).querySelector('input').value,
            educacion_fisica: tdV.item(22).querySelector('input').value

        }

        console.log(basica)
        await main.updateNotas(basica, moda, grado, idnota)
    }
    // objeto modidicade desde la interfaz de bch
    if (moda == 3 && grado == 11) {

        const basica = {
            matematicas_iii: tdV.item(3).querySelector('input').value,
            quimica_iii: tdV.item(4).querySelector('input').value,
            lengua_literatu: tdV.item(5).querySelector('input').value,
            edu_fisica: tdV.item(6).querySelector('input').value,
            ingles_iii: tdV.item(7).querySelector('input').value,
            fun_inves_social: tdV.item(8).querySelector('input').value,
            fisica_iii: tdV.item(9).querySelector('input').value,
            logica_simbol: tdV.item(10).querySelector('input').value,
            orientac_edu_superior: tdV.item(11).querySelector('input').value,
            apreciacion_art: tdV.item(12).querySelector('input').value,
            intro_economia: tdV.item(13).querySelector('input').value,
            tic: tdV.item(14).querySelector('input').value,
            matematicas_iv: tdV.item(15).querySelector('input').value,
            biologia_humana: tdV.item(16).querySelector('input').value,
            leng_pensamien_critico: tdV.item(17).querySelector('input').value,
            fisica_iv: tdV.item(18).querySelector('input').value,
            ingles_iv: tdV.item(19).querySelector('input').value,
            historia_contep: tdV.item(20).querySelector('input').value,
            antropologia: tdV.item(21).querySelector('input').value,
            fundament_etica_profecinal: tdV.item(22).querySelector('input').value,
            dibujo_tecnico: tdV.item(23).querySelector('input').value,
            edu_ambiental: tdV.item(24).querySelector('input').value,
            diseno_proyectos_ci: tdV.item(25).querySelector('input').value,
            intro_programacion: tdV.item(26).querySelector('input').value
        };

        console.log(basica, ' hola');
        await main.updateNotas(basica, moda, grado, idnota);

    }

    if (moda == 4 && grado == 11) {

        const basica = {
            matematicas_i: tdV.item(3).querySelector('input').value,
            espanol_i: tdV.item(4).querySelector('input').value,
            ingles_i: tdV.item(5).querySelector('input').value,
            quimica_i: tdV.item(6).querySelector('input').value,
            informatica: tdV.item(7).querySelector('input').value,
            fisica_i: tdV.item(8).querySelector('input').value,
            biologia_i: tdV.item(9).querySelector('input').value,
            filosofia: tdV.item(10).querySelector('input').value,
            psicologia: tdV.item(11).querySelector('input').value,
            sociologia: tdV.item(12).querySelector('input').value,
            matematicas_ii: tdV.item(13).querySelector('input').value,
            espanol_ii: tdV.item(14).querySelector('input').value,
            ingles_ii: tdV.item(15).querySelector('input').value,
            quimica_ii: tdV.item(16).querySelector('input').value,
            fisica_ii: tdV.item(17).querySelector('input').value,
            biologia_ii: tdV.item(18).querySelector('input').value,
            lenguaje_art: tdV.item(19).querySelector('input').value,
            orientacion_voca: tdV.item(20).querySelector('input').value,
            historia_honduras: tdV.item(21).querySelector('input').value,
            educacion_fisica: tdV.item(22).querySelector('input').value,
            matematicas_iii: tdV.item(23).querySelector('input').value,
            lengua_literatura: tdV.item(24).querySelector('input').value,
            intro_economia: tdV.item(25).querySelector('input').value,
            fundameto_invest: tdV.item(26).querySelector('input').value,
            quimica_iii: tdV.item(27).querySelector('input').value,
            matematicas_iv: tdV.item(28).querySelector('input').value,
            ingles_iii: tdV.item(29).querySelector('input').value,
            logica_simbolica: tdV.item(30).querySelector('input').value,
            orient_edu_superior: tdV.item(31).querySelector('input').value,
            tic: tdV.item(32).querySelector('input').value,
            apreciacion_art: tdV.item(33).querySelector('input').value,
            fisica_iii: tdV.item(34).querySelector('input').value,
            lenguaje_pensamieto_critico: tdV.item(35).querySelector('input').value,
            antropologia: tdV.item(36).querySelector('input').value,
            histo_contemporanea: tdV.item(37).querySelector('input').value,
            edu_fisica_deporte_ii: tdV.item(38).querySelector('input').value,
            edu_ambiental: tdV.item(39).querySelector('input').value,
            diseno_proyect_cient: tdV.item(40).querySelector('input').value,
            fisica_iv: tdV.item(41).querySelector('input').value,
            biologia_human: tdV.item(42).querySelector('input').value,
            programacion: tdV.item(43).querySelector('input').value,
            ingles_iv: tdV.item(44).querySelector('input').value,
            dibujo_tecnico: tdV.item(45).querySelector('input').value,
            funda_etica_pro: tdV.item(46).querySelector('input').value,
        };

        await main.updateNotas(basica, moda, grado, idnota);

    }


    if (moda == 5 && grado == 11) {
        const basica = {
            matematicasiii: tdV.item(3).querySelector('input').value,
            lengua_literatura: tdV.item(4).querySelector('input').value,
            ingles_tiii: tdV.item(5).querySelector('input').value,
            orientacion_prof: tdV.item(6).querySelector('input').value,
            contabilidad_bai: tdV.item(7).querySelector('input').value,
            compotamiento_orga: tdV.item(8).querySelector('input').value,
            desarrolo_socioeco: tdV.item(9).querySelector('input').value,
            adminis_ge: tdV.item(10).querySelector('input').value,
            estadistica_admin_i: tdV.item(11).querySelector('input').value,
            desarrolo_cultura: tdV.item(12).querySelector('input').value,
            gestion_proyectos: tdV.item(13).querySelector('input').value,
            legislacion: tdV.item(14).querySelector('input').value,
            mercadotecnia: tdV.item(15).querySelector('input').value,
            organizacion_trabajo: tdV.item(16).querySelector('input').value,
            contabilidad_basic_ii: tdV.item(17).querySelector('input').value,
            contabilidad_sociedades: tdV.item(18).querySelector('input').value,
            metodologia_investiga: tdV.item(19).querySelector('input').value,
            proyectos_presu: tdV.item(20).querySelector('input').value,
            legislacion_mercanti: tdV.item(21).querySelector('input').value,
            contabilidad_costos: tdV.item(22).querySelector('input').value,
            investiga_mercados: tdV.item(23).querySelector('input').value,
            estadistica_admin_ii: tdV.item(24).querySelector('input').value,
            informmatica_adminis: tdV.item(25).querySelector('input').value

        };
        console.log(basica)
        await main.updateNotas(basica, moda, grado, idnota);
    }

    if (moda == 6 && grado == 11) {
        const basica = {
            matematica_aplicada: tdV.item(3).querySelector('input').value,
            ingles_tec: tdV.item(4).querySelector('input').value,
            lengua_literatura: tdV.item(5).querySelector('input').value,
            administra_general: tdV.item(6).querySelector('input').value,
            etica_orientacion: tdV.item(7).querySelector('input').value,
            contabilidad_i: tdV.item(8).querySelector('input').value,
            mercadotecnia: tdV.item(9).querySelector('input').value,
            legislacion_bancaria: tdV.item(10).querySelector('input').value,
            proyectos_presupuest: tdV.item(11).querySelector('input').value,
            organizacion_trabajo: tdV.item(12).querySelector('input').value,
            matematica_financiera: tdV.item(13).querySelector('input').value,
            contabilidad_ii: tdV.item(14).querySelector('input').value
        }
        console.log(basica)
        await main.updateNotas(basica, moda, grado, idnota);
    }

    if (moda == 7 && grado == 11) {
        const basica = {
            matematica_iii: tdV.item(3).querySelector('input').value,
            lengua_literatura: tdV.item(4).querySelector('input').value,
            informatica_i: tdV.item(5).querySelector('input').value,
            fisica_aplicada: tdV.item(6).querySelector('input').value,
            ingles_tecnico_iii: tdV.item(7).querySelector('input').value,
            analisis_diseno_i: tdV.item(8).querySelector('input').value,
            etica_orientacion: tdV.item(9).querySelector('input').value,
            lab_info: tdV.item(10).querySelector('input').value,
            frogramacion_i: tdV.item(11).querySelector('input').value,
            mercadotecnia: tdV.item(12).querySelector('input').value,
            organizacion_trabajo: tdV.item(13).querySelector('input').value,
            proyectos_presupuesto: tdV.item(14).querySelector('input').value,
            legislacion: tdV.item(15).querySelector('input').value,
            lab_info_ii: tdV.item(16).querySelector('input').value,
            informatica_ii: tdV.item(17).querySelector('input').value,
            programacion_ii: tdV.item(18).querySelector('input').value,
            analisis_diseno_ii: tdV.item(19).querySelector('input').value
        }
        console.log(basica)
        await main.updateNotas(basica, moda, grado, idnota);
    }
    // admin ae 12
    if (moda == 5 && grado == 12) {
        const basica = {
            gestion_talent_humano_i: tdV.item(3).querySelector('input').value,
            higiene_segurudad_indus: tdV.item(4).querySelector('input').value,
            administracion_produc: tdV.item(5).querySelector('input').value,
            planeacion_estrategica: tdV.item(6).querySelector('input').value,
            mercadotecnia_apli_servicios: tdV.item(7).querySelector('input').value,
            matematica_finan: tdV.item(8).querySelector('input').value,
            gestion_presupuestaria: tdV.item(9).querySelector('input').value,
            mercadotecnia_internacional: tdV.item(10).querySelector('input').value,
            administracion_recursos_finan: tdV.item(11).querySelector('input').value,
            gestion_talent_humano_ii: tdV.item(12).querySelector('input').value,
            gestio_instituciones: tdV.item(13).querySelector('input').value,
            administracion_ventas: tdV.item(14).querySelector('input').value,
            auditoria: tdV.item(15).querySelector('input').value

        }
        console.log(basica)
        await main.updateNotas(basica, moda, grado, idnota);
    }
    // contadiria 12 objeto que envio a la base de datos 
    if (moda == 6 && grado == 12) {
        const basica = {
            economiai: tdV.item(3).querySelector('input').value,
            legislacion: tdV.item(4).querySelector('input').value,
            operaciones_tributa: tdV.item(5).querySelector('input').value,
            contabilidad_bancaria: tdV.item(6).querySelector('input').value,
            administracion_finan_i: tdV.item(7).querySelector('input').value,
            informatica_contable: tdV.item(8).querySelector('input').value,
            administracion_finan_ii: tdV.item(9).querySelector('input').value,
            servicio_cliente: tdV.item(10).querySelector('input').value,
            contabilidad_costos: tdV.item(11).querySelector('input').value,
            auditoria: tdV.item(12).querySelector('input').value
             

        }
        console.log(basica)
        await main.updateNotas(basica, moda, grado, idnota);
    }

    // 12 de informatica
    if (moda == 7 && grado == 12) {
        const basica = {
            lab_info_iii: tdV.item(3).querySelector('input').value,
            programacion_iii: tdV.item(4).querySelector('input').value,
            mantenimiento_repa_i: tdV.item(5).querySelector('input').value,
            redes_informatica_i: tdV.item(6).querySelector('input').value,
            diseno_web_i: tdV.item(7).querySelector('input').value,
            lab_info_iv: tdV.item(8).querySelector('input').value,
            diseno_web_ii: tdV.item(9).querySelector('input').value,
            programacion_iv: tdV.item(10).querySelector('input').value,
            mantenimiento_repa_ii: tdV.item(11).querySelector('input').value,
            redes_informatica_ii: tdV.item(12).querySelector('input').value
             

        }
        console.log(basica)
        await main.updateNotas(basica, moda, grado, idnota);
    }
}






let tabla = document.getElementById('tbl');
let tbody = document.getElementById('tbody');
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
            tabla.innerHTML +=
                `            
                <tbody >
                    <tr id="${x.id_alumno}" onkeyup="updateCell(this.id,${x.id_nota},1,7)" >
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>
                        <td><input value= ${x.espanol}> </td>
                        <td><input value=${x.ingles}></td>
                        <td><input value=${x.educacionart}></td>
                        <td><input value=${x.matematicas}></td>
                        <td><input value=${x.tecnologia}></td>
                        <td><input value=${ x.cienciasnaturales}></td>
                        <td><input value=${x.estudios_sociales}></td>
                        <td><input value=${x.educacion_civica}></td>
                        <td><input value=${x.educacion_fisicay_deportes}></td>
                        <td>${promedio(x, 9, 6, 15)}</td>  <!--objeto,divisor,hasta donde corto-->
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
                <tbody >
                                
                    <tr id="${x.id_alumno}" onkeyup="updateCell(this.id,${x.alumno},2,10)" >
                        <td>${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td>${x.apellido_alumno}</td>
                        <td><input value=${x.matematicasi}></td>
                        <td><input value=${x.biologiai}></td>
                        <td><input value=${x.psicologia}></td>
                        <td><input value=${x.informatica}></td>
                        <td><input value=${x.quimicai}></td>
                        <td><input value=${x.espanol}></td>
                        <td><input value=${x.sociologia}></td>
                        <td><input value=${x.fisicai}></td>
                        <td><input value=${x.inglesi}></td>
                        <td><input value=${x.filosofia}></td>
                        <td><input value=${x.matematicasii}></td>
                        <td><input value=${x.historia_honduras}></td>
                        <td><input value=${x.biologiaii}></td>
                        <td><input value=${x.quimicaii}></td>
                        <td><input value=${x.espanolii}></td>
                        <td><input value=${x.inglesii}></td>
                        <td><input value=${x.orientacion_vo}></td>
                        <td><input value=${x.fisicaii}></td>
                        <td><input value=${x.lenguaje_art}></td>
                        <td><input value=${x.educacion_fisica}></td>    
                        <td>${promedio(x, 20, 6, 27)}</td>      
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

        </thead>`

        notas.forEach(x => {
            tabla.innerHTML +=
                `            
                <tbody  >
                                
                    <tr id="${x.id_alumno}" onkeyup="updateCell(this.id,${x.id_bch},3,11)">
                     
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>
                        <td> <input value=${x.matematicas_iii}> </td>
                        <td> <input value=${x.quimica_iii} ></td>
                        <td><input value=${x.lengua_literatu}></td>
                        <td><input value=${x.edu_fisica}></td>
                        <td><input value=${x.ingles_iii}></td>
                        <td><input value=${x.fun_inves_social}></td>
                        <td><input value=${x.fisica_iii}></td>
                        <td><input value=${x.logica_simbol}></td>
                        <td><input value=${x.orientac_edu_superior}></td>
                        <td><input value=${x.apreciacion_art}></td>
                        <td><input value=${x.intro_economia}></td>
                        <td><input value=${x.tic}></td>
                        <td><input value=${x.matematicas_iv}></td>
                        <td><input value=${x.biologia_humana}></td>
                        <td><input value=${x.leng_pensamien_critico}></td>
                        <td><input value=${x.fisica_iv}></td>
                        <td><input value=${x.ingles_iv}></td>
                        <td><input value=${x.historia_contep}></td>
                        <td><input value=${x.antropologia}></td>
                        <td><input value=${x.fundament_etica_profecinal}></td>
                        <td><input value=${x.dibujo_tecnico}></td>
                        <td><input value=${x.edu_ambiental}></td>
                        <td><input value=${x.diseno_proyectos_ci}></td>
                        <td> <input value=${x.intro_programacion}> </td>
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
                <tbody>
                                
                    <tr id="${x.id_alumno}" onkeyup="updateCell(this.id,${x.id_bchac},4,11)"> 
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>
                        <td><input value=${x.matematicas_i}></td>
                        <td><input value=${x.espanol_i}></td>
                        <td><input value=${x.ingles_i}></td>
                        <td><input value=${x.quimica_i}></td>
                        <td><input value=${x.informatica}></td>
                        <td><input value=${x.fisica_i}></td>
                        <td><input value=${x.biologia_i}></td>
                        <td><input value=${x.filosofia}></td>
                        <td><input value=${x.psicologia}></td>
                        <td><input value=${x.sociologia}></td>
                        <td><input value=${x.matematicas_ii}></td>
                        <td><input value=${x.espanol_ii}></td>
                        <td><input value=${x.ingles_ii}></td>
                        <td><input value=${x.quimica_ii}></td>
                        <td><input value=${x.fisica_ii}></td>
                        <td><input value=${x.biologia_ii}></td>
                        <td><input value=${x.lenguaje_art}></td>
                        <td><input value=${x.orientacion_voca}></td>
                        <td><input value=${x.historia_honduras}></td>
                        <td><input value=${x.educacion_fisica}></td>
                        <td><input value=${x.matematicas_iii}></td>
                        <td><input value=${x.lengua_literatura}></td>
                        <td><input value=${x.intro_economia}></td>
                        <td><input value=${x.fundameto_invest}></td>
                        <td><input value=${x.quimica_iii}></td>
                        <td><input value=${x.matematicas_iv}></td>
                        <td><input value=${x.ingles_iii}></td>
                        <td><input value=${x.logica_simbolica}></td>
                        <td><input value=${x.orient_edu_superior}></td>
                        <td><input value=${x.tic}></td>
                        <td><input value=${x.apreciacion_art}></td>
                        <td><input value=${x.fisica_iii}></td>
                        <td><input value=${x.lenguaje_pensamieto_critico}></td>
                        <td><input value=${x.antropologia}></td>
                        <td><input value=${x.histo_contemporanea}></td>
                        <td><input value=${x.edu_fisica_deporte_ii}></td>
                        <td><input value=${x.edu_ambiental}></td>
                        <td><input value=${x.diseno_proyect_cient}></td>
                        <td><input value=${x.fisica_iv}></td>
                        <td><input value=${x.biologia_human}></td>
                        <td><input value=${x.programacion}></td>
                        <td><input value=${x.ingles_iv}></td>
                        <td><input value=${x.dibujo_tecnico}></td>
                        <td><input value=${x.funda_etica_pro}></td>
                        <td>${promedio(x, 44, 6, 48)}</td>
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
            <th><p  class="vertical">Matemáticas III</p></th>
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
                <tbody >
                                
                    <tr id="${x.id_alumno}" onkeyup="updateCell(this.id,${x.id_btpae},5,11)">
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>
                        <td><input value=${x.matematicasiii}></td>
                        <td><input value=${x.lengua_literatura}></td>
                        <td><input value=${x.ingles_tiii}></td>
                        <td><input value=${x.orientacion_prof}></td>
                        <td><input value=${x.contabilidad_bai}></td>
                        <td><input value=${x.compotamiento_orga}></td>
                        <td><input value=${x.desarrolo_socioeco}></td>
                        <td><input value=${x.adminis_ge}></td>
                        <td><input value=${x.estadistica_admin_i}></td>
                        <td><input value=${x.desarrolo_cultura}></td>
                        <td><input value=${x.gestion_proyectos}></td>
                        <td><input value=${x.legislacion}></td>
                        <td><input value=${x.mercadotecnia}></td>
                        <td><input value=${x.organizacion_trabajo}></td>
                        <td><input value=${x.contabilidad_basic_ii}></td>
                        <td><input value=${x.contabilidad_sociedades}></td>
                        <td><input value=${x.metodologia_investiga}></td>
                        <td><input value=${x.proyectos_presu}></td>
                        <td><input value=${x.legislacion_mercanti}></td>
                        <td><input value=${x.contabilidad_costos}></td>
                        <td><input value=${x.investiga_mercados}></td>
                        <td><input value=${x.estadistica_admin_ii}></td>
                        <td><input value=${x.informmatica_adminis}></td>
                        <td>${promedio(x, 23, 6, 30)}</td>
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
                <tbody >
                                
                    <tr id="${x.id_alumno}" onkeyup="updateCell(this.id,${x.id_alumnocf},6,11)">
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>
                        <td> <input value=${x.matematica_aplicada}> </td>
                        <td> <input value=${x.ingles_tec}> </td>
                        <td> <input value=${x.lengua_literatura}> </td>
                        <td> <input value=${x.administra_general}> </td>
                        <td> <input value=${x.etica_orientacion}> </td>
                        <td> <input value=${x.contabilidad_i}> </td>
                        <td> <input value=${x.mercadotecnia}> </td>
                        <td> <input value=${x.legislacion_bancaria}> </td>
                        <td> <input value=${x.proyectos_presupuest}> </td>
                        <td> <input value=${x.organizacion_trabajo}> </td>
                        <td> <input value=${x.matematica_financiera}> </td>
                        <td> <input value=${x.contabilidad_ii}> </td>
                        <td> ${promedio(x, 12, 6, 18)} </td>
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
                <tbody  >
                                
                    <tr id="${x.id_alumno}" onkeyup="updateCell(this.id,${x.alumnoi},7,11)">
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>
                         
                        <td><input value= ${x.matematica_iii}> </td> 
                        <td> <input value= ${x.lengua_literatura}> </td> 
                        <td> <input value= ${x.informatica_i}> </td> 
                        <td> <input value= ${x.fisica_aplicada}> </td> 
                        <td> <input value= ${x.ingles_tecnico_iii}> </td> 
                        <td> <input value= ${x.analisis_diseno_i}> </td> 
                        <td> <input value= ${x.etica_orientacion}> </td> 
                        <td> <input value= ${x.lab_info}> </td> 
                        <td> <input value= ${x.frogramacion_i}> </td> 
                        <td> <input value= ${x.mercadotecnia}> </td> 
                        <td> <input value= ${x.organizacion_trabajo}> </td> 
                        <td> <input value= ${x.proyectos_presupuesto}> </td> 
                        <td> <input value= ${x.legislacion}> </td> 
                        <td> <input value= ${x.lab_info_ii}> </td> 
                        <td> <input value= ${x.informatica_ii}> </td> 
                        <td> <input value= ${x.programacion_ii}> </td> 
                        <td> <input value= ${x.analisis_diseno_ii}> </td>
                        <td> ${promedio(x, 17, 6, 23)} </td>
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
                <tbody  >
                                
                    <tr id="${x.id_alumno}" onkeyup="updateCell(this.id,${x.alumnoae_ii},5,12)">
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>
                        <td><input value= ${x.gestion_talent_humano_i}> </td>  
                        <td> <input value=${x.higiene_segurudad_indus}> </td>  
                        <td> <input value=${x.administracion_produc}> </td>  
                        <td> <input value=${x.planeacion_estrategica}> </td>  
                        <td> <input value=${x.mercadotecnia_apli_servicios}> </td>  
                        <td> <input value=${x.matematica_finan}> </td>  
                        <td> <input value=${x.gestion_presupuestaria}> </td>  
                        <td> <input value=${x.mercadotecnia_internacional}> </td>  
                        <td> <input value=${x.administracion_recursos_finan}> </td>  
                        <td> <input value=${x.gestion_talent_humano_ii}> </td>  
                        <td> <input value=${x.gestio_instituciones}> </td>  
                        <td> <input value=${x.administracion_ventas}> </td>  
                        <td> <input value=${x.auditoria}> </td> 
                        <td> ${promedio(x, 13, 6, 19)} </td>   
                
                    </tr>
                    </tbody>`

        });
    }
    // contaduria y finanzas 12
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
                <tbody  >
                                
                    <tr  id="${x.id_alumno}" onkeyup="updateCell(this.id,${x.alumnocf_ii},6,12)">
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>                   
                        <td><input value =${x.economiai}> </td>
                        <td> <input value =${x.legislacion}></td>
                        <td> <input value =${x.operaciones_tributa}> </td>  
                        <td> <input value =${x.contabilidad_bancaria}> </td>  
                        <td> <input value =${x.administracion_finan_i}> </td>  
                        <td> <input value =${x.informatica_contable}> </td>  
                        <td> <input value =${x.administracion_finan_ii}> </td>  
                        <td> <input value =${x.servicio_cliente}> </td>  
                        <td> <input value =${x.contabilidad_costos}> </td>  
                        <td> <input value =${x.auditoria}> </td> 
                        <td> ${promedio(x, 10, 6, 19)} </td>   
                
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
                <tbody >
                                
                    <tr  id="${x.id_alumno}" onkeyup="updateCell(this.id,${x.alumnoi_ii},7,12)">
                        <td> ${x.id_alumno}</td>
                        <td>${x.nombre_alumno} </td>
                        <td> ${x.apellido_alumno}</td>            
                        <td><input value=${x.lab_info_iii}> </td>
                        <td> <input value=${x.programacion_iii}></td>
                        <td> <input value=${x.mantenimiento_repa_i}> </td>  
                        <td> <input value=${x.redes_informatica_i}> </td>  
                        <td> <input value=${x.diseno_web_i}> </td>  
                        <td> <input value=${x.lab_info_iv}> </td>  
                        <td> <input value=${x.diseno_web_ii}> </td>  
                        <td> <input value=${x.programacion_iv}> </td>  
                        <td> <input value=${x.mantenimiento_repa_ii}> </td>  
                        <td> <input value=${x.redes_informatica_ii}> </td> 
                        <td> ${promedio(x, 10, 6, 19)} </td>   
                
                    </tr>
                    </tbody>`

        });
    }
};


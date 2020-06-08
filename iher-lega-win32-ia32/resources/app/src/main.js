
const path = require('path')
const fs = require('fs')
let pdf = require('html-pdf');







const { BrowserWindow, Notification, dialog } = require('electron');
// requiero la conexion a la db para hacer consultas
const { getConnection } = require('./database')


// esta funcion tse conecta con el frontend y la manda a ejecuar alla se le pasa el objeto alumno
async function createAlumno(alumno) {

    try {
        const conn = await getConnection();
        // le vamos a insertar la hora para saber cual fue la ultima query
        const result = await conn.query('INSERT INTO alumno SET ?', alumno)


        new Notification({
            title: 'IHER MANAGER',
            body: 'SE HA GUARDADO EL DATO SATISFACTORIAMENTE'

        }).show();

        saveAlumnoInNotas(alumno.modalidad_alumno, alumno.grado_alumno)
        return result;

    } catch (err) {
        console.log(err)
    };
}


async function getAlumno() {
    const conn = await getConnection();
    try {
        const result = await conn.query('SELECT * FROM alumno ORDER BY ide_alumno DESC LIMIT 10');


        return result;
    } catch (error) {
        console.log(error);
    }

}

async function getTablas(grado, modalidad, year) {

    try {

        const conn = await getConnection();

        const m = 'SELECT alumno.id_alumno,alumno.apellido_alumno,alumno.nombre_alumno,alumno.sexo_alumno,alumno.nacimiento_alumno,alumno.grado_alumno,alumno.modalidad_alumno,alumno.padre_alumno,alumno.domicilio_alumno,alumno_telefono,modalidad.modalidad_alumno,ano FROM alumno INNER JOIN modalidad ON alumno.modalidad_alumno = modalidad.id_modalidad  WHERE grado_alumno =? AND modalidad.id_modalidad = ? AND ano=?';

        const result = await conn.query(m, [grado, modalidad, year]);


        return result;

    } catch (error) {
        console.log(error);
    }


}

let window

function createWindow() {
    window = new BrowserWindow({
        width: 1440,
        height: 900,
        webPreferences: {
            nodeIntegration: true

        },

        frame: true


    })

    // window.removeMenu()

    window.loadFile(__dirname + '/ui/index.html')

}

// tablas 

async function deleteAlumno(id) {
    const conn = await getConnection();
    const result = await conn.query('DELETE FROM alumno WHERE id_alumno = ?', id);
    console.log(result);
    new Notification({
        title: 'IHER LEGA',
        body: 'SE HA ELIMINADO EL DATO SATISFACTORIAMENTE'
    }).show();
    return result;
}
// se utiliza en buscar por id la cree para agregar un parametro mas y no afectar otras funcionalidades 
async function getthinkByIdAndYear(id, year) {
    try {
        const conn = await getConnection();
        const result = await conn.query('SELECT alumno.id_alumno,alumno.apellido_alumno,alumno.nombre_alumno,alumno.sexo_alumno,alumno.nacimiento_alumno,alumno.grado_alumno,alumno_telefono,alumno.modalidad_alumno,alumno.padre_alumno,alumno.domicilio_alumno,alumno.ano FROM alumno INNER JOIN modalidad ON alumno.modalidad_alumno = modalidad.id_modalidad WHERE id_alumno = ? AND ano=?', [id, year]);
        return result[0];
    } catch (error) {
        console.log(error)
    }
}

async function getthinkById(id) {
    try {
        const conn = await getConnection();
        const result = await conn.query('SELECT alumno.id_alumno,alumno.apellido_alumno,alumno.nombre_alumno,alumno.sexo_alumno,alumno.nacimiento_alumno,alumno.grado_alumno,alumno_telefono,alumno.modalidad_alumno,alumno.padre_alumno,alumno.domicilio_alumno,alumno.ano FROM alumno INNER JOIN modalidad ON alumno.modalidad_alumno = modalidad.id_modalidad WHERE id_alumno = ?', id);
        return result[0];
    } catch (error) {
        console.log(error);
    }


}

async function updateAlumno(alumno, id) {
    try {
        const conn = await getConnection();
        const result = await conn.query('UPDATE alumno SET ? WHERE id_alumno = ?', [alumno, id]);
        new Notification({
            title: 'IHER LEGA',
            body: 'SE HA MODIFICADO EL DATO SATISFACTORIAMENTE'
        }).show();
        return result;
    } catch (error) {
        console.log(error)
    }

}



// crear alumno ascendido
async function AlumnoAscendido(alumno, grado, modalidad) {

    const conn = await getConnection();

    const alumnoNuevo = await getthinkById(alumno)


    alumnoNuevo.grado_alumno = grado;
    alumnoNuevo.modalidad_alumno = modalidad;
    const date = new Date;
    alumnoNuevo.ano = date.getFullYear(4) + 1
    alumnoNuevo.ide_alumno = 0;

    createAlumno(alumnoNuevo)



}

// ver notas 

async function getNotas(g, m, year) {
    try {
        const conn = await getConnection();

        if (g < 10) {
            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,n.id_nota,a.ano, n.matematicas,
             n.espanol,n.ingles,n.educacionart,n.tecnologia,n.cienciasnaturales,n.estudios_sociales,n.educacion_civica,
            n.educacion_fisicay_deportes FROM cole.notas AS n INNER JOIN cole.alumno AS a ON n.id_nota =a.ide_alumno where a.grado_alumno =? AND a.modalidad_alumno = ? AND a.ano =?`, [g, m, year]);



            return nota;
        } if (g == 10 & m == 2) {
            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,a.ano,an.alumno,
            an.matematicasi, an.biologiai, an.psicologia, an.informatica, an.quimicai,an.espanol,an.sociologia,an.fisicai,
            an.inglesi,an.filosofia,an.matematicasii,an.historia_honduras,an.biologiaii,an.quimicaii,an.espanolii,an.inglesii,
            an.orientacion_vo,an.fisicaii,an.lenguaje_art,an.educacion_fisica FROM cole.anofundamento as an INNER JOIN cole.alumno AS a ON an.alumno =a.ide_alumno WHERE a.grado_alumno =? AND a.modalidad_alumno = ?
            `, [g, m])
            console.log(nota)

            return nota;
        }
        // bch
        if (g == 11 & m == 3) {

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,a.ano,
            bc.id_bch,bc.matematicas_iii,bc.quimica_iii,bc.lengua_literatu,bc.edu_fisica,bc.ingles_iii,bc.fun_inves_social,bc.fisica_iii,bc.logica_simbol,bc.orientac_edu_superior,bc.
            apreciacion_art,bc.tic,bc.matematicas_iv,bc.biologia_humana,bc.leng_pensamien_critico,bc.fisica_iv,bc.ingles_iv,bc.historia_contep,bc.antropologia,bc.fundament_etica_profecinal,bc.dibujo_tecnico,bc.
            edu_ambiental,bc.diseno_proyectos_ci,bc.intro_programacion,bc.intro_economia
            FROM cole.bch AS bc INNER JOIN cole.alumno AS a ON bc.id_bch =a.ide_alumno WHERE a.grado_alumno =? AND a.modalidad_alumno = ?
            `, [g, m])
            console.log(nota)
            return nota;
        }
        // bcgac
        if (g == 11 & m == 4) {

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,a.ano,
            ac.id_bchac, ac.matematicas_i, ac.espanol_i,ac.ingles_i,ac.quimica_i, ac.informatica, ac.fisica_i,ac.biologia_i,ac.filosofia, ac.psicologia,
            ac.sociologia, ac.matematicas_ii, ac.espanol_ii, ac.ingles_ii,    ac.quimica_ii,ac.fisica_ii, ac.biologia_ii,
            ac.lenguaje_art, ac.orientacion_voca,ac.historia_honduras,ac.educacion_fisica,ac.matematicas_iii, ac.lengua_literatura,ac.intro_economia,ac.fundameto_invest,
            ac.quimica_iii,ac.matematicas_iv,ac.ingles_iii, ac.logica_simbolica,ac.orient_edu_superior,ac.tic,ac.apreciacion_art,ac.fisica_iii,
            ac.lenguaje_pensamieto_critico,ac.antropologia, ac.histo_contemporanea,ac.edu_fisica_deporte_ii,ac.edu_ambiental,
            ac.diseno_proyect_cient,ac.fisica_iv,ac.biologia_human,ac.programacion,ac.ingles_iv, ac.dibujo_tecnico,ac.funda_etica_pro
         FROM cole.bchac AS ac INNER JOIN cole.alumno AS a ON ac.id_bchac =a.ide_alumno WHERE a.grado_alumno =? AND a.modalidad_alumno = ?
            `, [g, m])
            console.log(nota)
            return nota;
        }
        // btpae
        if (g == 11 & m == 5) {

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,a.ano,
            ac.id_btpae,   ac.matematicasiii, ac.lengua_literatura,ac.ingles_tiii,ac.orientacion_prof,
            ac.contabilidad_bai,ac.compotamiento_orga,ac.desarrolo_socioeco,ac.adminis_ge,ac.estadistica_admin_i,
            ac.desarrolo_cultura,ac.gestion_proyectos,ac.legislacion,ac.mercadotecnia,ac.organizacion_trabajo,ac.contabilidad_basic_ii,
            ac.contabilidad_sociedades,ac.metodologia_investiga,
            ac.proyectos_presu,ac.legislacion_mercanti,ac.contabilidad_costos,ac.investiga_mercados,ac.estadistica_admin_ii,ac.informmatica_adminis
            FROM cole.btpae AS ac INNER JOIN cole.alumno AS a ON ac.id_btpae =a.ide_alumno WHERE a.grado_alumno =? AND a.modalidad_alumno = ?
            `, [g, m])
            console.log(nota)
            return nota;
        }
        // btpcf
        if (g == 11 & m == 6) {

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,a.ano,
             cf.id_alumnocf ,cf.matematica_aplicada ,cf.ingles_tec ,cf.lengua_literatura ,cf.administra_general ,
            cf.etica_orientacion ,cf.contabilidad_i ,cf.mercadotecnia ,cf.legislacion_bancaria ,cf.proyectos_presupuest ,
            cf.organizacion_trabajo ,cf.matematica_financiera ,cf.contabilidad_ii 
            FROM cole.btpcf AS cf INNER JOIN cole.alumno AS a ON cf.id_alumnocf =a.ide_alumno WHERE a.grado_alumno =? AND a.modalidad_alumno = ?
            `, [g, m])
            console.log(nota)
            return nota;
        }

        if (g == 11 & m == 7) {

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,a.ano,
             i.alumnoi,i.matematica_iii,i.lengua_literatura,i.informatica_i,i.fisica_aplicada,i.ingles_tecnico_iii,
             i.analisis_diseno_i,i.etica_orientacion,i.lab_info,i.frogramacion_i,i.mercadotecnia,i.organizacion_trabajo,i.proyectos_presupuesto,i.legislacion,
             i.lab_info_ii,i.informatica_ii,i.programacion_ii,i.analisis_diseno_ii
            FROM cole.btpi AS i INNER JOIN cole.alumno AS a ON i.alumnoi =a.ide_alumno WHERE a.grado_alumno =? AND a.modalidad_alumno = ?
            `, [g, m])
            console.log(nota)
            return nota;
        }
        // 12 de admin empresas
        if (g == 12 & m == 5) {

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,a.ano,
            aeii.alumnoae_ii,aeii.gestion_talent_humano_i,aeii.higiene_segurudad_indus,aeii.administracion_produc,aeii.planeacion_estrategica,aeii.mercadotecnia_apli_servicios,aeii.
            matematica_finan,aeii.gestion_presupuestaria,aeii.mercadotecnia_internacional,aeii.administracion_recursos_finan,aeii.gestion_talent_humano_ii,aeii.
            gestio_instituciones,aeii.administracion_ventas,aeii.auditoria
            FROM cole.btpae_ii AS aeii INNER JOIN cole.alumno AS a ON aeii.alumnoae_ii =a.ide_alumno WHERE a.grado_alumno =? AND a.modalidad_alumno = ?
            `, [g, m])
            console.log(nota)
            return nota;
        }

        // 12 de cont finanzas
        if (g == 12 & m == 6) {

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,a.ano,
            cfii.alumnocf_ii,cfii.economiai,cfii.legislacion,cfii.operaciones_tributa,cfii.contabilidad_bancaria,cfii.administracion_finan_i,cfii.
             informatica_contable,cfii.administracion_finan_ii,cfii.servicio_cliente,cfii.contabilidad_costos,cfii.auditoria
             FROM cole.btpcf_ii AS cfii INNER JOIN cole.alumno AS a ON cfii.alumnocf_ii =a.ide_alumno WHERE a.grado_alumno =? AND a.modalidad_alumno = ?
            `, [g, m])
            console.log(nota)
            return nota;
        }
        // informatica 12
        if (g == 12 & m == 7) {

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,a.ano,
            i_ii.alumnoi_ii,i_ii.lab_info_iii,i_ii.programacion_iii,i_ii.mantenimiento_repa_i,i_ii.redes_informatica_i,
            i_ii.diseno_web_i,i_ii.lab_info_iv,i_ii.diseno_web_ii,i_ii.programacion_iv,i_ii.mantenimiento_repa_ii,
            i_ii.redes_informatica_ii
            FROM cole.btpi_ii AS i_ii INNER JOIN cole.alumno AS a ON i_ii.alumnoi_ii =a.ide_alumno WHERE a.grado_alumno =? AND a.modalidad_alumno = ?
            `, [g, m])
            console.log(nota)
            return nota;
        }

    } catch (error) {
        console.log(error)
    }

}



// agregamos el id alumno a notas  cuando se matricula un alumno
async function saveAlumnoInNotas(modalidad, grado) {
    try {

        const conn = await getConnection();

        if (modalidad == 1) {
            await conn.query('INSERT INTO notas(id_nota) SELECT Max(ide_alumno) FROM alumno')
        }

        if (modalidad == 2) {
            await conn.query('INSERT INTO anofundamento(alumno) SELECT Max(ide_alumno) FROM alumno')
        }

        if (modalidad == 3) {
            await conn.query('INSERT INTO bch(id_bch) SELECT Max(ide_alumno) FROM alumno')
        }
        if (modalidad == 4) {
            await conn.query('INSERT INTO bchac(id_bchac) SELECT Max(ide_alumno) FROM alumno')
        }
        // filtrar alumnos de 11 y 12
        if (modalidad == 5 & grado == 11) {
            await conn.query('INSERT INTO btpae(id_btpae) SELECT Max(ide_alumno) FROM alumno')
        }

        if (modalidad == 6 & grado == 11) {
            await conn.query('INSERT INTO btpcf(id_alumnocf) SELECT Max(ide_alumno) FROM alumno')
        }
        if (modalidad == 7 & grado == 11) {
            await conn.query('INSERT INTO btpi(alumnoi) SELECT Max(ide_alumno) FROM alumno')
        }

        if (modalidad == 5 & grado == 12) {
            await conn.query('INSERT INTO btpae_ii(alumnoae_ii) SELECT Max(ide_alumno) FROM alumno')
        }

        if (modalidad == 6 & grado == 12) {
            await conn.query('INSERT INTO btpcf_ii(alumnocf_ii) SELECT Max(ide_alumno) FROM alumno')
        }
        if (modalidad == 7 & grado == 12) {
            await conn.query('INSERT INTO btpi_ii(alumnoi_ii) SELECT Max(ide_alumno) FROM alumno')
        }


    } catch (error) {
        console.log(error);
    }

}



// asignar notas 
async function updateNotas(notas, modalidad, grado, idNota) {
    const conn = await getConnection();

    // validamos en que grado esta para guardar notas en su respectiva tabla
    if (modalidad == 1) {

        conn.query('UPDATE notas SET ? WHERE id_nota=?', [notas, idNota])
        console.log('basica')
    }

    if (modalidad == 2) {

        conn.query('UPDATE anofundamento SET ? WHERE alumno=?', [notas, idNota])
        console.log('decimo')
    }

    if (modalidad == 3) {

        conn.query('UPDATE bch SET ? WHERE id_bch=?', [notas, idNota])
        console.log('bch')
    }

    if (modalidad == 4) {

        conn.query('UPDATE bchac SET ? WHERE id_bchac=?', [notas, idNota])
    }

    if (modalidad == 5 && grado == 11) {

        conn.query('UPDATE btpae SET ? WHERE id_btpae=?', [notas, idNota])
    }

    if (modalidad == 6 && grado == 11) {

        conn.query('UPDATE btpcf SET ? WHERE id_alumnocf=?', [notas, idNota])
    }
    // informatica insertar notas de /asignar notas
    if (modalidad == 7 && grado == 11) {

        conn.query('UPDATE btpi SET ? WHERE alumnoi=?', [notas, idNota])
    }

    if (modalidad == 5 && grado == 12) {

        conn.query('UPDATE btpae_ii SET ? WHERE alumnoae_ii=?', [notas, idNota])
    }

    if (modalidad == 6 && grado == 12) {

        conn.query('UPDATE btpcf_ii SET ? WHERE alumnocf_ii=?', [notas, idNota])
    }

    if (modalidad == 7 && grado == 12) {

        conn.query('UPDATE btpi_ii SET ? WHERE alumnoi_ii=?', [notas, idNota])
    }


}





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
// crear boletas de html-pdf ...  
async function boleta(g, m, year, seme) {

    if (seme == 1) {
        sB = 'Primero'
    } else {
        sB = 'Segundo'
    }

    const nota = await getNotas(g, m, year)

    let contenido;

    if (g <= 9) {
        for (const notas of nota) {

            contenido = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../bootstrap.min.css">
            <title>Document</title>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-6 ">
                        <div style="line-height: 0.6rem;" class="font-weight-bold">
                            <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                            <div class="text-center ml-0 mr-5">
                                <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                <p class="">BOLETA DE CALIFICACIONES</p>
                                <h6 class="" >Santa Rita,Copán</h6>
                            </div>
                           
                        </div>
        
                        <div class="font-weight-bold">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">${notas.nombre_alumno} &nbsp ${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp${notas.id_alumno} </span> </p>
                            <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                        </div>
        
                        <div>
                            <table class="tbl table-bordered">
                                <thead>
                                    <th class="pl-5 pr-5" style="column-count: 2;">
                                        ASIGNATURAS
                                    </th>
                                    <th class="w-25"></th>
                                </thead>
                                <tbody class="text-uppercase">
                                   
                                    <tr > <td>Español</td> 
                                    <td id="espanol">${notas.espanol}</td>
                                    </tr>
                                    <tr> <td>Ingles</td><td id="ingles">${notas.ingles}</td></tr>
                                    <tr> <td>Educación Artistísca</td><td id="art">${notas.educacionart}</td> </tr>
                                    <tr><td>Matemáticas</td> <td id="mat">${notas.matematicas}</td> </tr>
                                    <tr> <td>Tecnología</td><td id="tec">${notas.tecnologia}</td></tr>
                                    <tr><td>Ciencias Naturales</td><td id="cn">${notas.cienciasnaturales}</td></tr>
                                    <tr> <td>Estudios Sociales</td><td id="es">${notas.estudios_sociales}</td></tr>
                                    <tr> <td>Educación Cívica</td><td id="ec">${notas.educacion_civica}</td></tr>
                                    <tr><td>Educación Fisica y Deportes</td><td id="fd">${notas.educacion_fisicay_deportes}</td> </tr>   
                                        
                                </tbody>
                            </table>
        
                            <div class="mt-4 ml-4  " style="line-height: 0.6rem;">
                                <p>____________________________________</p>
                                <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                <p class="pl-5">DIRECTOR IHER</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div >
                            <img class="ml-5"  src="logo.jpg" alt="logo">
                        </div>
                        <div class="" style="margin-top: 3.4rem;">
                            <table class="tbl table-bordered w-75">
                                <thead>
                                    <th class="text-center">
                                       Firma del Facilitador
                                    </th>
                                    <th  >Observaciones</th>
                                </thead>
                                <tbody class="text-uppercase ">
                                   
                                    <tr > <td  style="height: 1.59rem;"></td> 
                                    <td  ></td>
                                    </tr>
                                    <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr> <td  style="height: 1.59rem;">  </td><td ></td> </tr>
                                    <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                    <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr> <td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr> <td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td> </tr>   
                                        
                                </tbody>
                            </table>
        
                            <div class="mt-4 ml-4  " style="line-height: 0.6rem;">
                                <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                <div style="text-align: end;width: 75%;">
                                    <p >Cel. 97253836 </p>
                                    <p >ihersantarita@gmail.com</p>
                                    <p >https://iherpega.blogspot.com/
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
             <script src="../js/pdfbolet.js"></script>
         </body>
        </html>`;

            genePdf(contenido, notas.nombre_alumno, notas.grado_alumno)
        }
    }
    if (g == 10) {
        for (const notas of nota) {
            let seconS = `  <tr>   <td>Matemáticas II</td><td>${notas.matematicasii}</td></tr>
            <tr> <td>Historia de Honduras</td><td>${notas.historia_honduras}</td></tr>
            <tr><td>Biología II</td> <td>${notas.biologiaii}</td></tr>
            <tr> <td>Química II</td><td>${notas.quimicaii}</td></tr>
            <tr><td>Español II</td> <td>${notas.espanolii}</td></tr>
            <tr>  <td>Inglés II</td><td>${notas.inglesii}</td></tr>
            <tr><td> Orientación Vocacional</td> <td>${notas.orientacion_vo}</td></tr>
            <tr><td> Física II</td> <td>${notas.fisicaii}</td></tr>
            <tr> <td> Lenguaje Artístisco</td><td>${notas.lenguaje_art}</td></tr>
            <tr><td> Educación Física</td> <td>${notas.educacion_fisica}</td></tr>    
                  `
            let firsS = `  
            <tr> <td>Matemáticas I</td> <td>${notas.matematicasi}</td></tr>
            <tr> <td>Biología I</td><td>${notas.biologiai}</td></tr>
            <tr> <td>Psicología</td><td>${notas.psicologia}</td></tr>
            <tr> <td>Informática</td><td>${notas.informatica}</td></tr>
            <tr> <td>Química I</td><td>${notas.quimicai}</td></tr>
            <tr> <td>Español</td><td>${notas.espanol}</td></tr>
            <tr> <td>Sociología</td><td>${notas.sociologia}</td></tr>
            <tr>  <td>Física I</td><td>${notas.fisicai}</td></tr>
            <tr> <td>Inglés I</td><td>${notas.inglesi}</td></tr>
            <tr> <td>Filosofía</td><td>${notas.filosofia}</td></tr>
          `
            console.log(notas)
            if (seme == 1) {
                semestre = firsS
                contenido = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="../bootstrap.min.css">
                <title>Document</title>
            </head>
            <body>
                <div class="container">
                    <div class="row">
                        <div class="col-6 ">
                            <div style="line-height: 0.6rem;" class="font-weight-bold">
                                <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                                <div class="text-center ml-0 mr-5">
                                    <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                    <p class="">BOLETA DE CALIFICACIONES</p>
                                    <h6 class="" >Santa Rita,Copán</h6>
                                </div>
                               
                            </div>
            
                            <div class="font-weight-bold">
                                <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;"> &nbsp${notas.nombre_alumno} &nbsp${notas.apellido_alumno} </span> </p>
                                <div class="row pl-3">
                                    <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp${notas.grado_alumno}°</span></p>
                                    <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                                </div>
                                <p>Registro:<span id="registro" style="text-decoration: underline;">${notas.id_alumno}</span> </p>
                                <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                            </div>
            
                            <div>
                                <table class="tbl table-bordered">
                                    <thead>
                                        <th class="pl-5 pr-5" style="column-count: 2;">
                                            ASIGNATURAS
                                        </th>
                                        <th class="w-25"></th>
                                    </thead>
                                    <tbody class="text-uppercase">
                                        ${semestre} 
                                                
                                          
                                    </tbody>
                                </table>
            
                                <div class="mt-4 ml-4  " style="line-height: 0.6rem;">
                                    <p>____________________________________</p>
                                    <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                    <p class="pl-5">DIRECTOR IHER</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div >
                                <img class="ml-5"  src="logo.jpg" alt="logo">
                            </div>
                            <div class="" style="margin-top: 3.3rem;">
                                <table   class="tbl table-bordered w-75">
                                    <thead>
                                        <th class="text-center">
                                           Firma del Facilitador
                                        </th>
                                        <th  >Observaciones</th>
                                    </thead>
                                    <tbody class="text-uppercase ">
                                       
                                        <tr > <td  style="height: 1.59rem;"></td> 
                                        <td  ></td>
                                        </tr>
                                        <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                        <tr> <td  style="height: 1.59rem;">  </td><td ></td> </tr>
                                        <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                        <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                        <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                        <tr> <td  style="height: 1.59rem;">  </td><td ></td></tr>
                                        <tr> <td  style="height: 1.59rem;">  </td><td ></td></tr>
                                        <tr><td  style="height: 1.59rem;">  </td><td ></td> </tr>   
                                        <tr><td  style="height: 1.59rem;"></td><td ></td></tr>
                                           
                                    </tbody>
                                </table>
            
                                <div class="mt-4 ml-4  " style="line-height: 0.6rem;">
                                    <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                    <div style="text-align: end;width: 75%;">
                                        <p >Cel. 97253836 </p>
                                        <p >ihersantarita@gmail.com</p>
                                        <p >https://iherpega.blogspot.com/
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                    </div>
                </div>
                 <script src="../js/pdfbolet.js"></script>
             </body>
            </html>`;

                genePdf(contenido, notas.nombre_alumno)
            } else {
                semestre = seconS
                contenido = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="../bootstrap.min.css">
                <title>Document</title>
            </head>
            <body>
                <div class="container">
                    <div class="row">
                        <div class="col-6 ">
                            <div style="line-height: 0.6rem;" class="font-weight-bold">
                                <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                                <div class="text-center ml-0 mr-5">
                                    <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                    <p class="">BOLETA DE CALIFICACIONES</p>
                                    <h6 class="" >Santa Rita,Copán</h6>
                                </div>
                               
                            </div>
            
                            <div class="font-weight-bold">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;"> &nbsp${notas.nombre_alumno} &nbsp${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <p>Registro:<span id="registro" style="text-decoration: underline;">${notas.id_alumno}</span> </p>
                                <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                            </div>
            
                            <div>
                                <table class="tbl table-bordered">
                                    <thead>
                                        <th class="pl-5 pr-5" style="column-count: 2;">
                                            ASIGNATURAS
                                        </th>
                                        <th class="w-25"></th>
                                    </thead>
                                    <tbody class="text-uppercase">
                                        ${semestre} 
                                                
                                          
                                    </tbody>
                                </table>
            
                                <div class="mt-4 ml-4  " style="line-height: 0.6rem;">
                                    <p>____________________________________</p>
                                    <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                    <p class="pl-5">DIRECTOR IHER</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div >
                                <img class="ml-5"  src="logo.jpg" alt="logo">
                            </div>
                            <div class="" style="margin-top: 1rem;">
                                <table class="tbl table-bordered w-75">
                                    <thead>
                                        <th class="text-center">
                                           Firma del Facilitador
                                        </th>
                                        <th  >Observaciones</th>
                                    </thead>
                                    <tbody class="text-uppercase ">
                                       
                                        <tr > <td  style="height: 1.59rem;"></td> 
                                        <td  ></td>
                                        </tr>
                                        <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                        <tr> <td  style="height: 1.59rem;">  </td><td ></td> </tr>
                                        <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                        <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                        <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                        <tr> <td  style="height: 1.59rem;">  </td><td ></td></tr>
                                        <tr> <td  style="height: 1.59rem;">  </td><td ></td></tr>
                                        <tr><td  style="height: 1.59rem;">  </td><td ></td> </tr>   
                                        <tr><td  style="height: 1.59rem;"></td><td ></td></tr>
                                           
                                    </tbody>
                                </table>
            
                                <div class="mt-4 ml-4  " style="line-height: 0.6rem;">
                                    <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                    <div style="text-align: end;width: 75%;">
                                        <p >Cel. 97253836 </p>
                                        <p >ihersantarita@gmail.com</p>
                                        <p >https://iherpega.blogspot.com/
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                    </div>
                </div>
                 <script src="../js/pdfbolet.js"></script>
             </body>
            </html>`;

                genePdf(contenido, notas.nombre_alumno)
            }

        }
    }

    if (g == 11 && m == 3) {

        for (const notas of nota) {
            let seconS = `<tr><td> Matemáticas IV 	</td> <td>${notas.matematicas_iv}</td><tr/>
            <tr>  <td>Biología Humana</td> <td>${notas.biologia_humana}</td><tr/>
            <tr>  <td> Lenguaje y Pensamiento Crítico</td> <td>${notas.leng_pensamien_critico}</td><tr/>
            <tr>  <td> Física IV	</td> <td> ${notas.fisica_iv}</td><tr/>
             <tr>  <td> Inglés IV	</td><td> ${notas.ingles_iv}</td><tr/>
             <tr>  <td> Historia Contemporánea</td><td> ${notas.historia_contep}</td><tr/>
            <tr>  <td> Antropología 	</td><td> ${notas.antropologia}</td><tr/>
             <tr>  <td> Fundamento de Etica Profesional	</td><td> ${notas.fundament_etica_profecinal}</td><tr/>
            <tr>  <td>Dibujo Técnico	</td><td> ${notas.dibujo_tecnico}</td><tr/>
            <tr>  <td> Educación Ambienta	</td><td> ${notas.edu_ambiental}</td><tr/>
             <tr>  <td> Diseño de Proyectos Científicos 	</td><td> ${notas.diseno_proyectos_ci}</td> <tr/>
            <tr>  <td> Introduccion a la Programación </td><td> ${notas.intro_programacion}</td>	<tr/>`

            let firsS = `<tr><td> Matemáticas III 	</td> <td>${notas.matematicas_iii}</td><tr/>
            <tr>  <td>Química III</td> <td>${notas.quimica_iii}</td><tr/>
            <tr>  <td> Lengua y Literatura		</td> <td>${notas.lengua_literatu}</td><tr/>
            <tr>  <td> Educación Física	</td> <td> ${notas.edu_fisica}</td><tr/>
             <tr>  <td> Inglés III	</td><td> ${notas.ingles_iii}</td><tr/>
             <tr>  <td> Fundamentos de la Invest. Social</td><td> ${notas.fun_inves_social}</td><tr/>
            <tr>  <td> Física III 	</td><td> ${notas.fisica_iii}</td><tr/>
             <tr>  <td> Lógica Simbólica	</td><td> ${notas.logica_simbol}</td><tr/>
            <tr>  <td> Orientacion a la Educ. Superior 	</td><td> ${notas.orientac_edu_superior}</td><tr/>
            <tr>  <td> Aprecación Artística 	</td><td> ${notas.apreciacion_art}</td><tr/>
             <tr>  <td> Introducción a la Economía 	</td><td> ${notas.intro_economia}</td> <tr/>
            <tr>  <td> Tec. de la Info. y Comunicación </td><td> ${notas.tic}</td>	<tr/>`

            if (seme == 1) {
                semestre = firsS
                contenido = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="../bootstrap.min.css">
                <title>Document</title>
            </head>
            <body>
                <div class="container">
                    <div class="row">
                        <div class="col-6 ">
                            <div style="line-height: 0.6rem;" class="font-weight-bold">
                                <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                                <div class="text-center ml-0 mr-5">
                                    <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                    <p class="">BOLETA DE CALIFICACIONES</p>
                                    <h6 class="" >Santa Rita,Copán</h6>
                                </div>
                               
                            </div>
            
                            <div class="font-weight-bold">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">${notas.nombre_alumno} &nbsp ${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp ${notas.id_alumno}</span> </p>
                            <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                        </div>
            
                            <div>
                                <table class="tbl table-bordered">
                                    <thead>
                                        <th class="pl-5 pr-5" style="column-count: 2;">
                                            ASIGNATURAS
                                        </th>
                                        <th class="w-25"></th>
                                    </thead>
                                    <tbody class="text-uppercase">
                                        ${semestre} 
                                                
                                          
                                    </tbody>
                                </table>
            
                                <div class="mt-4 ml-4  " style="line-height: 0.6rem;">
                                    <p>____________________________________</p>
                                    <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                    <p class="pl-5">DIRECTOR IHER</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div >
                                <img class="ml-5"  src="logo.jpg" alt="logo">
                            </div>
                            <div class="" style="margin-top: 1rem;">
                                <table class="tbl table-bordered w-75">
                                    <thead>
                                        <th class="text-center">
                                           Firma del Facilitador
                                        </th>
                                        <th  >Observaciones</th>
                                    </thead>
                                    <tbody class="text-uppercase ">
                                       
                                        <tr > <td  style="height: 1.59rem;"></td> 
                                        <td  ></td>
                                        </tr>
                                        <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                        <tr> <td  style="height: 1.59rem;">  </td><td ></td> </tr>
                                        <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                        <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                        <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                        <tr> <td  style="height: 1.59rem;">  </td><td ></td></tr>
                                        <tr> <td  style="height: 1.59rem;">  </td><td ></td></tr>
                                        <tr><td  style="height: 1.59rem;">  </td><td ></td> </tr>   
                                        <tr><td  style="height: 1.59rem;"></td><td ></td></tr>
                                        <tr><td  style="height: 1.59rem;"></td><td ></td></tr>
                                        <tr><td  style="height: 1.59rem;"></td><td ></td></tr>
                                           
                                    </tbody>
                                </table>
            
                                <div class="mt-4 ml-4  " style="line-height: 0.6rem;">
                                    <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                    <div style="text-align: end;width: 75%;">
                                        <p >Cel. 97253836 </p>
                                        <p >ihersantarita@gmail.com</p>
                                        <p >https://iherpega.blogspot.com/
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                    </div>
                </div>
                 <script src="../js/pdfbolet.js"></script>
             </body>
            </html>`;

                genePdf(contenido, notas.nombre_alumno)
            } else {
                semestre = seconS
                contenido = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="../bootstrap.min.css">
                <title>Document</title>
            </head>
            <body>
                <div class="container">
                    <div class="row">
                        <div class="col-6 ">
                            <div style="line-height: 0.6rem;" class="font-weight-bold">
                                <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                                <div class="text-center ml-0 mr-5">
                                    <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                    <p class="">BOLETA DE CALIFICACIONES</p>
                                    <h6 class="" >Santa Rita,Copán</h6>
                                </div>
                               
                            </div>
            
                            <div class="font-weight-bold">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">${notas.nombre_alumno} &nbsp ${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp ${notas.id_alumno}</span> </p>
                            <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                        </div>
            
                            <div>
                                <table class="tbl table-bordered">
                                    <thead>
                                        <th class="pl-5 pr-5" style="column-count: 2;">
                                            ASIGNATURAS
                                        </th>
                                        <th class="w-25"></th>
                                    </thead>
                                    <tbody class="text-uppercase">
                                        ${semestre} 
                                                
                                          
                                    </tbody>
                                </table>
            
                                <div class="mt-4 ml-4  " style="line-height: 0.6rem;">
                                    <p>____________________________________</p>
                                    <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                    <p class="pl-5">DIRECTOR IHER</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div >
                                <img class="ml-5"  src="logo.jpg" alt="logo">
                            </div>
                            <div class="" style="margin-top: 1rem;">
                                <table class="tbl table-bordered w-75">
                                    <thead>
                                        <th class="text-center">
                                           Firma del Facilitador
                                        </th>
                                        <th  >Observaciones</th>
                                    </thead>
                                    <tbody class="text-uppercase ">
                                       
                                        <tr > <td  style="height: 1.59rem;"></td> 
                                        <td  ></td>
                                        </tr>
                                        <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                        <tr> <td  style="height: 1.59rem;">  </td><td ></td> </tr>
                                        <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                        <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                        <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                        <tr> <td  style="height: 1.59rem;">  </td><td ></td></tr>
                                        <tr> <td  style="height: 1.59rem;">  </td><td ></td></tr>
                                        <tr><td  style="height: 1.59rem;">  </td><td ></td> </tr>   
                                        <tr><td  style="height: 1.59rem;"></td><td ></td></tr>
                                        <tr><td  style="height: 1.59rem;"></td><td ></td></tr>
                                        <tr><td  style="height: 1.59rem;"></td><td ></td></tr>
                                           
                                    </tbody>
                                </table>
            
                                <div class="mt-4 ml-4  " style="line-height: 0.6rem;">
                                    <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                    <div style="text-align: end;width: 75%;">
                                        <p >Cel. 97253836 </p>
                                        <p >ihersantarita@gmail.com</p>
                                        <p >https://iherpega.blogspot.com/
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                    </div>
                </div>
                 <script src="../js/pdfbolet.js"></script>
             </body>
            </html>`;

                genePdf(contenido, notas.nombre_alumno)
            }

        }

    }

    if (g == 11 && m == 4) {

        for (const notas of nota) {
            let seconS = `<tr><td>Matemáticas III</td> <td>${notas.matematicas_iii}</td><tr/>
            <tr>  <td>Lengua y Literatura</td> <td>${notas.lengua_literatura}</td><tr/>
            <tr>  <td>Introducción a la Economía</td> <td>${notas.intro_economia}</td><tr/>
            <tr>  <td>Fundamentos de la Invest. Social</td> <td> ${notas.fundameto_invest}</td><tr/>
             <tr>  <td>Química III</td><td> ${notas.quimica_iii}</td><tr/>
             <tr>  <td>Matemáticas IV</td><td> ${notas.matematicas_iv}</td><tr/>
            <tr>  <td>Inglés III</td><td> ${notas.ingles_iii}</td><tr/>
             <tr>  <td>Lógica Simbólica</td><td> ${notas.logica_simbolica}</td><tr/>
            <tr>  <td>Orientacion a la Educ. Superior</td><td> ${notas.orient_edu_superior}</td><tr/>
            <tr>  <td>Tec. de la Info. y Comunicación</td><td> ${notas.tic}</td><tr/>
             <tr>  <td>Aprecación Artística</td><td> ${notas.apreciacion_art}</td> <tr/>
             <tr>  <td>Física III</td><td> ${notas.fisica_iii}</td> <tr/>
             <tr>  <td> Lenguaje y Pensamiento Crítico</td><td> ${notas.lenguaje_pensamieto_critico}</td> <tr/>
             <tr>  <td> Antropología	</td><td> ${notas.antropologia}</td> <tr/>
             <tr>  <td> Historia Contemporánea</td><td> ${notas.histo_contemporanea}</td> <tr/>
             <tr>  <td> Educación Física y Deporte II</td><td> ${notas.edu_fisica_deporte_ii}</td> <tr/>
             <tr>  <td> Educación Ambiental</td><td> ${notas.edu_ambiental}</td> <tr/>
             <tr>  <td> Diseño de Proyectos Científicos 	</td><td> ${notas.diseno_proyect_cient}</td> <tr/>
             <tr>  <td> Física IV	</td><td> ${notas.fisica_iv}</td> <tr/>
            <tr>  <td> Biología Humana </td><td> ${notas.biologia_human}</td>	<tr/>   
            <tr>  <td> Programación </td><td> ${notas.programacion}</td>	<tr/>   
            <tr>  <td> Dibujo Técnico </td><td> ${notas.ingles_iv}</td>	<tr/>   
            <tr>  <td> Inglés IV </td><td> ${notas.dibujo_tecnico}</td>	<tr/>   
            <tr>  <td> Fundamento de Etica Profesional </td><td> ${notas.funda_etica_pro}</td>	<tr/>   
        
            `
            let firsS = `<tr><td>Matemáticas I</td> <td>${notas.matematicas_i}</td><tr/>
            <tr>  <td>Español I</td> <td>${notas.espanol_i}</td><tr/>
            <tr>  <td>Inglés I</td> <td>${notas.ingles_i}</td><tr/>
            <tr>  <td>Química I</td> <td> ${notas.quimica_i}</td><tr/>
             <tr>  <td>Informática I</td><td> ${notas.informatica}</td><tr/>
             <tr>  <td>Física I</td><td> ${notas.fisica_i}</td><tr/>
            <tr>  <td>Biología I</td><td> ${notas.biologia_i}</td><tr/>
             <tr>  <td>Filosofía	</td><td> ${notas.filosofia}</td><tr/>
            <tr>  <td>Psicología</td><td> ${notas.psicologia}</td><tr/>
            <tr>  <td>Sociología</td><td> ${notas.sociologia}</td><tr/>
             <tr>  <td> Matemáticas II	</td><td> ${notas.matematicas_ii}</td> <tr/>
             <tr>  <td> Español II 	</td><td> ${notas.espanol_ii}</td> <tr/>
             <tr>  <td> Inglés II	</td><td> ${notas.ingles_ii}</td> <tr/>
             <tr>  <td> Química II 	</td><td> ${notas.quimica_ii}</td> <tr/>
             <tr>  <td> Física II 	</td><td> ${notas.fisica_ii}</td> <tr/>
             <tr>  <td> Biología II 	</td><td> ${notas.biologia_ii}</td> <tr/>
             <tr>  <td> Lenguaje Artístisco</td><td> ${notas.lenguaje_art}</td> <tr/>
             <tr>  <td> Orientación Vocacional 	</td><td> ${notas.orientacion_voca}</td> <tr/>
             <tr>  <td> Historia de Honduras	</td><td> ${notas.historia_honduras}</td> <tr/>
            <tr>  <td> Educación Física </td><td> ${notas.educacion_fisica}</td>	<tr/>  `

            if (seme == 1) {
                semestre = firsS
                contenido = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="../bootstrap.min.css">
                <title>Document</title>
            </head>
            <body>
                <div class="container">
                    <div class="row">
                        <div class="col-6 ">
                            <div style="line-height: 0.6rem;" class="font-weight-bold">
                                <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                                <div class="text-center ml-0 mr-5">
                                    <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                    <p class="">BOLETA DE CALIFICACIONES</p>
                                    <h6 class="" >Santa Rita,Copán</h6>
                                </div>
                               
                            </div>
            
                            <div class="font-weight-bold" style="line-height: 0.6rem;">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">${notas.nombre_alumno} &nbsp ${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp${notas.id_alumno} </span> </p>
                            <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                        </div>
            
                            <div>
                                <table class="tbl table-bordered">
                                    <thead>
                                        <th class="pl-5 pr-5" style="column-count: 2;">
                                            ASIGNATURAS
                                        </th>
                                        <th class="w-25"></th>
                                    </thead>
                                    <tbody class="text-uppercase" style="font-size:10px ;">
                                        ${semestre} 
                                                
                                          
                                    </tbody>
                                </table>
            
                                <div class="mt-4 ml-4  " style="line-height: 0.6rem;font-size: 10px;">
                                    <p>____________________________________</p>
                                    <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                    <p class="pl-5">DIRECTOR IHER</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div >
                                <img class="ml-5"  src="logo.jpg" alt="logo">
                            </div>
                            <div class="" style="margin-top: 0rem;">
                                <table class="tbl table-bordered w-75">
                                    <thead>
                                        <th class="text-center">
                                           Firma del Facilitador
                                        </th>
                                        <th  >Observaciones</th>
                                    </thead>
                                    <tbody class="text-uppercase ">
                                       
                                        <tr > <td  style="height: 18px;"></td> 
                                        <td  ></td>
                                        </tr>
                                        <tr> <td  style="height: 18px;"></td><td ></td></tr>
                                        <tr> <td  style="height: 18px;">  </td><td ></td> </tr>
                                        <tr><td  style="height: 18px;"></td> <td ></td> </tr>
                                        <tr> <td  style="height: 18px;"></td><td ></td></tr>
                                        <tr><td  style="height: 18px;">  </td><td ></td></tr>
                                        <tr> <td  style="height: 18px;">  </td><td ></td></tr>
                                        <tr> <td  style="height: 18px;">  </td><td ></td></tr>
                                        <tr><td  style="height: 18px;">  </td><td ></td> </tr>   
                                        <tr><td  style="height: 18px;"></td><td ></td></tr>
                                        <tr><td  style="height: 18px;"></td><td ></td></tr>
                                        <tr><td  style="height: 18px;"></td><td ></td></tr>
                                        <tr><td  style="height: 18px;"></td><td ></td></tr>
                                        <tr><td  style="height: 18px;"></td><td ></td></tr>
                                        <tr><td  style="height: 18px;"></td><td ></td></tr>
                                        <tr><td  style="height: 18px;"></td><td ></td></tr>
                                        <tr><td  style="height: 18px;"></td><td ></td></tr>
                                        <tr><td  style="height: 18px;"></td><td ></td></tr>
                                        <tr><td  style="height: 18px;"></td><td ></td></tr>
                                        <tr><td  style="height: 18px;"></td><td ></td></tr>
                                       
                                           
                                    </tbody>
                                </table>
            
                                <div class="mt-4 ml-4  " style="line-height: 0.6rem;font-size:10px;line-height: 0.2rem;"  >
                                    <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                    <div style="text-align: end;width: 75%;line-height: 0.1rem;">
                                        <p >Cel. 97253836 </p>
                                        <p >ihersantarita@gmail.com</p>
                                        <p >https://iherpega.blogspot.com/
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                    </div>
                </div>
                 <script src="../js/pdfbolet.js"></script>
             </body>
            </html>`;

                genePdf(contenido, notas.nombre_alumno)
            } else {
                semestre = seconS
                contenido = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="../bootstrap.min.css">
                <title>Document</title>
            </head>
            <body>
                <div class="container">
                    <div class="row">
                             <div class="col-6 ">
                                <div style="line-height: 0.6rem;" class="font-weight-bold">
                                <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                                <div class="text-center ml-0 mr-5">
                                    <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                    <p class="">BOLETA DE CALIFICACIONES</p>
                                    <h6 class="" >Santa Rita,Copán</h6>
                                </div>
                            
                            </div>
            
                            <div class="font-weight-bold" style="line-height: 0.6rem;">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">&nbsp${notas.nombre_alumno} &nbsp ${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <div class="row pl-3"><p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp${notas.id_alumno} </span> </p>
                            <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p></div>
                            
                        </div>
            
                            <div>
                                <table class="tbl table-bordered mt-4">
                                    <thead>
                                        <th class="pl-5 pr-5" style="column-count: 2;">
                                            ASIGNATURAS
                                        </th>
                                        <th class="w-25"></th>
                                    </thead>
                                    <tbody class="text-uppercase " style="font-size:10px ;">
                                        ${semestre} 
                                                
                                          
                                    </tbody>
                                </table>
            
                                <div class="mt-4 ml-4  " style="line-height: 0.1rem;font-size:10px;">
                                    <p>____________________________________</p>
                                    <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                    <p class="pl-5">DIRECTOR IHER</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div >
                                <img class="ml-5"  src="logo.jpg" alt="logo">
                            </div>
                            <div class="" style="margin-top: 0rem;">
                            <table class="tbl table-bordered w-75">
                                <thead>
                                    <th class="text-center">
                                       Firma del Facilitador
                                    </th>
                                    <th  >Observaciones</th>
                                </thead>
                                <tbody class="text-uppercase ">
                                   
                                    <tr > <td  style="height: 18px;"></td> 
                                    <td  ></td>
                                    </tr>
                                    <tr> <td  style="height: 18px;"></td><td ></td></tr>
                                    <tr> <td  style="height: 18px;">  </td><td ></td> </tr>
                                    <tr><td  style="height: 18px;"></td> <td ></td> </tr>
                                    <tr> <td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;">  </td><td ></td></tr>
                                    <tr> <td  style="height: 18px;">  </td><td ></td></tr>
                                    <tr> <td  style="height: 18px;">  </td><td ></td></tr>
                                    <tr><td  style="height: 18px;">  </td><td ></td> </tr>   
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                    <tr><td  style="height: 18px;"></td><td ></td></tr>
                                   
                                       
                                </tbody>
                            </table>
        
                            <div class="mt-4 ml-4  " style="line-height: 0.1rem;font-size:10px;line-height: 0.2rem;"  >
                                <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                <div class="row" style="text-align: end;width: 75%;line-height: 0.1rem;">
                                    <p >Cel. 97253836 </p>&nbsp&nbsp
                                    <p >ihersantarita@gmail.com</p>&nbsp&nbsp
                                    <p >https://iherpega.blogspot.com/
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
            
                    </div>
                </div>
                 <script src="../js/pdfbolet.js"></script>
             </body>
            </html>`;

                genePdf(contenido, notas.nombre_alumno)
            }

        }

    }
    // contaduria finanzas
    if (g == 11 && m == 5) {
        for (const notas of nota) {
            let seconS = `<tr><td>Legislación (Laboral)</td> <td>${notas.legislacion}</td><tr/>
            <tr>  <td>Mercadotecnia</td> <td>${notas.mercadotecnia}</td><tr/>
            <tr>  <td>Organización del Trabajo</td> <td>${notas.organizacion_trabajo}</td><tr/>
            <tr>  <td>Contabilidad Básica II</td> <td> ${notas.contabilidad_basic_ii}</td><tr/>
             <tr>  <td>Contabilidad de Sociedades</td><td> ${notas.contabilidad_sociedades}</td><tr/>
             <tr>  <td>Metodología de la Investigación</td><td> ${notas.metodologia_investiga}</td><tr/>
            <tr>  <td>Proyectos y Presupuesto</td><td> ${notas.proyectos_presu}</td><tr/>
             <tr>  <td>Legislación Mercantil</td><td> ${notas.legislacion_mercanti}</td><tr/>
            <tr>  <td>Contabilidad de Costos</td><td> ${notas.contabilidad_costos}</td><tr/>
            <tr>  <td>Investigación de Mercados</td><td> ${notas.investiga_mercados}</td><tr/>
             <tr>  <td>Estadística Para Administradores II</td><td> ${notas.estadistica_admin_ii}</td> <tr/>
             <tr>  <td>Informática Administrativa</td><td> ${notas.informmatica_adminis}</td> <tr/>
            `
            let firsS = `<tr><td>Matemáticas III</td> <td>${notas.matematicasiii}</td><tr/>
            <tr>  <td>Lengua y Literatura</td> <td>${notas.lengua_literatura}</td><tr/>
            <tr>  <td>Inglés Técnico III</td> <td>${notas.ingles_tiii}</td><tr/>
            <tr>  <td>Orientación Profesional</td> <td> ${notas.orientacion_prof}</td><tr/>
             <tr>  <td>Contabilidad Básica I</td><td> ${notas.contabilidad_bai}</td><tr/>
             <tr>  <td>Comportamiento Organizacional</td><td> ${notas.compotamiento_orga}</td><tr/>
            <tr>  <td>Desarrollo Socioeconómico</td><td> ${notas.desarrolo_socioeco}</td><tr/>
             <tr>  <td>Administración General	</td><td> ${notas.adminis_ge}</td><tr/>
            <tr>  <td>Estadística Para Administradores I</td><td> ${notas.estadistica_admin_i}</td><tr/>
            <tr>  <td>Desarrollo de Cultura de Calidad</td><td> ${notas.desarrolo_cultura}</td><tr/>
             <tr>  <td>Gestión de Proyectos</td><td> ${notas.gestion_proyectos}</td> <tr/> `

            if (seme == 1) {
                semestre = firsS
                contenido = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../bootstrap.min.css">
            <title>Document</title>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-6 ">
                        <div style="line-height: 0.6rem;" class="font-weight-bold">
                            <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                            <div class="text-center ml-0 mr-5">
                                <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                <p class="">BOLETA DE CALIFICACIONES</p>
                                <h6 class="" >Santa Rita,Copán</h6>
                            </div>
                           
                        </div>
        
                        <div class="font-weight-bold">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">${notas.nombre_alumno} &nbsp ${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp${notas.id_alumno} </span> </p>
                            <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                        </div>
        
                        <div>
                            <table class="tbl table-bordered">
                                <thead>
                                    <th class="pl-5 pr-5" style="column-count: 2;">
                                        ASIGNATURAS
                                    </th>
                                    <th class="w-25"></th>
                                </thead>
                                <tbody class="text-uppercase">
                                   
                                     ${semestre}
                                </tbody>
                            </table>
        
                            <div class="mt-4 ml-4  " style="line-height: 0.6rem;">
                                <p>____________________________________</p>
                                <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                <p class="pl-5">DIRECTOR IHER</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div >
                            <img class="ml-5"  src="logo.jpg" alt="logo">
                        </div>
                        <div class="" style="margin-top: 1rem;">
                            <table class="tbl table-bordered w-75">
                                <thead>
                                    <th class="text-center">
                                       Firma del Facilitador
                                    </th>
                                    <th  >Observaciones</th>
                                </thead>
                                <tbody class="text-uppercase ">
                                   
                                    <tr > <td  style="height: 1.59rem;"></td> 
                                    <td  ></td>
                                    </tr>
                                    <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr> <td  style="height: 1.59rem;">  </td><td ></td> </tr>
                                    <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                    <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr> <td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr> <td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td> </tr>   
                                    <tr><td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;"></td><td ></td></tr>
                                 
                                       
                                </tbody>
                            </table>
        
                            <div class="mt-4 ml-4  " style="line-height: 0.6rem;">
                                <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                <div style="text-align: end;width: 75%;">
                                    <p >Cel. 97253836 </p>
                                    <p >ihersantarita@gmail.com</p>
                                    <p >https://iherpega.blogspot.com/
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
             <script src="../js/pdfbolet.js"></script>
         </body>
        </html>`;

                genePdf(contenido, notas.nombre_alumno)
            } else {
                semestre = seconS
                contenido = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../bootstrap.min.css">
            <title>Document</title>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-6 ">
                        <div style="line-height: 0.6rem;" class="font-weight-bold">
                            <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                            <div class="text-center ml-0 mr-5">
                                <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                <p class="">BOLETA DE CALIFICACIONES</p>
                                <h6 class="" >Santa Rita,Copán</h6>
                            </div>
                           
                        </div>
        
                        <div class="font-weight-bold">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">${notas.nombre_alumno} &nbsp ${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp${notas.id_alumno} </span> </p>
                            <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                        </div>
        
                        <div>
                            <table class="tbl table-bordered">
                                <thead>
                                    <th class="pl-5 pr-5" style="column-count: 2;">
                                        ASIGNATURAS
                                    </th>
                                    <th class="w-25"></th>
                                </thead>
                                <tbody class="text-uppercase">
                                   
                                     ${semestre}
                                </tbody>
                            </table>
        
                            <div class="mt-4 ml-4  " style="line-height: 0.6rem;">
                                <p>____________________________________</p>
                                <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                <p class="pl-5">DIRECTOR IHER</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div >
                            <img class="ml-5"  src="logo.jpg" alt="logo">
                        </div>
                        <div class="" style="margin-top: 1rem;">
                            <table class="tbl table-bordered w-75">
                                <thead>
                                    <th class="text-center">
                                       Firma del Facilitador
                                    </th>
                                    <th  >Observaciones</th>
                                </thead>
                                <tbody class="text-uppercase ">
                                   
                                    <tr > <td  style="height: 1.59rem;"></td> 
                                    <td  ></td>
                                    </tr>
                                    <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr> <td  style="height: 1.59rem;">  </td><td ></td> </tr>
                                    <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                    <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr> <td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr> <td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td> </tr>   
                                    <tr><td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;"></td><td ></td></tr>
                                 
                                       
                                </tbody>
                            </table>
        
                            <div class="mt-4 ml-4  " style="line-height: 0.6rem;">
                                <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                <div style="text-align: end;width: 75%;">
                                    <p >Cel. 97253836 </p>
                                    <p >ihersantarita@gmail.com</p>
                                    <p >https://iherpega.blogspot.com/
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
             <script src="../js/pdfbolet.js"></script>
         </body>
        </html>`;

                genePdf(contenido, notas.nombre_alumno)
            }


        }
    }
    // admin empresas
    if (g == 11 && m == 6) {
        for (const notas of nota) {
            let seconS = `
            <tr>  <td>Mercadotecnia</td> <td>${notas.mercadotecnia}</td><tr/>
            <tr>  <td>Legislación Bancaria</td> <td>${notas.legislacion_bancaria}</td><tr/>
            <tr>  <td>Proyectos y Presupuesto</td> <td> ${notas.proyectos_presupuest}</td><tr/>
             <tr>  <td>Organización del Trabajo</td><td> ${notas.organizacion_trabajo}</td><tr/>
             <tr>  <td>Matemática Financiera</td><td> ${notas.matematica_financiera}</td><tr/>
             <tr>  <td>Contabilidad II</td><td> ${notas.contabilidad_ii}</td><tr/>
           
            `
            let firsS = `
            <tr><td>Matemática Aplicada</td> <td>${notas.matematica_aplicada}</td><tr/>
            <tr>  <td>Inglés Técnico</td> <td>${notas.ingles_tec}</td><tr/>
            <tr>  <td>Lengua y Literatura</td> <td>${notas.lengua_literatura}</td><tr/>
            <tr>  <td>Administración General	</td><td> ${notas.administra_general}</td><tr/>
            <tr>  <td>Ética Y Orientación Profesional</td> <td> ${notas.etica_orientacion}</td><tr/>
             <tr>  <td>Contabilidad  I</td><td> ${notas.contabilidad_i}</td><tr/>
         `

            if (seme == 1) {
                semestre = firsS
                contenido = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../bootstrap.min.css">
            <title>Document</title>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-6 ">
                        <div style="line-height: 0.6rem;" class="font-weight-bold">
                            <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                            <div class="text-center ml-0 mr-5">
                                <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                <p class="">BOLETA DE CALIFICACIONES</p>
                                <h6 class="" >Santa Rita,Copán</h6>
                            </div>
                           
                        </div>
        
                        <div class="font-weight-bold">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">&nbsp${notas.nombre_alumno}&nbsp${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp${notas.id_alumno} </span> </p>
                            <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                        </div>
        
                        <div style="margin-top:5rem;">
                            <table class="tbl table-bordered">
                                <thead>
                                    <th class="pl-5 pr-5" style="column-count: 2;">
                                        ASIGNATURAS
                                    </th>
                                    <th class="w-25"></th>
                                </thead>
                                <tbody class="text-uppercase">
                                   
                                     ${semestre}
                                </tbody>
                            </table>
        
                            <div class="mt-5 ml-4  " style="line-height: 0.6rem;">
                                <p>____________________________________</p>
                                <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                <p class="pl-5">DIRECTOR IHER</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div >
                            <img class="ml-5"  src="logo.jpg" alt="logo">
                        </div>
                        <div class="" style="margin-top: 7rem;">
                            <table class="tbl table-bordered w-75">
                                <thead>
                                    <th class="text-center">
                                       Firma del Facilitador
                                    </th>
                                    <th  >Observaciones</th>
                                </thead>
                                <tbody class="text-uppercase ">
                                   
                                    <tr > <td  style="height: 1.59rem;"></td> 
                                    <td  ></td>
                                    </tr>
                                    <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr> <td  style="height: 1.59rem;">  </td><td ></td> </tr>
                                    <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                    <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    
                                 
                                       
                                </tbody>
                            </table>
        
                            <div class="mt-5 ml-4  " style="line-height: 0.6rem;">
                                <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                <div style="text-align: end;width: 75%;">
                                    <p >Cel. 97253836 </p>
                                    <p >ihersantarita@gmail.com</p>
                                    <p >https://iherpega.blogspot.com/
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
             <script src="../js/pdfbolet.js"></script>
         </body>
        </html>`;

                genePdf(contenido, notas.nombre_alumno)
            } else {
                semestre = seconS
                contenido = `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="../bootstrap.min.css">
                    <title>Document</title>
                </head>
                <body>
                    <div class="container">
                        <div class="row">
                            <div class="col-6 ">
                                <div style="line-height: 0.6rem;" class="font-weight-bold">
                                    <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                                    <div class="text-center ml-0 mr-5">
                                        <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                        <p class="">BOLETA DE CALIFICACIONES</p>
                                        <h6 class="" >Santa Rita,Copán</h6>
                                    </div>
                                   
                                </div>
                
                                <div class="font-weight-bold">
                                    <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">&nbsp${notas.nombre_alumno}&nbsp${notas.apellido_alumno} </span> </p>
                                    <div class="row pl-3">
                                        <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                        <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                                    </div>
                                    <p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp${notas.id_alumno} </span> </p>
                                    <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                                </div>
                
                                <div style="margin-top:5rem;">
                                    <table class="tbl table-bordered">
                                        <thead>
                                            <th class="pl-5 pr-5" style="column-count: 2;">
                                                ASIGNATURAS
                                            </th>
                                            <th class="w-25"></th>
                                        </thead>
                                        <tbody class="text-uppercase">
                                           
                                             ${semestre}
                                        </tbody>
                                    </table>
                
                                    <div class="mt-5 ml-4  " style="line-height: 0.6rem;">
                                        <p>____________________________________</p>
                                        <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                        <p class="pl-5">DIRECTOR IHER</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div >
                                    <img class="ml-5"  src="logo.jpg" alt="logo">
                                </div>
                                <div class="" style="margin-top: 7rem;">
                                    <table class="tbl table-bordered w-75">
                                        <thead>
                                            <th class="text-center">
                                               Firma del Facilitador
                                            </th>
                                            <th  >Observaciones</th>
                                        </thead>
                                        <tbody class="text-uppercase ">
                                           
                                            <tr > <td  style="height: 1.59rem;"></td> 
                                            <td  ></td>
                                            </tr>
                                            <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                            <tr> <td  style="height: 1.59rem;">  </td><td ></td> </tr>
                                            <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                            <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                            <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                            
                                         
                                               
                                        </tbody>
                                    </table>
                
                                    <div class="mt-5 ml-4  " style="line-height: 0.6rem;">
                                        <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                        <div style="text-align: end;width: 75%;">
                                            <p >Cel. 97253836 </p>
                                            <p >ihersantarita@gmail.com</p>
                                            <p >https://iherpega.blogspot.com/
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                
                        </div>
                    </div>
                     <script src="../js/pdfbolet.js"></script>
                 </body>
                </html>`;

                genePdf(contenido, notas.nombre_alumno)
            }


        }
    }
    // informatica 11
    if (g == 11 && m == 7) {
        for (const notas of nota) {
            let seconS = `
            <tr>  <td>Mercadotecnia</td> <td>${notas.mercadotecnia}</td><tr/>
            <tr>  <td>Legislación </td> <td>${notas.legislacion}</td><tr/>
            <tr>  <td>Proyectos y Presupuesto</td> <td> ${notas.proyectos_presupuesto}</td><tr/>
             <tr>  <td>Organización del Trabajo</td><td> ${notas.organizacion_trabajo}</td><tr/>
             <tr>  <td>Informática II</td><td> ${notas.informatica_ii}</td><tr/>
             <tr>  <td>Laboratorio de Informática II</td><td> ${notas.informatica_ii}</td><tr/>
             <tr>  <td>Programación II</td><td> ${notas.programacion_ii}</td><tr/>
             <tr>  <td>Análisis y Diseño II</td><td> ${notas.analisis_diseno_ii}</td><tr/>
           
            `
            let firsS = `
            <tr><td>Matemática III</td> <td>${notas.matematica_iii}</td><tr/>
            <tr>  <td>Inglés Técnico III</td> <td>${notas.ingles_tecnico_iii}</td><tr/>
            <tr>  <td>Lengua y Literatura</td> <td>${notas.lengua_literatura}</td><tr/>
            <tr>  <td>Informática I</td><td> ${notas.informatica_i}</td><tr/>
            <tr>  <td>Ética Y Orientación Profesional</td> <td> ${notas.etica_orientacion}</td><tr/>
             <tr>  <td>Análisis y Diseño I</td><td> ${notas.analisis_diseno_i}</td><tr/>
             <tr>  <td>Física Aplicada</td><td> ${notas.fisica_aplicada}</td><tr/>
             <tr>  <td>Laboratorio de Informática I</td><td> ${notas.lab_info}</td><tr/>
             <tr>  <td>Programación I</td><td> ${notas.frogramacion_i}</td><tr/>

         `

            if (seme == 1) {
                semestre = firsS
                contenido = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../bootstrap.min.css">
            <title>Document</title>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-6 ">
                        <div style="line-height: 0.6rem;" class="font-weight-bold">
                            <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                            <div class="text-center ml-0 mr-5">
                                <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                <p class="">BOLETA DE CALIFICACIONES</p>
                                <h6 class="" >Santa Rita,Copán</h6>
                            </div>
                           
                        </div>
        
                        <div class="font-weight-bold">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">&nbsp${notas.nombre_alumno}&nbsp${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp${notas.id_alumno} </span> </p>
                            <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                        </div>
        
                        <div style="margin-top:4rem;">
                            <table class="tbl table-bordered">
                                <thead>
                                    <th class="pl-5 pr-5" style="column-count: 2;">
                                        ASIGNATURAS
                                    </th>
                                    <th class="w-25"></th>
                                </thead>
                                <tbody class="text-uppercase">
                                   
                                     ${semestre}
                                </tbody>
                            </table>
        
                            <div class="mt-5 ml-4  " style="line-height: 0.6rem;">
                                <p>____________________________________</p>
                                <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                <p class="pl-5">DIRECTOR IHER</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div >
                            <img class="ml-5"  src="logo.jpg" alt="logo">
                        </div>
                        <div class="" style="margin-top: 6.1rem;">
                            <table class="tbl table-bordered w-75">
                                <thead>
                                    <th class="text-center">
                                       Firma del Facilitador
                                    </th>
                                    <th  >Observaciones</th>
                                </thead>
                                <tbody class="text-uppercase ">
                                   
                                     
                                    <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                    <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    
                                 
                                       
                                </tbody>
                            </table>
        
                            <div class="mt-5 ml-4  " style="line-height: 0.6rem;">
                                <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                <div style="text-align: end;width: 75%;">
                                    <p >Cel. 97253836 </p>
                                    <p >ihersantarita@gmail.com</p>
                                    <p >https://iherpega.blogspot.com/
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
             <script src="../js/pdfbolet.js"></script>
         </body>
        </html>`;

                genePdf(contenido, notas.nombre_alumno)
            } else {
                semestre = seconS

                genePdf(contenido, notas.nombre_alumno)
            }


        }
    }

    if (g == 12 && m == 5) {
        for (const notas of nota) {

            let firsS = `
            <tr><td>Gestión de Talento Humano I </td> <td>${notas.gestion_talent_humano_i}</td><tr/>
            <tr>  <td>Higiene y Seguridad Industrial</td> <td>${notas.higiene_segurudad_indus}</td><tr/>
            <tr>  <td>Administración de la Producción</td> <td>${notas.administracion_produc}</td><tr/>
            <tr>  <td>Planeación Estratégica	</td><td> ${notas.planeacion_estrategica}</td><tr/>
            <tr>  <td>Mercadotecnia Aplicada a los Servicios	</td> <td> ${notas.mercadotecnia_apli_servicios}</td><tr/>
            <tr>  <td> Matématica Financiera</td><td> ${notas.matematica_finan}</td><tr/>
             <tr>  <td>Gestion Presupuestaria</td><td> ${notas.gestion_presupuestaria}</td><tr/>
             <tr>  <td>Mercadotecnia Internacional</td><td> ${notas.mercadotecnia_internacional}</td><tr/>
             <tr>  <td>Administración de Recursos Financieros</td><td> ${notas.administracion_recursos_finan}</td><tr/>
             <tr>  <td>Gestión del Talento Humano II</td><td> ${notas.gestion_talent_humano_ii}</td><tr/>
             <tr>  <td>Gestión de Instituciones</td><td> ${notas.gestio_instituciones}</td><tr/>
             <tr>  <td>Administración de Ventas(Pasantias)</td><td>${notas.administracion_ventas}</td><tr/>
             <tr>  <td>Auditoría</td><td> ${notas.auditoria}</td><tr/> `


            if (seme == 1) {
                semestre = firsS
                contenido = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../bootstrap.min.css">
            <title>Document</title>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-6 ">
                        <div style="line-height: 0.6rem;" class="font-weight-bold">
                            <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                            <div class="text-center ml-0 mr-5">
                                <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                <p class="">BOLETA DE CALIFICACIONES</p>
                                <h6 class="" >Santa Rita,Copán</h6>
                            </div>
                           
                        </div>
        
                        <div class="font-weight-bold">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">&nbsp${notas.nombre_alumno}&nbsp${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp${notas.id_alumno} </span> </p>
                            <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                        </div>
        
                        <div style="margin-top:0rem;">
                            <table class="tbl table-bordered">
                                <thead>
                                    <th class="pl-5 pr-5" style="column-count: 2;">
                                        ASIGNATURAS
                                    </th>
                                    <th class="w-25"></th>
                                </thead>
                                <tbody class="text-uppercase">
                                   
                                     ${semestre}
                                </tbody>
                            </table>
        
                            <div class="mt-3 ml-4  " style="line-height: 0.6rem;">
                                <p>____________________________________</p>
                                <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                <p class="pl-5">DIRECTOR IHER</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div >
                            <img class="ml-5"  src="logo.jpg" alt="logo">
                        </div>
                        <div class="" style="margin-top: 3.1rem;">
                            <table class="tbl table-bordered w-75">
                                <thead>
                                    <th class="text-center">
                                       Firma del Facilitador
                                    </th>
                                    <th  >Observaciones</th>
                                </thead>
                                <tbody class="text-uppercase ">
                                   
                                     
                                    <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                    <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.89rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.69rem;">  </td><td ></td></tr>
                                    
                                 
                                       
                                </tbody>
                            </table>
        
                            <div class="mt-3 ml-4  " style="line-height: 0.6rem;">
                                <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                <div style="text-align: end;width: 75%;">
                                    <p >Cel. 97253836 </p>
                                    <p >ihersantarita@gmail.com</p>
                                    <p >https://iherpega.blogspot.com/
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
             <script src="../js/pdfbolet.js"></script>
         </body>
        </html>`;

                genePdf(contenido, notas.nombre_alumno)
            }


        }
    }

    if (g == 12 && m == 6) {
        for (const notas of nota) {

            let firsS = `
            <tr><td>Economía </td> <td>${notas.economiai}</td><tr/>
            <tr>  <td>Legislación</td> <td>${notas.legislacion}</td><tr/>
            <tr>  <td>Operaciones Tributarias</td> <td>${notas.operaciones_tributa}</td><tr/>
            <tr>  <td>Contabilidad Bancaria</td><td> ${notas.contabilidad_bancaria}</td><tr/>
            <tr>  <td>Admin Financiera I</td> <td> ${notas.administracion_finan_i}</td><tr/>
            <tr>  <td> Informática Contable</td><td> ${notas.informatica_contable}</td><tr/>
             
              `
            let secondS = `
            <tr>  <td>Admin Financiera II</td><td> ${notas.administracion_finan_ii}</td><tr/>
            <tr>  <td>Servicio al Cliente</td><td> ${notas.servicio_cliente}</td><tr/>
            <tr>  <td>Contabilidad de Costos</td><td> ${notas.contabilidad_costos}</td><tr/>
            <tr>  <td>Auditoría</td><td> ${notas.auditoria}</td><tr/>`


            if (seme == 1) {
                semestre = firsS
                contenido = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../bootstrap.min.css">
            <title>Document</title>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-6 ">
                        <div style="line-height: 0.6rem;" class="font-weight-bold">
                            <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                            <div class="text-center ml-0 mr-5">
                                <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                <p class="">BOLETA DE CALIFICACIONES</p>
                                <h6 class="" >Santa Rita,Copán</h6>
                            </div>
                           
                        </div>
        
                        <div class="font-weight-bold">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">&nbsp${notas.nombre_alumno}&nbsp${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp${notas.id_alumno} </span> </p>
                            <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                        </div>
        
                        <div style="margin-top:4rem;">
                            <table class="tbl table-bordered">
                                <thead>
                                    <th class="pl-5 pr-5" style="column-count: 2;">
                                        ASIGNATURAS
                                    </th>
                                    <th class="w-25"></th>
                                </thead>
                                <tbody class="text-uppercase">
                                   
                                     ${semestre}
                                </tbody>
                            </table>
        
                            <div class="mt-5 ml-4  " style="line-height: 0.6rem;">
                                <p>____________________________________</p>
                                <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                <p class="pl-5">DIRECTOR IHER</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div >
                            <img class="ml-5"  src="logo.jpg" alt="logo">
                        </div>
                        <div class="" style="margin-top: 6.1rem;">
                            <table class="tbl table-bordered w-75">
                                <thead>
                                    <th class="text-center">
                                       Firma del Facilitador
                                    </th>
                                    <th  >Observaciones</th>
                                </thead>
                                <tbody class="text-uppercase ">
                                   
                                     
                                    <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                    <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    
                                    
                                 
                                       
                                </tbody>
                            </table>
        
                            <div class="mt-3 ml-4  " style="line-height: 0.6rem;">
                                <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                <div style="text-align: end;width: 75%;">
                                    <p >Cel. 97253836 </p>
                                    <p >ihersantarita@gmail.com</p>
                                    <p >https://iherpega.blogspot.com/
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
             <script src="../js/pdfbolet.js"></script>
         </body>
        </html>`;

                genePdf(contenido, notas.nombre_alumno)
            } else {
                semestre = secondS
                contenido = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../bootstrap.min.css">
            <title>Document</title>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-6 ">
                        <div style="line-height: 0.6rem;" class="font-weight-bold">
                            <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                            <div class="text-center ml-0 mr-5">
                                <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                <p class="">BOLETA DE CALIFICACIONES</p>
                                <h6 class="" >Santa Rita,Copán</h6>
                            </div>
                           
                        </div>
        
                        <div class="font-weight-bold">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">&nbsp${notas.nombre_alumno}&nbsp${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp${notas.id_alumno} </span> </p>
                            <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                        </div>
        
                        <div style="margin-top:0rem;">
                            <table class="tbl table-bordered">
                                <thead>
                                    <th class="pl-5 pr-5" style="column-count: 2;">
                                        ASIGNATURAS
                                    </th>
                                    <th class="w-25"></th>
                                </thead>
                                <tbody class="text-uppercase">
                                   
                                     ${semestre}
                                </tbody>
                            </table>
        
                            <div class="mt-3 ml-4  " style="line-height: 0.6rem;">
                                <p>____________________________________</p>
                                <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                <p class="pl-5">DIRECTOR IHER</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div >
                            <img class="ml-5"  src="logo.jpg" alt="logo">
                        </div>
                        <div class="" style="margin-top: 3.1rem;">
                            <table class="tbl table-bordered w-75">
                                <thead>
                                    <th class="text-center">
                                       Firma del Facilitador
                                    </th>
                                    <th  >Observaciones</th>
                                </thead>
                                <tbody class="text-uppercase ">
                                   
                                     
                                    <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                    <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    
                                 
                                    
                                 
                                       
                                </tbody>
                            </table>
        
                            <div class="mt-3 ml-4  " style="line-height: 0.6rem;">
                                <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                <div style="text-align: end;width: 75%;">
                                    <p >Cel. 97253836 </p>
                                    <p >ihersantarita@gmail.com</p>
                                    <p >https://iherpega.blogspot.com/
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
             <script src="../js/pdfbolet.js"></script>
         </body>
        </html>`;
                genePdf(contenido, notas.nombre_alumno)
            }


        }
    }

    if (g == 12 && m == 7) {
        for (const notas of nota) {

            let firsS = `
            <tr><td>Laboratorio de Informática III</td> <td>${notas.lab_info_iii}</td><tr/>
            <tr>  <td>Programación III</td> <td>${notas.programacion_iii}</td><tr/>
            <tr>  <td>Mantenimiento y Reparación I</td> <td>${notas.mantenimiento_repa_i}</td><tr/>
            <tr>  <td>Redes Informática I</td><td> ${notas.redes_informatica_i}</td><tr/>
            <tr>  <td>Diseño Web I</td> <td> ${notas.diseno_web_i}</td><tr/>
       
              `
            let secondS = `
            <tr>  <td>Laboratorio de Informática IV</td><td> ${notas.lab_info_iv}</td><tr/>
            <tr>  <td>Diseño Web II</td><td> ${notas.diseno_web_ii}</td><tr/>
            <tr>  <td>Programación IV</td><td> ${notas.programacion_iv}</td><tr/>
            <tr>  <td>Mantenimiento y Reparación II</td><td> ${notas.mantenimiento_repa_ii}</td><tr/>
            <tr>  <td>Redes Informática II</td><td> ${notas.redes_informatica_ii}</td><tr/>`


            if (seme == 1) {
                semestre = firsS
                contenido = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../bootstrap.min.css">
            <title>Document</title>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-6 ">
                        <div style="line-height: 0.6rem;" class="font-weight-bold">
                            <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                            <div class="text-center ml-0 mr-5">
                                <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                <p class="">BOLETA DE CALIFICACIONES</p>
                                <h6 class="" >Santa Rita,Copán</h6>
                            </div>
                           
                        </div>
        
                        <div class="font-weight-bold">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">&nbsp${notas.nombre_alumno}&nbsp${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp${notas.id_alumno} </span> </p>
                            <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                        </div>
        
                        <div style="margin-top:4rem;">
                            <table class="tbl table-bordered">
                                <thead>
                                    <th class="pl-5 pr-5" style="column-count: 2;">
                                        ASIGNATURAS
                                    </th>
                                    <th class="w-25"></th>
                                </thead>
                                <tbody class="text-uppercase">
                                   
                                     ${semestre}
                                </tbody>
                            </table>
        
                            <div class="mt-5 ml-4  " style="line-height: 0.6rem;">
                                <p>____________________________________</p>
                                <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                <p class="pl-5">DIRECTOR IHER</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div >
                            <img class="ml-5"  src="logo.jpg" alt="logo">
                        </div>
                        <div class="" style="margin-top: 6.1rem;">
                            <table class="tbl table-bordered w-75">
                                <thead>
                                    <th class="text-center">
                                       Firma del Facilitador
                                    </th>
                                    <th  >Observaciones</th>
                                </thead>
                                <tbody class="text-uppercase ">
                                   
                                     
                                    <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                    <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                     
                                    
                                 
                                       
                                </tbody>
                            </table>
        
                            <div class="mt-3 ml-4  " style="line-height: 0.6rem;">
                                <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                <div style="text-align: end;width: 75%;">
                                    <p >Cel. 97253836 </p>
                                    <p >ihersantarita@gmail.com</p>
                                    <p >https://iherpega.blogspot.com/
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
             <script src="../js/pdfbolet.js"></script>
         </body>
        </html>`;

                genePdf(contenido, notas.nombre_alumno)
            } else {
                semestre = secondS
                contenido = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="../bootstrap.min.css">
            <title>Document</title>
        </head>
        <body>
            <div class="container">
                <div class="row">
                    <div class="col-6 ">
                        <div style="line-height: 0.6rem;" class="font-weight-bold">
                            <h5 class=" font-weight-bold " >Instituto Hondureño de Educación por Radio</h5>
                            <div class="text-center ml-0 mr-5">
                                <p class="">Subsede Prof Elmer Gustavo Arita</p>
                                <p class="">BOLETA DE CALIFICACIONES</p>
                                <h6 class="" >Santa Rita,Copán</h6>
                            </div>
                           
                        </div>
        
                        <div class="font-weight-bold">
                            <p>Estudiante:<span id="nombre_A" style="text-decoration: underline;">&nbsp${notas.nombre_alumno}&nbsp${notas.apellido_alumno} </span> </p>
                            <div class="row pl-3">
                                <p>Grado: <span id="grado" style="text-decoration: underline;"> &nbsp ${notas.grado_alumno}°</span></p>
                                <p class="ml-1">Año:<span id="ano" style="text-decoration: underline;"> &nbsp${notas.ano}</span></p>
                            </div>
                            <p>Registro:<span id="registro" style="text-decoration: underline;">&nbsp ${notas.id_alumno}</span> </p>
                            <p>Semestre:<span id="registro" style="text-decoration: underline;">&nbsp${sB} </span> </p>
                        </div>
        
                        <div style="margin-top:0rem;">
                            <table class="tbl table-bordered">
                                <thead>
                                    <th class="pl-5 pr-5" style="column-count: 2;">
                                        ASIGNATURAS
                                    </th>
                                    <th class="w-25"></th>
                                </thead>
                                <tbody class="text-uppercase">
                                   
                                     ${semestre}
                                </tbody>
                            </table>
        
                            <div class="mt-3 ml-4  " style="line-height: 0.6rem;">
                                <p>____________________________________</p>
                                <p class=" pl-5 ">Lic. Elmer G. Arita</p>
                                <p class="pl-5">DIRECTOR IHER</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div >
                            <img class="ml-5"  src="logo.jpg" alt="logo">
                        </div>
                        <div class="" style="margin-top: 3.1rem;">
                            <table class="tbl table-bordered w-75">
                                <thead>
                                    <th class="text-center">
                                       Firma del Facilitador
                                    </th>
                                    <th  >Observaciones</th>
                                </thead>
                                <tbody class="text-uppercase ">
                                   
                                     
                                    <tr><td  style="height: 1.59rem;"></td> <td ></td> </tr>
                                    <tr> <td  style="height: 1.59rem;"></td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    <tr><td  style="height: 1.59rem;">  </td><td ></td></tr>
                                    
                                 
                                    
                                 
                                       
                                </tbody>
                            </table>
        
                            <div class="mt-3 ml-4  " style="line-height: 0.6rem;">
                                <h5 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo libre</h5>
                                <div style="text-align: end;width: 75%;">
                                    <p >Cel. 97253836 </p>
                                    <p >ihersantarita@gmail.com</p>
                                    <p >https://iherpega.blogspot.com/
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
             <script src="../js/pdfbolet.js"></script>
         </body>
        </html>`;
                genePdf(contenido, notas.nombre_alumno)
            }


        }
    }


}

async function getConst(g, m, y) {

    const nota = await getNotas(g, m, y)

    for (const notas of nota) {

        console.log(notas)
        let gra = '';
        switch (notas.grado_alumno) {
            case 7:
                gra = 'Séptimo'
                break
            case 8:
                gra = 'Octavo'
                break
            case 9:
                gra = 'Noveno'
                break
            case 10:
                gra = 'Décimo'
                break
            case 11:
                gra = 'undécimo'
                break
            case 12:
                gra = 'Duodécimo'
                break
        }

        const date = new Date();
        const fecha = date.getDay();
        let mes = date.getMonth();
        const ano = date.getFullYear();
        switch (mes) {
            case 1:
                mes = 'Enero'
                break;
            case 2:
                mes = 'Febrero'
                break;
            case 3:
                mes = 'Marzo'
                break;
            case 4:
                mes = 'Abril'
                break;
            case 5:
                mes = 'Mayo'
                break;
            case 6:
                mes = 'Junio'
                break;
            case 7:
                mes = 'Julio'
                break;
            case 8:
                mes = 'Agosto'
                break;
            case 9:
                mes = 'Septiembre'
                break;
            case 10:
                mes = 'Octubre'
                break;
            case 11:
                mes = 'Noviembre'
                break;
            case 12:
                mes = 'Diciembre'
                break;
        }

        let constancia = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col" ><img style=" height: 140px;position: absolute;margin: 4rem 0 0 0;"
                src="logo.jpg" alt="">
                <div style="text-align: center;line-height: 0.7rem;">
                    <h3>INSTITUTO HONDUREÑO DE EDUCACION POR RADIO (IHER).</h3>
                    <h3>SUBSEDE PROFESOR ELMER GUSTAVO ARITA.</h3>
                    <h3>Santa Rita, Copán.</h3>
                    <h3 class="font-italic " style="color: rgba(212, 224, 42, 0.836);">Un pueblo educado es un pueblo
                        libre”.</h3>
                    <p>Cel. 97253836</p>
                    <p>ihersantarita@gmail.com </p>
                    <p>https://iherpega.blogspot.com/</p>
                </div>
                <div class="pt-5" style="border-bottom:solid black ;height: 1rem;width: 62.6rem;">
                </div>

                <div style="text-align: center;">
                    <h3>CONSTANCIA DE MATRICULA.</h3>
                    <div style="text-align: justify;width: 42rem;line-height: 3rem;">
                        <h3>El Suscrito Coordinador Voluntario de la Subsede PROFESOR
                         ELMER GUSTAVO ARITA (PEGA)
                            del INSTITUTO HONDUREÑO DE EDUCACION POR RADIO (IHER), con sede en el Municipio de Santa
                            Rita, departamento de Copán, por medio de la presente hace constar QUE:&nbsp 
                            <span style="text-decoration: underline;text-transform: uppercase;">${notas.nombre_alumno}&nbsp${notas.apellido_alumno} </span> con identidad
                             <span style="text-decoration: underline;">${notas.id_alumno} &nbsp,</span>se encuentra matriculado (a) en este Centro Educativo en &nbsp 
                             <span style="text-decoration: underline;">${gra}</span> &nbsp grado.</h3>
                    </div>
                    <div style="text-align: justify;width: 42rem;line-height: 3rem;">
                        <h3>
                            Y para los fines que el interesado estime conveniente  se le extiende la presente en Santa Rita de Copán, a los &nbsp <span style="text-decoration: underline;">${fecha}</span>&nbsp días del mes de <span style="text-decoration: underline;">${mes}</span>&nbsp del año &nbsp <span style="text-decoration: underline;">${ano}.</span> 
                        </h3>
                    </div>

                    <div style="margin-top: 8rem;">
                        <p>__________________________________________</p>
                        <p>Lic. Elmer Gustavo Arita Auxume.</p>
                        <p>    Director del Centro Educativo.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>`
        const typeDocument = 'constancia'
        genePdf(constancia, notas.nombre_alumno, gra, 'portrait', typeDocument)

    }
}




function genePdf(contenido, nam, gra, ori, typeDocument) {
    let pContent = path.join(`${__dirname}/ui/boletas/`)
    pContent = pContent.replace(new RegExp(/\\/g), '/')
    let options = {
        "format": 'Letter',
        "orientation": ori || "landscape",
        "border": {
            "top": "1.69cm", // default is 0, units: mm, cm, in, px
            "right": "1.69cm",
            "bottom": "0.58cm",
            "left": "1.69cm"
        },
        "base": `file:///${pContent}`
    }


    const data = pdf.create(contenido, options).toFile(dialog.showSaveDialogSync({ defaultPath: `${nam}.${gra}.${typeDocument || 'boleta'}.pdf` }), function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    })

    console.log(data)
}




module.exports = {
    createWindow,
    createAlumno,
    getAlumno,
    getTablas,
    deleteAlumno,
    getthinkById,
    updateAlumno,
    getNotas,
    updateNotas,
    AlumnoAscendido,
    getthinkByIdAndYear,
    boleta,
    getConst
}

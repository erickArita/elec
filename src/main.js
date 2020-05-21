


const { BrowserWindow, Notification } = require('electron');
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

async function getTablas(x, y) {

    try {

        const conn = await getConnection();
        const m = 'SELECT alumno.id_alumno,alumno.apellido_alumno,alumno.nombre_alumno,alumno.sexo_alumno,alumno.nacimiento_alumno,alumno.grado_alumno,alumno.modalidad_alumno,alumno.padre_alumno,alumno.domicilio_alumno,alumno_telefono,modalidad.modalidad_alumno FROM alumno INNER JOIN modalidad ON alumno.modalidad_alumno = modalidad.id_modalidad  WHERE grado_alumno =? AND modalidad.id_modalidad = ?';

        const result = await conn.query(m, [x, y]);


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
        }
    })
    window.loadFile('src/ui/index.html')
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

async function getthinkById(id) {
    try {
        const conn = await getConnection();
        const result = await conn.query('SELECT alumno.id_alumno,alumno.apellido_alumno,alumno.nombre_alumno,alumno.sexo_alumno,alumno.nacimiento_alumno,alumno.grado_alumno,alumno_telefono,alumno.modalidad_alumno,alumno.padre_alumno,alumno.domicilio_alumno FROM alumno INNER JOIN modalidad ON alumno.modalidad_alumno = modalidad.id_modalidad WHERE id_alumno = ?', id);
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

// ver notas

async function getNotas(g, m) {
    try {
        const conn = await getConnection();

        if (g < 10) {
            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno, n.matematicas,
            n.espanol,n.ingles,n.educacionart,n.tecnologia,n.cienciasnaturales,n.estudios_sociales,n.educacion_civica,
            n.educacion_fisicay_deportes FROM cole.notas AS n INNER JOIN cole.alumno AS a ON n.id_nota =a.ide_alumno where a.grado_alumno =? AND a.modalidad_alumno = ?`, [g, m]);

            console.log(nota)

            return nota;
        } if (g == 10 & m == 2) {
            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,an.alumno,
            an.matematicasi, an.biologiai, an.psicologia, an.informatica, an.quimicai,an.espanol,an.sociologia,an.fisicai,
            an.inglesi,an.filosofia,an.matematicasii,an.historia_honduras,an.biologiaii,an.quimicaii,an.espanolii,an.inglesii,
            an.orientacion_vo,an.fisicaii,an.lenguaje_art,an.educacion_fisica FROM cole.anofundamento as an INNER JOIN cole.alumno AS a ON an.alumno =a.ide_alumno WHERE a.grado_alumno =? AND a.modalidad_alumno = ?
            `, [g, m])
            console.log(nota)

            return nota;
        }
        // bch
        if (g == 11 & m == 3) {

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,
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

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,
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

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,
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

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,
             cf.id_alumnocf ,cf.matematica_aplicada ,cf.ingles_tec ,cf.lengua_literatura ,cf.administra_general ,
            cf.etica_orientacion ,cf.contabilidad_i ,cf.mercadotecnia ,cf.legislacion_bancaria ,cf.proyectos_presupuest ,
            cf.organizacion_trabajo ,cf.matematica_financiera ,cf.contabilidad_ii 
            FROM cole.btpcf AS cf INNER JOIN cole.alumno AS a ON cf.id_alumnocf =a.ide_alumno WHERE a.grado_alumno =? AND a.modalidad_alumno = ?
            `, [g, m])
            console.log(nota)
            return nota;
        }

        if (g == 11 & m == 7) {

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,
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

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,
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

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,
            cfii.alumnocf_ii,cfii.economiai,cfii.legislacion,cfii.operaciones_tributa,cfii.contabilidad_bancaria,cfii.administracion_finan_i,cfii.
             informatica_contable,cfii.administracion_finan_ii,cfii.servicio_cliente,cfii.contabilidad_costos,cfii.auditoria
             FROM cole.btpcf_ii AS cfii INNER JOIN cole.alumno AS a ON cfii.alumnocf_ii =a.ide_alumno WHERE a.grado_alumno =? AND a.modalidad_alumno = ?
            `, [g, m])
            console.log(nota)
            return nota;
        }
        // informatica 12
        if (g == 12 & m == 7) {

            const nota = await conn.query(`SELECT a.modalidad_alumno,a.grado_alumno, a.id_alumno,a.nombre_alumno,a.apellido_alumno,
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
            await conn.query('INSERT INTO bch(id_alumno) SELECT Max(ide_alumno) FROM alumno')
        }
        if (modalidad == 4) {
            await conn.query('INSERT INTO bchac(id_alumno) SELECT Max(ide_alumno) FROM alumno')
        }
        // filtrar alumnos de 11 y 12
        if (modalidad == 5 & grado == 11) {
            await conn.query('INSERT INTO btpae(alumno) SELECT Max(ide_alumno) FROM alumno')
        }

        if (modalidad == 6 & grado == 11) {
            await conn.query('INSERT INTO btpcf(id_alumnocf) SELECT Max(ide_alumno) FROM alumno')
        }
        if (modalidad == 7 & grado == 11) {
            await conn.query('INSERT INTO btpi(alumnoi) SELECT Max(ide_alumno) FROM alumno')
        }

        if (modalidad == 5 & grado == 12) {
            await conn.query('INSERT INTO btpae_ii(alumno) SELECT Max(ide_alumno) FROM alumno')
        }

        if (modalidad == 6 & grado == 12) {
            await conn.query('INSERT INTO btpcf_ii(alumno) SELECT Max(ide_alumno) FROM alumno')
        }
        if (modalidad == 7 & grado == 12) {
            await conn.query('INSERT INTO btpi_ii(alumno) SELECT Max(ide_alumno) FROM alumno')
        }


    } catch (error) {
        console.log(error);
    }

}

// asignar notas

module.exports = {
    createWindow,
    createAlumno,
    getAlumno,
    getTablas,
    deleteAlumno,
    getthinkById,
    updateAlumno,
    getNotas
}

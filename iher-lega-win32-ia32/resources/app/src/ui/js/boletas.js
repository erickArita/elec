const { remote } = require('electron')

const main = remote.require('./main')

function ponerYear() {
    let inputYear = document.getElementById('year')
    const now = new Date();
    const ano = now.getFullYear();
    console.log(inputYear)
    inputYear.value = ano;
}
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
const generar = document.getElementById('generarBtn')

let input = document.getElementById('intablaGrado');
let inputYear = document.getElementById('year')
let select = document.getElementById('tablaGrado');

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

const customTitlebar = require('custom-electron-titlebar');

// 2. Create the custom titlebar with your own settings
//    To make it work, we just need to provide the backgroundColor property
//    Other properties are optional.
let MyTitleBar = new customTitlebar.Titlebar({
    backgroundColor: customTitlebar.Color.fromHex('#000000'),
    shadow: true,

    overflow: "hidden",
    menu: false
});



const pedir = document.getElementById('bolerOrConst')
pedir.addEventListener('click', () => {
    console.log(pedir.value)
})




generar.addEventListener('click', async () => {


    const pedir = document.getElementById('bolerOrConst').value
    if (pedir == 1) {
        const grado = input.value;
        const modalidad = select.value;
        const yea = document.getElementById('year').value

        await main.getConst(grado, modalidad, parseInt(yea))
    }

    if (pedir == 0) {
        let semestre = document.getElementById('semestre').value

        const grado = input.value;
        const modalidad = select.value;
        const year = document.getElementById('year').value

        console.log(grado, modalidad, parseInt(year), semestre)

        await main.boleta(grado, modalidad, parseInt(year), semestre)
    }

})




let date = new Date();
let da = date.getDate()
 
 console.log(   da)
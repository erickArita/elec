const { remote } = require('electron')

const main = remote.require('./main')

function ponerYear() {
    let inputYear = document.getElementById('year')
    const now = new Date();
    const ano = now.getFullYear();
    console.log(inputYear)
    inputYear.value = ano;
}

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
    icon: '../logo-2.png',
    overflow: "hidden",
    menu: false
});

// 3. Update Titlebar text
MyTitleBar.updateTitle(`IHER LEGA  `);
generar.addEventListener('click',async  () => {
    let semestre=document.getElementById('semestre').value

    const grado = input.value;
    const modalidad = select.value;
    const year = document.getElementById('year').value
   
    console.log(grado, modalidad, parseInt(year),semestre)

 await main.boleta(grado, modalidad, parseInt(year),semestre)
  
   
})








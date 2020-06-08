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
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
MyTitleBar.updateTitle(`IHER LEGA`);
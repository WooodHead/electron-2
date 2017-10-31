const {app, BrowserWindow, Tray, Menu} = require('electron');

let win = null;
let tray = null;
const templeat = [
    {
        label: 'Item1'
    },
    {
        label: 'Item2',
        type: 'checkbox',
        checked: true
    },
    {
        type: 'separator'
    },
    {
        label: 'Item3',
        click: () => {
            console.log('Itme3 click');
            app.quit();
        }
    }
];

app.on('ready', () => {
    console.log('ready');
    win = new BrowserWindow();
    tray = new Tray(`${__dirname}/icon.png`);

    // tray.on('click', () => {
    //     console.log('click');
    // });
    tray.on('right-click', () => {
        console.log('right-click');
    });

    const menu = Menu.buildFromTemplate(templeat);
    tray.setContextMenu(menu);
})

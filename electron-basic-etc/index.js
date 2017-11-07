const {app, BrowserWindow, shell} = require('electron');

app.on('ready', () => {
    console.log('ready');

    const win = new BrowserWindow();
    win.loadURL(`file://${__dirname}/index.html`);
    win.webContents.openDevTools();

    console.log(win.id);

    /*
    setTimeout(() => {
        shell.openExternal('https://protopie.io');
    }, 3000);
    */

});

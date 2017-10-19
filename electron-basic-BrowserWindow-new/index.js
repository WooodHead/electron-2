const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
    console.log('ready');

    const mainWindow = new BrowserWindow({
        width: 600,
        height: 600
    });

    mainWindow.loadURL('https://github.com')

    const secondWindow = new BrowserWindow({
        width: 300,
        height: 300,
        x: 0,
        y: 0,
        minWidth: 200,
        minHeigth: 200,
        maxWidth: 500,
        maxHeight: 500,
        moveable: false,
        title: 'second'
    });
    secondWindow.loadURL(`file://${__dirname}/second.html`)
})

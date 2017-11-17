const {app, BrowserWindow} = require('electron');
const data = [
    {
        type: 'home',
        url: 'https://github.com',
        title: '타이틀'
    },
    {
        type: 'home',
        url: 'https://github.com',
        title: '타이틀'
    },
    {
        type: 'github',
        url: 'https://github.com',
        title: '타이틀'
    }
];//Array

app.on('ready', () => {
    const win = new BrowserWindow({
        width: 400,
        height: 400,
        acceptFirstMouse: true,
        titleBarStyle: 'hidden',
        show: false
    });
    win.loadURL(`file://${__dirname}/index.html`);
    win.once('ready-to-show', () => {//맨처음 한번만 부르게 되므로 on이 아닌 once로 처리함
        win.show();
        win.webContents.send('update', data);
    })
})

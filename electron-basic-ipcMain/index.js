const {app, BrowserWindow, ipcMain} = require('electron');

app.on('ready', () => {
    console.log('ready');

    const win = new BrowserWindow();
    win.loadURL(`file://${__dirname}/index.html`);
    win.webContents.openDevTools();

    ipcMain.on('send_async_channel', (event, message) => {
        console.log(message);
        //event.sender.send('reply_async_chnnel', '이것은 메인프로세스에서 보낸 비동기 대답입니다.');
        win.webContents.send('reply_async_chnnel', '이것은 메인프로세스에서 보낸 비동기 대답입니다.');
    })

    ipcMain.on('send_sync_channel', (event, message) => {
        console.log(message);
        event.returnValue = '이것은 메인프로세스에서 보낸 동기 대답입니다';

    })

    setInterval(() => {
        win.webContents.send('reply_async_chnnel', '이것은 메인프로세스에서 보낸 비동기 대답입니다.');
    })
})

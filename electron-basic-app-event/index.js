const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

function createWindow () {
    // renderer process 생성
    console.log('Create window');
    mainWindow = new BrowserWindow({width: 800, height: 600})

    // renderer process 에 로딩할 컨텐츠 삽입
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}


app.on('will-finish-launching', () => {//mac os
    console.log('will-finish-launching');
});

/* main process 생성 완료 이벤트 바인딩 */
app.on('ready', createWindow);

app.on('window-all-closed', () => {
    console.log('Window all close');

    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('before-quit', event => {
    //event.preventDefault();
    console.log('before-quit');
});

app.on('will-quit', event => {
    //event.preventDefault();
    console.log('will-quit');
});

app.on('quit', (event, exitCode) => {
    console.log(`quit : ${exitCode}`);
});

app.on('activate', (event, hasVisibleWindows) => { //mac os
    console.log(`activate : ${hasVisibleWindows}`);
});

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

/* main process 생성 완료 이벤트 바인딩 */
app.on('ready', createWindow)

/* 모든 윈도우가 닫히자 마자 불림 */
app.on('window-all-closed', () => {
    console.log('Window all close');

    if (process.platform !== 'darwin') {
        app.quit()
    }
})

/* 앱 종료가 시작되어서 앱의 모든 위도우들을 클로즈 하기 시작할때 불림. 이미 닫혀 있어도 불린다. */
app.on('before-quit', (e) => {
    console.log('before-quit');
})

// 모든 윈도우가 닫히고 나서 메인 앱 프로세스 종료하기 직전 불림
app.on('will-quit',(e) => {
    console.log('will-quit');
})


// 최종적으로 종료되면서 불림
app.on('quit', (e, exitCode) => {
    console.log(`quit : ${exitCode}`);
})

/*
    [macOS]
    dock 에서 어플리케이션 아이콘을 클릭하면 발생하는 이벤트
 */
app.on('activate', (e, hasVisibleWindows) => {
    /*
        열려있는 윈도우가 있으면, hasVisibleWindows 가 true
        없으면, hasVisibleWindows 가 false
    */
    console.log(`activate : ${hasVisibleWindows}`);
    if (mainWindow === null) {
        createWindow()
    }
})

const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
	console.log('ready');

	const win = new BrowserWindow();
	win.loadURL(`file://${__dirname}/index.html`);

	win.webContents.openDevTools();//개발자도구 오픈
})

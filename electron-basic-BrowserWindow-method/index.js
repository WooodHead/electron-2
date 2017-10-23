const {app, BrowserWindow} = require('electron');

app.on('ready', () => {
	console.log('ready');

	const first = new BrowserWindow();
	first.loadURL(`file://${__dirname}/index.html`);

	const second = new BrowserWindow();
	second.loadURL(`file://${__dirname}/index.html`);
})

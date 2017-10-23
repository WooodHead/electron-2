const {app, BrowserWindow} = require('electron');
let win = null
app.on('ready', () => {
	console.log('ready');

	const win = new BrowserWindow({
		show: false
	});

	win.loadURL(`file://${__dirname}/index.html`)
	win.on('ready-to-show', () => {
		console.log('ready-to-show');
		win.show();
	});

	win.on('show', () => {
		console.log('show');
	});

	win.on('hide', () => {//mac os
		console.log('hide');
	});

	win.on('close', () => {
		console.log('close');
	});

	win.on('closed', () => {
		console.log('closed');
	});

	win.on('focus', () => {
		console.log('focus');
	});

	win.on('blur', () => {
		console.log('blur');
	});

	win.on('move', () => {
		console.log('move');
	});

	win.on('moved', () => {// mac os 도착했을때
		console.log('moved');
	});
});

app.on('activate', (event, hasVisibleWindows) => {
	console.log('activate');
	if (!hasVisibleWindows) {
		win.show();
	}
})

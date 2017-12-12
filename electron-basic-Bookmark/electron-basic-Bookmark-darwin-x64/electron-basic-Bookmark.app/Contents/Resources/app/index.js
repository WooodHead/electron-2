const {app, BrowserWindow, ipcMain, dialog, Tray, Menu, clipboard} = require('electron');
const request = require('superagent');//module import
const getTitle = require('get-title');
const fs = require('fs');
const path = require('path');
const DATA_PATH = path.join(__dirname, './data.json');

const data = JSON.parse(fs.readFileSync(DATA_PATH).toString())//Array

let win = null;
let tray = null;

const template = [
    {
        label: 'Open',
        click: () => {
            win.show();
        }
    },
    {
        label: 'Save',
        submenu: [
            {
                label: 'Home',
                click: () => {
                    const item = {
                        type: 'home',
                        url: clipboard.readText()
                    };
                    save(item);
                }
            },
            {
                label: 'Github',
                click: () => {
                    const item = {
                        type: 'github',
                        url: clipboard.readText()
                    };
                    save(item);
                }
            }
        ]
    },
    {
        type: 'separator'
    },
    {
        label: 'Quit',
        click: () => {
            app.quit();
        }
    }
];

const context = [
    {
        label: app.getName(),
        submenu: [
            {role: 'paste'},
            {type: 'separator'},
            {
                label: 'Quit',
                click: () => {
                    app.quit();
                }
            }
        ]
    }
];

app.on('ready', () => {
    Menu.setApplicationMenu(Menu.buildFromTemplate(context));
    const menu = Menu.buildFromTemplate(template);
    tray = new Tray(path.join(__dirname, './icon.png'));
    tray.setContextMenu(menu);
    tray.on('right-click', () => {
        toggle();
    });
    const bounds = tray.getBounds();
    win = new BrowserWindow({
        width: 400,
        height: 400,
        x: bounds.x + (bounds.width / 2) - 200,//맥일때 기준이므로 윈도우에서 확인이 필요함
        y: bounds.y + bounds.height + 10 ,
        acceptFirstMouse: true,
        titleBarStyle: 'hidden',
        show: false,
        resizeble: false,
        movable: false,
        frame: false
    });
    win.loadURL(`file://${__dirname}/index.html`);
    win.once('ready-to-show', () => {//맨처음 한번만 부르게 되므로 on이 아닌 once로 처리함
        win.webContents.send('update', data);//update-채널
    })

    ipcMain.on('paste', (event, item) => {
        save(item);
    });

    ipcMain.on('remove', (event, removeId) => {
        data.splice(removeId, 1);
        fs.writeFileSync(DATA_PATH, JSON.stringify(data));
        win.webContents.send('update', data);
    });
});

function toggle() {
    if (win.isVisible()) {
        win.hide();
    } else {
        win.show();
    }
}

function save(item) {
    if (item.url.indexOf('http://') > -1 || item.url.indexOf('https://') > -1) {
        const type = item.type;
        const url = item.url;
        request.get(url)
            .end((err, response) => {
                const contents = response.res.text;
                getTitle(contents).then(title => {
                    data.push({type, url, title});
                    win.webContents.send('update', data);
                    fs.writeFileSync(DATA_PATH, JSON.stringify(data));
                });
            });

    } else {
        dialog.showErrorBox('경고', '유효한 URL이 아닙니다.');
    }
}

const {app, BrowserWindow, Menu, MenuItem} = require('electron');
const path = require('path');

function createWindow() {
    const index = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    index.loadFile('index.html');
}
function new_prj_window() {
    const new_prj_window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    new_prj_window.loadFile('new.html');
}
const template = [
    {
        label: 'file',
        submenu: [
            {
                label: 'new project',
                click: async () => {
                    new_prj_window();
                },
            },
            {
                label: 'open',
            },
        ],
    },
    {
        label: 'Edit',
        submenu: [
            {
                type: 'separator',
            },
            {
                role: 'undo',
            },
            {
                role: 'redo',
            },
            {
                type: 'separator',
            },
            {
                role: 'cut',
            },
            {
                role: 'copy',
            },
            {
                role: 'paste',
            },
        ],
    },
    {
        label: 'View',
        submenu: [
            {
                role: 'toggledevtools',
            },
        ],
    },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
app.on('ready', createWindow);

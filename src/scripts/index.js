// index.js

const fs = require('fs');
const parser = require('csv-parser');

//Modulo para controlar el ciclo de vida de la aplicacion y la creacion de una BrowserWindow
const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    // Crear un BrowserWindow
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreen:true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    })
    // Carga de la vista de la app (index.html)
    console.log(__dirname)
    mainWindow.loadFile('src/views/index.html')

    // Abrir DevTools.
    //mainWindow.webContents.openDevTools()
    //mainWindow.webContents.cl
}

// Metodo para abrir la ventana
app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Metodo para cerrar ventana
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// Resto del codigo...

const data = [];
fs.createReadStream(path.join('./src/assets/TiemposPrueba.csv'))
    .pipe(parser({
        separator: ',',
        newline: '\n',
        skipLines: 3,
        headers: ['name', 'surname', 'age', 'sale'],
    }))
    .on('data', row => data.push(row))
    .on('end', () => console.log(data))
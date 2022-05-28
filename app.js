const {app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    resizable: false,
    width: 1000,
    height: 700,
    frame: false,
    webPreferences: {
      nodeIntegration:true,
      contextIsolation: false
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile(__dirname+'/web/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  mainWindow.show();
  mainWindow.webContents.on('did-finish-load', () => {
    fs.readFile("./config.json","utf-8",(err,data)=>{
      if (err) {
        if (err.code==='ENOENT') {
          fs.writeFile("./config.json",'{"sowner":"","sdir":"./servers","latest":0,"servers":[{"name":"name","dir":"./servers","owner":"owner","custom":[0,4,3],"eula":true}]}',()=>{});
          data='{"sowner":"","sdir":"./servers","latest":0,"servers":[{"name":"name","dir":"./servers","owner":"owner","custom":[0,5,3],"eula":true}]}';
        }
      }
      mainWindow.webContents.send("loadConfig",data);
    });
  })
});
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
    // Send the config to the renderer side.
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

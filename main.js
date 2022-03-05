const {app,BrowserWindow ,Menu , ipcMain, ipcRenderer} = require('electron');
const path = require('path');
require('electron-reload')(__dirname); //hot reload


function createWindow(){
    let win  = new BrowserWindow({
        width: 1000, 
        height: 600,
        minHeight: 600,
		minWidth: 1000,
        webPreferences: {
            preload:path.join(__dirname,'preload.js'),
		nodeIntegration: true,
        contextIsolation:false
	    },
        // frame:false
    })
    win.setMenu(null);
    win.loadFile('index.html')
    
    //dark-mode
    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
          nativeTheme.themeSource = 'light'
        } else {
          nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
      })
    
      ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
      })

    
    win.openDevTools();
}
// function Process() {
//     const process = require('child_process');
//     var ls = process.spawn('print.bat');
//     ls.stdout.on('data', function (data) {
//         console.log(data);
//     });
//     ls.stderr.on('data', function (data) {
//         console.log(data);
//     });
//     ls.on('close', function (code) {
//         if (code == 0)
//             console.log('Stop');
//         else
//             console.log('Start');
//     });
// };
// Process();

app.on('ready', ()=>{
	createWindow()
    const template = [
        {
            label:'File',
            submenu:[
                {
                    label:'Settings',
                    click:async()=>{
                        function create2ndwindow(){

                            let win2= new BrowserWindow({
                                width:200,
                                height:300,
                                autoHideMenuBar:true,
                                frame:false
                            })
                            
                        }
                       app.on('ready',create2ndwindow())
                    }
                },
                {
                    type:'separator'
                },
                {
                role:'about'
                },
                {
                    label: 'Learn More',
                    click: async () => {
                      const { shell } = require('electron')
                      await shell.openExternal('https://electronjs.org')
                }},
                {
                    role:'quit'
                }
            ]
        }
    ]
    const menu =Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
});
app.on('window-all-closed', function(){
	if(process.platform!=='darwin'){
		app.quit();
	}
});
app.on('activate', function(){
	createWindow();
});

// // 1. Require the installed module
// const customTitlebar = require('custom-electron-titlebar');

// // 2. Create the custom titlebar with your own settings
// //    To make it work, we just need to provide the backgroundColor property
// //    Other properties are optional.
// let MyTitleBar = new customTitlebar.Titlebar({
//     backgroundColor: customTitlebar.Color.fromHex('#444444'),
//     shadow: true,
//     closeable:true 
// });

// // 3. Update Titlebar text
// MyTitleBar.updateTitle('PC-Cleaner');

//CPU
const checkDiskSpace = require('check-disk-space').default
const os = require('os');
const fs = require('fs');
 const cpuName = document.getElementById('CPU-Name');
 const cpuCores = document.getElementById('CPU-core');

 const cpus =os.cpus();

cpuName.innerHTML=`CPU: ${cpus[0].model}`;
cpuCores.innerHTML=`Cores: ${cpus.length}`;

function Process() {
    const process = require('child_process');
    var ls = process.spawn('print.bat');
    ls.stdout.on('data', function (data) {
        console.log(data);
    });
    ls.stderr.on('data', function (data) {
        console.log(data);
    });
    ls.on('close', function (code) {
        if (code == 0)
            console.log('Stop');
        else
            console.log('Start');
    });
};
checkDiskSpace('C:/blabla/bla').then((diskSpace) => {
  console.log(diskSpace)
})
let darkMode = localStorage.getItem('darkMode'); 

const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
  // 1. Add the class to the body
  document.body.classList.add('darkmode');
  // 2. Update darkMode in localStorage
  localStorage.setItem('darkMode', 'enabled');
}

const disableDarkMode = () => {
  // 1. Remove the class from the body
  document.body.classList.remove('darkmode');
  // 2. Update darkMode in localStorage 
  localStorage.setItem('darkMode', null);
}
 
// If the user already visited and enabled darkMode
// start things off with it on
if (darkMode === 'enabled') {
  enableDarkMode();
}

// When someone clicks the button
darkModeToggle.addEventListener('click', () => {
  // get their darkMode setting
  darkMode = localStorage.getItem('darkMode'); 
  
  // if it not current enabled, enable it
  if (darkMode !== 'enabled') {
    enableDarkMode();
  // if it has been enabled, turn it off  
  } else {  
    disableDarkMode(); 
  }
});

// //Dark-Mode
// document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
//     const isDarkMode = await window.darkMode.toggle()
//   })
  
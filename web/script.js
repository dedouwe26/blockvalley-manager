const electron = require("electron");
const ipc = electron.ipcRenderer;

let standardDir = "C:/";
let standardOwner = "";
let serverList = [];

ipc.on("loadConfig",(e,config)=>{
    console.log("[IPC]: Renderer < Main: loadConfig: ...")
    standardDir=config.sdir;
    standardOwner=config.sowner;
    serverList=config.servers
    loadServers(serverList);
});
window.onload = ()=>{
    document.getElementsByClassName("standard-dir")[0].children[2].textContent = standardDir;
}
function loadServers() {
    for (let index = 0; index < serverList.length; index++) {
        const server = serverList[index];
        document.getElementsByClassName("grid")[0].innerHTML+='<div class="server" onclick="openServer('+index+')"><span class="s-name">'+server.name+'</span><br><span class="s-owner">Owner: '+server.owner+'</span><br><div class="s-icons"><div class="s-icon"></div><div class="s-icon"></div><div class="s-icon"></div><div class="s-icon"></div><div class="s-icon"></div></div>'
    }
}
function openServer(a) {
    for (let index = 0; index < array.length; index++) {
        const server = serverList[index];
        if (index===a) {
            // open server screen
        }
    }
}
function openMenu () {
    document.getElementById('menu-container').show();
}
function closePopup (el) {
    el.close();
}
function openDashboard () {
    document.getElementsByClassName('servers')[0].style.display='none';
    document.getElementsByClassName('dashboard')[0].style.display='block';
    document.getElementsByClassName('title-box')[0].children[1].textContent='Dashboard';
}
function openServers () {
    document.getElementsByClassName('dashboard')[0].style.display='none';
    document.getElementsByClassName('servers')[0].style.display='block';
    document.getElementsByClassName('title-box')[0].children[1].textContent='Servers';
}
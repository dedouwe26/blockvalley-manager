const electron = require("electron");
const ipc = electron.ipcRenderer;

let standardDir = "";
let standardOwner = "";
let serverList = [];
let memoryUsed = '';

ipc.on("loadConfig",(e,json,memoryUsed)=>{
    config = JSON.parse(json);
    console.log("[IPC]: Renderer < Main: loadConfig: ...")
    standardDir=config.sdir;
    standardOwner=config.sowner;
    console.log(standardDir);
    serverList=config.servers
    memoryUsed=this.memoryUsed;
    load();
});
function load() {
    document.getElementsByClassName("standard-dir")[0].children[2].textContent = standardDir;
    document.getElementsByClassName("memory")[0].children[2].textContent = memoryUsed;
    loadServers();
}

function loadServers() {
    for (let index = 0; index < serverList.length; index++) {
        const server = serverList[index];
        document.getElementsByClassName("grid")[0].innerHTML+='<div class="server" onclick="openServer('+index+')"><span class="s-name">'+server.name+'</span><br><span class="s-owner">Owner: '+server.owner+'</span><br><div class="s-icons"><div class="s-icon"></div><div class="s-icon"></div><div class="s-icon"></div><div class="s-icon"></div><div class="s-icon"></div></div>'
    }
}
function openServer(a) {
    for (let index = 0; index < serverList.length; index++) {
        const server = serverList[index];
        if (index===a) {
            info=document.getElementsByClassName("server-info")[0]
            for (let i = 0; i < server.custom.length; i++) {
                const number = server.custom[i];
                document.getElementsByClassName('i-icons-con')[0].children[number].classList.add('enabled');
            }
            
            info.parentElement.show()
        }
    }
}
function openMenu () {
    document.getElementById('menu-container').show();
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
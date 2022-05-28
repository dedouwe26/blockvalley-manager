const electron = require("electron");
const ipc = electron.ipcRenderer;

let standardDir = "";
let standardOwner = "";
let serverList = [];
let memoryUsed = '';

function get(c) {
    return document.getElementsByClassName(c)[0];
}

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
    get("standard-dir").children[2].textContent = standardDir;
    get("memory").children[2].textContent = memoryUsed;
    loadServers();
}

function loadServers() {
    for (let index = 0; index < serverList.length; index++) {
        const server = serverList[index];
        get("grid").innerHTML+='<div class="server" onclick="openServer('+index+')"><span class="s-name">'+server.name+'</span><br><span class="s-owner">Owner: '+server.owner+'</span><br><div class="s-icons"><div class="s-icon"></div><div class="s-icon"></div><div class="s-icon"></div><div class="s-icon"></div><div class="s-icon"></div></div>'
    }
}
function openServer(a) {
    const server = serverList[a];
    info=get("server-info")
    get("i-name").textContent = server.name
    get("i-owner").textContent = server.owner
    get('i-dir').children[2].textContent = server.dir
    for (let i = 0; i < server.custom.length; i++) {
        const number = server.custom[i];
        get('i-icons-con').children[number].classList.add('enabled');
    }      
    info.parentElement.show()
}

function openMenu () {
    document.getElementById('menu-container').show();
}
function openDashboard () {
    get('servers').style.display='none';
    get('dashboard').style.display='block';
    get('title-box').children[1].textContent='Dashboard';
}
function openServers () {
    get('dashboard').style.display='none';
    get('servers').style.display='block';
    get('title-box').children[1].textContent='Servers';
}
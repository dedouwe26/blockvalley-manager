window.onload = ()=>{

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
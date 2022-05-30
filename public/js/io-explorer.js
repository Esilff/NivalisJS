var path = '.-';
var targetFolder;
const menu = document.querySelector('#menu');
const contentDisplayer = document.querySelector('#folder-content');
const zoomController = document.querySelector('#zoom-controller');
const optionMenu = document.querySelector('#options-menu');
const creator = document.querySelector('#creator');

/* --- Getting root content on load ---  */

window.addEventListener('load', () => {
    setPathSelector(path);
    setFolderContent(path);
});

window.addEventListener('contextmenu', (e)=> {
    e.preventDefault();
    optionMenu.style.left = e.x + 'px';
    optionMenu.style.top = e.y + 'px';
    showMenu(optionMenu);
}, false);

window.addEventListener('click', (e)=> {
    disableMenuOnClick(optionMenu, e);
    if (!isHidden(optionMenu)) disableMenuOnClick(creator, e);
})


/* ----- UTIL FUNCTIONS ----- */


function displayCreator() {
    hideMenu(optionMenu);
    showMenu(creator);
}

async function createContent() {
    const name = document.querySelector('#name-input').value;
    console.log('Filename to create : ', name);
    if (name != '')
    fetch(`http://localhost:5050/io/create/${path}/${name}`);
    hideMenu(creator);
    contentDisplayer.innerHTML = '';
    setFolderContent(path);
}

/**
 * Updates the ui using the new path passed in parameter. Used in case of a double click on a folder or on a click in the path selector.
 * @param {String} newPath The new path to explore.
 * @returns null if newPath is not a string, else nothing.
 */

function updatePath(newPath) {
    if (typeof newPath !== 'string')  {
        console.log('Path has to be a string');
        return null;
    }
    console.log("Update path : ",path, newPath);
    path = newPath;
    
    menu.innerHTML = '';
    contentDisplayer.innerHTML = '';
    setPathSelector(path);
    setFolderContent(path);
    
    return;
}


/**
 * Takes a path and reload the path selector menu at the top of the io-explorer.
 * @param {String} path The path to display
 */

function setPathSelector(path) {
    if (typeof path !== 'string')  {
        console.log('Path has to be a string');
        return null;
    }
    let html = '<div id="path-selector">';
    if (path == '.-') html += `<h2 class="root">./</h2>`
    else {
        console.log("Path to structure : ",path)
        let structuredPath =  path.split(/--|-/g);
        console.log("Structured path :",structuredPath);
        let onclickPath = '.-';
        for (let i = 0; i < structuredPath.length; i++) {
            if (structuredPath[i] == ".") html += `<h2 class="folder-selector root" onclick="updatePath('.-')">./</h2>`;
            else {
                onclickPath += structuredPath[i];
                html += `<h2 class="folder-selector" onclick="updatePath('${onclickPath}')">${structuredPath[i]}</h2>${(i >= structuredPath.length - 1)?'':'<h2>/</h2>'}`
            };
        }
    }
    html += '</div>';
    menu.innerHTML += html;
}


/**
 * Take a folder path in parameter and send a request to the node server in order to get the content of the folder.
 * The response is transformed in html content and then a double click event is added in order to get IO navigation.
 * This function is firstly used on load to access the rootpath of the project. Else, it's used in the update function
 * when a double click on folder occurs or when a click on a path node (in the navbar) occurs.
 * @param {String} path A path to a folder
 * @returns The content of the folder.
 */

async function setFolderContent(path) {
    //Verif string
    if (typeof path !== 'string')  {
        console.log('Path has to be a string');
        return null;
    }
    //console.log('Waiting for answer from the server');
    //Demande serv
    let files = await fetch(`http://localhost:5050/filepath/${path}`, {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
    console.log("Files : ",files);

    //Init html
    for (let i = 0; i < files.content.length; i++) {
        let html;
        if (files.content[i].indexOf('.') == 0) {continue;}
        if (files.content[i].indexOf('.') < 0) {
            html = `<div class="logo-container folder">
                        <img src="./assets/logo/folder.svg">
                        <p>${files.content[i]}</p>
                    </div>`;
        }
        else {
            html = `<div class="logo-container file">
                        <img src="./assets/logo/${files.content[i].substring(files.content[i].indexOf('.') + 1) + '.svg'}">
                        <p>${files.content[i]}</p>
                    </div>`;
        }
        console.log('HTML : ', html);
        contentDisplayer.innerHTML += html;
        
    }
    let folders = contentDisplayer.getElementsByClassName('folder');
    let fileList = contentDisplayer.getElementsByClassName('file');
    for (let i = 0; i < fileList.length;i++) {
        console.log("File : ", fileList[i]);
        fileList[i].addEventListener('dblclick',async () => {
            if (window.location !== window.parent.location) {
                console.log("Message path :", path+fileList[i].lastElementChild.textContent.toString());
                const message = await fetch(`http://localhost:5050/filepath/${path+fileList[i].lastElementChild.textContent.toString()}`)
                console.log("Message : ", message);
            }
            else console.log('not in iframe');
        })
    }
    for (let i = 0; i < folders.length; i++) {
        let nextPath = path + '-' + folders[i].lastElementChild.textContent.toString();
        console.log('Next path :', nextPath);
        folders[i].addEventListener('dblclick', () => updatePath(nextPath.toString()));
        folders[i].addEventListener('click', ()=> {changeTarget(folders[i])});
    };
}

/**
 * Check if the position of the mouse is in menu or not, if it's not, it will hide themenu.
 * This function is used and only has to be used during an onclick event.
 * @param {MouseEvent} e the mouse
 */

function disableMenuOnClick(menu, e) {
    let rect = menu.getBoundingClientRect();
    let menuX = rect.left;
    let menuY = rect.top;
    let width = menu.clientWidth;
    let height = menu.clientHeight;
    //console.log('Mouse var :',e.x,e.y,"Menu var :",optionMenuX,optionMenuY, width, height);
    if (e.x < menuX || e.x > menuX + width || e.y < menuY || e.y > menuY + height) {
        menu.style.opacity = 0;
        setTimeout(()=>menu.style.display = 'none',200);
    }
}

/**
 * Take a menu in parameter and show it.
 * @param {*} menu html element to be shown.
 */

function showMenu(menu) {
    menu.style.display = 'block';
    menu.style.opacity = 1;
}

/**
 * Take a menu in parameter and hide it.
 * @param {*} menu html element that has to disappear.
 */

function hideMenu(menu) {
    menu.style.opacity = 0;
    setTimeout(()=>menu.style.display = 'none',200);
}

/**
 * Check if an html element is hidden or not.
 * @param {*} menu 
 * @returns true if hidden, false if not.
 */

function isHidden(menu) {
    return (menu.style.opacity == 1 || menu.style.display != 'none')?true:false;
}


/* --- zoom controller slide --- */

function onSliderDown(event) {
    zoomController.addEventListener('mousemove', moveSlider);
    zoomController.addEventListener('mouseup', onSliderUp);

    let prevX = event.x;
    

    function moveSlider(event) {
        let newX = prevX - event.x;
        if (parseInt(zoomController.style.left) > 0 || parseInt(zoomController.style.left) < 96)
        zoomController.style.left = zoomController.style.left + newX + '%';
    }

    function onSliderUp() {
        zoomController.removeEventListener('mousemove', moveSlider);
        zoomController.removeEventListener('mouseup', onSliderUp);
    }
}



zoomController.addEventListener('mousedown', onSliderDown);



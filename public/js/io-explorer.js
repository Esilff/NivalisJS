var path = '';
const menu = document.querySelector('#menu');
const contentDisplayer = document.querySelector('#folder-content');
const zoomController = document.querySelector('#zoom-controller');

/* --- Getting root content on load ---  */

window.addEventListener('load', () => {
    setPathSelector(path);
    setFolderContent(path);
});


/* ----- UTIL FUNCTIONS ----- */

/**
 * Updates the ui using the new path passed in parameter. Used in case of a double click on a folder or on a click in the path selector.
 * @param {String} newPath The new path to explore.
 * @returns null if newPath is not a string, else nothing.
 */

function updatePath(newPath) {
    if (newPath !== '')  {
        console.log('Path has to be a string');
        return null;
    }
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
    if (path !== '')  {
        console.log('Path has to be a string');
        return null;
    }
    let html = '<div id="path-selector">';
    if (path == '') html += `<h2>./</h2></div>`;
    menu.innerHTML += html;
}

/**
 * 
 * @param {String} path A path to a folder
 * @returns The content of the folder.
 */

async function setFolderContent(path) {
    if (path !== '')  {
        console.log('Path has to be a string');
        return null;
    }
    console.log('Waiting for answer from the server');
    let files = await fetch('http://localhost:5050/filepath/:path', {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => response.json());
    console.log(files);
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
            html = `<div class="logo-container">
                        <img src="./assets/logo/${files.content[i].substring(files.content[i].indexOf('.') + 1) + '.svg'}">
                        <p>${files.content[i]}</p>
                    </div>`;
        }
        contentDisplayer.innerHTML += html;
        
    }
    let folders = contentDisplayer.getElementsByClassName('folder');  
    for (let i = 0; i < folders.length; i++) {
        let nextPath = path + '/' + folders[i].lastElementChild.textContent.toString();
        console.log(nextPath);
        folders[i].addEventListener(('dblclick', (event, bis)=> {updatePath(nextPath)}));
    };
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



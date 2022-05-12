var path = '';
const menu = document.querySelector('#menu');
const contentDisplayer = document.querySelector('#folder-content');
const zoomController = document.querySelector('#zoom-controller');

/* --- Getting root content on load ---  */

window.addEventListener('load', async() => {
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
            html = `<div class="logo-container">
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
        console.log(html);
        contentDisplayer.innerHTML += html;
    }
});

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



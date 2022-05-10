let files;
window.onload = async () => {
    files = await fetch('http://localhost:5050');
    console.log(files.json().content);
}




const leftPannel = document.querySelector('#scene-explorer');
const rightPannel = document.querySelector('#object-details');
const leftGutter = document.querySelector('#scene-gutter');
const rightGutter = document.querySelector('#object-gutter');


function leftResize(e) {
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

    let prevX = e.x;
    const leftBounds = leftPannel.getBoundingClientRect();

    function mousemove(e) {
        let newX = prevX -e.x;
        leftPannel.style.width = leftBounds.width - newX + 'px';
    }

    function mouseup() {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);
        
    }

    
}

leftGutter.addEventListener('mousedown',leftResize);
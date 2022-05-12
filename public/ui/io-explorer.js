var path = '@/';

window.addEventListener('load', async() => {
    console.log('Waiting for answer from the server');
    let files = await fetch('http://localhost:5050/filepath', {
        headers : {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : path
    }).then(response => response.json());
    console.log(files);

});
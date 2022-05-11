window.addEventListener('load', async() => {
    console.log('Waiting for answer from the server');
    let files = await fetch('http://localhost:5050').then(response => response.json());
    console.log(files);

});
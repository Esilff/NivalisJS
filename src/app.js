const express = require('express');
const app = express();
const IO = require('./engine/fileIO/IO.js');
const port = 5050;

app.use('/static', express.static('./public'));

app.get('/', async (req, res) =>{
  let fileContent = IO.getDirContent('./');
  console.log(fileContent.then());
  res.status(200).json({content: fileContent});
  
  res.end();
  /*let fileList = IO.getDirContent('./');
  res.status(200).json({content: fileList});*/
  
});

app.listen(port, 'localhost' , () => {
  console.log(`Example app listening on port ${port}`);
})

/*
fs.readFile('./index.html', function(err, html) {
    
    if (err) throw err;
        http.createServer((req, res) => {
        res.writeHeader(200, {"Content-Type":"text/html"});
        res.write(html);
        res.end();
      }).listen(PORT);
});
*/

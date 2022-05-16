const express = require('express');
const app = express();
const IO = require('./engine/fileIO/IO.js');
const fp = require('./engine/fileIO/FileParser.js');
const PATH = require('path');
const port = 5050;

app.use('/static', express.static('./public'));

app.get('/', async (req, res) =>{
  let fileContent = await IO.getDirContent("./");
  res.status(200).json({content: fileContent});
  
  res.end();
  /*let fileList = IO.getDirContent('./');
  res.status(200).json({content: fileList});*/
  
});

app.get('/filepath/:path', async(req,res) => {
  console.log(req.params);
  let path = req.params.path;
  path = path.replace(/-/g, '/');
  
  
  
  
  let folderContent = await IO.getDirContent(PATH.resolve(path));
  console.log(folderContent);
  res.status(200).json({content : folderContent});
  res.end();
})

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

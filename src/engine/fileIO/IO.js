const fs = require('fs/promises');
const path = require('path');

async function readFile(path) {  
    try {
        let fileContent;
        await fs.readFile(path).then((result) => {fileContent = result.toString()});
        console.log(fileContent);
        return fileContent;
    } catch(err) {
        console.err(err);
        return null;
    }
}

async function getDirContent(dir) { 
    try {
        let dirContent = await fs.readdir(dir).then(value => {return JSON.stringify(value)})
    } catch(err) {
        console.log(err);
    }
    
}

module.exports = {readFile, getDirContent};
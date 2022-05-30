const fs = require('fs.promises');
const path = require('path');

async function readFile(path) {  
    try {
        let fileContent;
        await fs.readFile(path).then((result) => {fileContent = result});
        console.log(fileContent.toString());
        return fileContent;
    } catch(err) {
        console.err(err);
        return null;
    }
}

async function getDirContent(dir) { 
    let dirContent;
    try {
        await fs.readdir(dir).then(value => {dirContent = value});
    } catch(err) {
        console.log(err);
    }
    return dirContent;
}

module.exports = {readFile, getDirContent};
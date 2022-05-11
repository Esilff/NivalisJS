/**
 * 
 * @param {String} fileContent the content of a file 
 * @returns 
 */

function parseGLSL(fileContent) {
    if ( fileContent.indexOf('#vertexshader\r') == - 1 || fileContent.indexOf('#fragmentshader\r') == -1) {
        console.err('Unable to read the file correctly.');
        return;
    }
    let vertexLine = fileContent.indexOf('#vertexshader\r') + ('#vertexshader').length;
    let fragmentLine = fileContent.indexOf('#fragmentshader\r');
    let vertexContent = fileContent.substring(vertexLine, fragmentLine);
    let fragmentContent = fileContent.substring(fragmentLine + ('#fragmentshader').length);
    return {vertexProgram:vertexContent,fragmentProgram:fragmentContent};
}

module.exports = {parseGLSL};
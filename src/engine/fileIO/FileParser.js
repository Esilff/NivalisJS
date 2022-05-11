/**
 * This function divide the vertex and fragment part in two strings. It's necessary to get a shader in one unique file instead of a file 
 * for the vertex shader and another file for the fragment shader.
 * @param {String} fileContent the content of a file 
 * @returns an object with two parameters, the vertex part of the glsl file and the fragment part of the file.
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
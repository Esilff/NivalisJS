main();

function main() {
    const canvas = document.querySelector('#webgl');
    /** @type {WebGLRenderingContext} */
    const gl = canvas.getContext('webgl');
    if (!gl) {
        console.error('Unable to initialize webgl. Your navigator or your machine cannot support it !');
        return;
    }
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
}
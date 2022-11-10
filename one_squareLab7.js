var gl;
var delay = 100;
var canvas;
var program;
var thetaLoc;
var colorLoc;
var vPosition, vColor;
var vBuffer, cBuffer, iBuffer;
var rotate;
var vertices = [];
var rotatematrix = [];
var theta = [0, 0, 0];
var numVertices = 36;
var vPosition, vColor;
var faces = new Array(24);
var indices = [];
var xButton, yButton, zButton;
var rotatingX = false;
var rotatingY = false;
var rotatingZ = false;
var vertexColors = [];
var rotatematrixX = [];
var rotatematrixY = [];
var rotatematrixZ = [];


window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    xButton = document.getElementById("rotateX");
    yButton = document.getElementById("rotateY");
    zButton = document.getElementById("rotateZ");
    xButton.addEventListener("click", rotateX);
    yButton.addEventListener("click", rotateY);
    zButton.addEventListener("click", rotateZ);

    gl = WebGLUtils.setupWebGL( canvas );

    if ( !gl ) {
    		alert( "WebGL isn't available" );
    }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 0.5, 0.5, 0.5, 1.0 );

    program = initShaders( gl, "vertex-shader", "fragment-shader" );

    gl.useProgram( program );

    thetaLoc = gl.getUniformLocation(program, "theta");
    iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);

    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

    cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);

    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    createCube();

    render();
}

function createCube() {

    var vertices = [
            vec4(-0.5, -0.5, 0.5, 1.0),
            vec4(-0.5, 0.5, 0.5, 1.0),
            vec4(0.5, 0.5, 0.5, 1.0),
            vec4(0.5, -0.5, 0.5, 1.0),
            vec4(-0.5, -0.5, -0.5, 1.0),
            vec4(-0.5, 0.5, -0.5, 1.0),
            vec4(0.5, 0.5, -0.5, 1.0),
            vec4(0.5, -0.5, -0.5, 1.0)
            ];

    faces = new Array(24);

    vertexColors = [
        [0.0, 0.0, 0.0, 1.0],
        [1.0, 0.0, 0.0, 1.0],
        [1.0, 1.0, 0.0, 1.0],
        [0.0, 1.0, 0.0, 1.0],
        [0.0, 0.0, 1.0, 1.0],
        [1.0, 0.0, 1.0, 1.0],
        [1.0, 1.0, 1.0, 1.0],
        [0.0, 1.0, 1.0, 1.0]
    ];

    indices = [
        1, 0, 3,
        3, 2, 1,
        2, 3, 7,
        7, 6, 2,
        3, 0, 4,
        4, 7, 3,
        6, 5, 1,
        1, 2, 6,
        4, 5, 6,
        6, 7, 4,
        5, 4, 0,
        0, 1, 5
    ];

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertexColors), gl.STATIC_DRAW);
    vColor = gl.getAttribLocation( program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

}

function render() {

    gl.clear( gl.COLOR_BUFFER_BIT );

    if (rotatingX == true) {
        theta[0] += 2;
    }
    if (rotatingY == true) {
        theta[1] += 2;
    }
    if (rotatingZ == true) {
        theta[2] += 2;
    }
    gl.uniform3fv(thetaLoc, theta);
    gl.drawElements(gl.TRIANGLES, numVertices, gl.UNSIGNED_BYTE, 0);

    setTimeout(
            function (){requestAnimFrame(render);}, delay
        );
}

function rotateX() {
    rotatingX = true;
    rotatingY = false;
    rotatingZ = false;


}

function rotateY() {
    rotatingX = false;
    rotatingY = true;
    rotatingZ = false;

}

function rotateZ() {
    rotatingX = false;
    rotatingY = false;
    rotatingZ = true;

}
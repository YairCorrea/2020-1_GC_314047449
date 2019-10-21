//TODO: Checkbox para activar o desactivar Phong
window.addEventListener("load",function () {
    let canvas=document.getElementById("the_canvas");
    const gl= canvas.getContext("webgl");

    if(!gl) throw "Nel prro. :v";

    let vertexShaderSource= document.getElementById("2d-vertex-shader").text;
    let fragmentShaderSource=document.getElementById("2d-fragment-shader").text;

    let vertexShader=createShader(gl,gl.VERTEX_SHADER,vertexShaderSource);
    let fragmentShader=createShader(gl,gl.FRAGMENT_SHADER,fragmentShaderSource);

    let program= createProgram(gl,vertexShader,fragmentShader);

    let positionAttributeLocation= gl.getAttribLocation(program,"a_position");
    let colorAttributeLocation=gl.getAttribLocation(program,"a_color");
    let normalAttributeLocation=gl.getAttribLocation(program,"a_normal");
    let lightPositionLocation= gl.getUniformLocation(program,"u_PVM_matrix");
    let VM_matrixLocation=gl.getUniformLocation(program,"u_VM_matrix");
    let PVM_matrixLocation=gl.getUniformLocation(program,"u_PVM_matrix");
    let color=[1,0.4,0.5];
    let identity= new CG.Matrix4();

    let geometry= [
        new CG.Octaedro(gl,color,2,identity),
        new CG.Icosaedro(gl,color,2,CG.Matrix4.translate(new CG.Vector3(4,2,0))),
        new CG.Tetraedro(gl,color,2,CG.Matrix4.translate(new CG.Vector3(-2,-2,0))),
    ];

    gl.clearColor(0,0,0,0);
    gl.enable(gl.DEPTH_TEST);

    let aspect=gl.canvas.width/gl.canvas.height;
    let zNear=1;
    let zFar=200;
    let projectionMatrix= CG.Matrix4.perspective(75*Math.PI/180,aspect,zNear,zFar);

    let cameraPos=new CG.Vector3(0,0,10);
    let coi=new CG.Vector3(0,0,0);
    let up_v=new CG.Vector3(0,1,0);
    let viewMatrix=CG.Matrix4.lookAt(cameraPos,coi,up_v);
    let projectionViewMatrix= CG.Matrix4.multiply(projectionMatrix,viewMatrix);

    let lightPos=new CG.Vector4(0,-5,5,1);
    let lightPosView;
    function draw_obj(obj) {
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER,obj.getPositionBuffer());
        gl.vertexAttribPointer(positionAttributeLocation,3,gl.FLOAT,false,0,0);

        gl.enableVertexAttribArray(normalAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER,obj.getNormalBuffer());
        gl.vertexAttribPointer(normalAttributeLocation,3,gl.FLOAT,false,0,0);

        gl.enableVertexAttribArray(colorAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER,obj.getColorBuffer());
        gl.vertexAttribPointer(colorAttributeLocation,3,gl.UNSIGNED_BYTE,true,0,0);

        let VM=CG.Matrix4.multiply(projectionViewMatrix,obj.getModelTransform());

        gl.uniformMatrix4fv(PVM_matrixLocation,false,VM.toVector());
        gl.uniformMatrix4fv(VM_matrixLocation,false,projectionViewMatrix.toVector());

        lightPosView=viewMatrix.multiplyVector(lightPos);
        gl.uniform3fv(lightPositionLocation,[lightPosView.x,lightPosView.y,lightPosView.z]);
        obj.draw(gl);
    }

    function draw() {
        gl.viewport(0,0,canvas.width,canvas.height);
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
        gl.useProgram(program);
        for(let i=0; i<geometry.length;i++){
            draw_obj(geometry[i]);
        }
    }
    draw();
});
function createShader(gl,type,source){
    let shader= gl.createShader(type);
    gl.shaderSource(shader,source);
    gl.compileShader(shader);

    let status= gl.getShaderParameter(shader,gl.COMPILE_STATUS);
    if(status){
        return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}

function createProgram(gl,vertexShader,fragmentShader) {
    let program= gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);

    let status=gl.getProgramParameter(program,gl.LINK_STATUS);
    if(status) {
        return program;
    }
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}

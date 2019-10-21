var CG=(function (CG) {
    class Cono{
        /**
         *Constructor de la clase.
         * @param gl {WebGLRenderingContext} Referencia al contexto de WebGL
         * @param color {Number[]} Arreglo con tres elementos, [R,G,B], con valores entre 0 y 1 cada uno de ellos.
         * @param radius
         * @param height {Number}
         * @param Nu
         * @param Nv
         * @param initial_transform {Matrix4}
         */
        constructor(gl,color,radius,height,Nu,Nv,initial_transform){
            radius = (radius || 1);
            height = (height || 1);
            Nu = Nu || 2;
            Nv = Nv || 2;
            //Declaracion de los vertices que componen al objeto
            let vertices=[];
            for (let i=0; i<Nv; i++) {
                for (let j=0; j<Nu; j++) {
                    vertices.push(
                        radius * (Nv-i)/Nv * Math.cos(j*2*Math.PI/Nu),
                        -height + i*2*height/Nv,
                        radius * (Nv-i)/Nv * Math.sin(j*2*Math.PI/Nu),
                    );
                }
            }
            vertices.push(0, height, 0);

            //Declaracion de las caras que componen al objeto.
            let faceIndexes=[];

            for (let i=0; i<Nu; i++) {
                faceIndexes.push(vertices.length-1, vertices.length-1 -Nu +i, vertices.length-1 -Nu +(i+1)%Nu);
            }

            for (let i=0; i<Nv-1; i++) {
                for (let j=0; j<Nu; j++) {
                    let pos1=j +i*Nu;
                    let pos2=(j+1)%Nu +i*Nu;
                    let pos3=(j+1)%Nu +(i+1)*Nu;
                    let pos4=j +(i+1)*Nu;
                    faceIndexes.push(
                        pos1,pos2,pos4,
                        pos2,pos3,pos4
                    );
                }
            }
           //Crea buffer de vertices.
            this.positionBuffer=gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER,this.positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices),gl.STATIC_DRAW);

            //Crea buffer de caras.
            this.carasBuffer=gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.carasBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(faceIndexes),gl.STATIC_DRAW);

            //Crea normales
            let normals=getNormals(vertices,faceIndexes);
            this.normalBuffer=gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER,this.normalBuffer);
            gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(normals),gl.STATIC_DRAW);

            //Crea buffer de color.
            this.colorBuffer=gl.createBuffer();
            let colors=[];
            gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
            for(let i=0;i<vertices.length;i++){
                colors.push(color[0]*255,color[1]*255,color[2]*255);
            }
            gl.bufferData(gl.ARRAY_BUFFER,new Uint8Array(colors),gl.STATIC_DRAW);
            this.numElements=faceIndexes.length;
            this.initial_transform=initial_transform || new CG.Matrix4();
        }
        /**
         * Funcion que devuelve el buffer de vertices del objeto.
         * @return {WebGLBuffer}
         */
        getPositionBuffer(){
            return this.positionBuffer;
        }

        /**
         * Funcion que devuelve el buffer de colores del objeto geometrico
         * @return {WebGLBuffer}
         */
        getColorBuffer(){
            return this.colorBuffer;
        }

        /**
         * Funcion que devuelve el buffer de indices de las caras del objeto geometrico.
         * @return {WebGLBuffer}
         */
        getIndexBuffer(){
            return this.carasBuffer;
        }

        /**
         * Funcion que devuelve el buffer de normales para cada vertice del objeto.
         * @return {WebGLBuffer}
         */
        getNormalBuffer(){
            return this.normalBuffer;
        }


        /**
         * Funcion que devuelve la transformacion del objeto, para ser utilizada en caso de ser necesaria.
         * @return {Number}
         */
        getModelTransform(){
            return this.initial_transform;
        }

        /**
         * Funcion que dibuja el objeto utilizando el contexto de render que recibe como parametro gl.
         * @param gl {WebGLRenderingContext}
         */
        draw(gl){
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.carasBuffer);
            gl.drawElements(gl.TRIANGLES,this.numElements,gl.UNSIGNED_SHORT,0);
        }
    }
    CG.Cono= Cono;
    return CG;
}(CG ||{}));

function getNormals(vertices, faces) {
    let normals = new Array(vertices.length);
    let v1 = new CG.Vector3();
    let v2 = new CG.Vector3();
    let v3 = new CG.Vector3();
    let i1, i2, i3;
    let tmp = new CG.Vector3();
    let n;

    for (let i=0; i<faces.length; i+=3) {
        i1 = faces[i  ]*3;
        i2 = faces[i+1]*3;
        i3 = faces[i+2]*3;

        v1.set( vertices[i1], vertices[i1 + 1], vertices[i1 + 2] );
        v2.set( vertices[i2], vertices[i2 + 1], vertices[i2 + 2] );
        v3.set( vertices[i3], vertices[i3 + 1], vertices[i3 + 2] );
        n = CG.Vector3.cross(CG.Vector3.subtract(v1, v2), CG.Vector3.subtract(v2, v3));

        tmp.set( normals[i1], normals[i1+1], normals[i1+2] );
        tmp = CG.Vector3.add(tmp, n);
        normals[i1  ] = tmp.x;
        normals[i1+1] = tmp.y;
        normals[i1+2] = tmp.z;

        tmp.set( normals[i2], normals[i2+1], normals[i2+2] );
        tmp = CG.Vector3.add(tmp, n);
        normals[i2  ] = tmp.x;
        normals[i2+1] = tmp.y;
        normals[i2+2] = tmp.z;

        tmp.set( normals[i3], normals[i3+1], normals[i3+2] );
        tmp = CG.Vector3.add(tmp, n);
        normals[i3  ] = tmp.x;
        normals[i3+1] = tmp.y;
        normals[i3+2] = tmp.z;
    }

    for (let i=0; i<normals.length; i+=3) {
        tmp.set(normals[i], normals[i+1], normals[i+2]);
        tmp = tmp.normalize();
        normals[i  ] = tmp.x;
        normals[i+1] = tmp.y;
        normals[i+2] = tmp.z;
    }

    return normals;
}




var CG=(function (CG) {
    class Icosaedro{
        /**
         *Constructor de la clase.
         * @param gl {WebGLRenderingContext} Referencia al contexto de WebGL
         * @param color {Number[]} Arreglo con tres elementos, [R,G,B], con valores entre 0 y 1 cada uno de ellos.
         * @param width {Number}
         * @param height {Number}
         * @param length {Number}
         * @param initial_transform {Matrix4}
         */
        constructor(gl,color,width,initial_transform){
            width = (width || 1)/3;
            var goldenRatio = 1.6180339887;
            let width_m_goldenRatio = width*goldenRatio;
            //Declaracion de los vertices que componen al objeto
            let vertices=[0,  width,  width_m_goldenRatio,
                0,  width, -width_m_goldenRatio,
                0, -width,  width_m_goldenRatio,
                0, -width, -width_m_goldenRatio,
                 width,  width_m_goldenRatio, 0,
                 width, -width_m_goldenRatio, 0,
                -width,  width_m_goldenRatio, 0,
                -width, -width_m_goldenRatio, 0,
                 width_m_goldenRatio, 0,  width,
                 width_m_goldenRatio, 0, -width,
                -width_m_goldenRatio, 0,  width,
                -width_m_goldenRatio, 0, -width];
            //Declaracion de las caras que componen al objeto.
            let faceIndexes=[ 10, 0, 2,
                0, 8, 2,
                8, 5, 2,
                5, 7, 2,
                7, 10, 2,
                6, 0, 10,
                11, 6, 10,
                7, 11, 10,
                7, 3, 11,
                5, 3, 7,
                9, 3, 5,
                8, 9, 5,
                4, 9, 8,
                0, 4, 8,
                6, 4, 0,
                11, 3, 1,
                6, 11, 1,
                4, 6, 1,
                9, 4, 1,
                3, 9, 1];
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
    CG.Icosaedro= Icosaedro;
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




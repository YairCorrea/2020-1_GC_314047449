window.addEventListener("load", function(evt) {
    let file_input = document.getElementById("file");
    let canvas=document.getElementById("canvas");
    let ctx=canvas.getContext("2d");
    let valorX=document.getElementById("x");
    let valorY=document.getElementById("y");
    let valorZ=document.getElementById("z");
    let lines;
    /**
     * Funcion que lee una linea y altera el entorno para representar los datos contenidos en esta.
     * @param line  Una sola linea del archivo OBJ.
     * @param dataStruct    Entorno, contiene 6 arreglos en el orden: PosX,PosY,PoxZ,faces,valores_maximos,valores_minimos.
     *                      >faces es un arreglo de arreglos, conteniendo los indices de los vertices.
     *                      >PosX[i],PosY[i],PosZ[i] son las coordenadas de un punto con indice i en sus respectivos ejes.
     * @returns El entorno actualizado. Sigue cumpliendo con la misma organizacion que su entrada.
     */
    function parse(line,dataStruct){
        let le=line.split(' ');
        switch (le[0]) {
            case "v":
                let x=parseFloat(le[1]);
                dataStruct[0].push(le[1]);
                if(x>dataStruct[4][0])dataStruct[4][0]=x;
                if(x<dataStruct[5][0])dataStruct[5][0]=x;
                let y=parseFloat(le[2]);
                dataStruct[1].push(y);
                if(y>dataStruct[4][1])dataStruct[4][1]=y;
                if(y<dataStruct[5][1])dataStruct[5][1]=y;
                let z=parseFloat(le[3]);
                dataStruct[2].push(z);
                if(z>dataStruct[4][2])dataStruct[4][2]=z;
                if(z<dataStruct[5][2])dataStruct[5][2]=z;
                break;
            case "f":
                dataStruct[3].push([parseInt(le[1].split('/')[0])-1,parseInt(le[2].split('/')[0])-1,parseInt(le[3].split('/')[0])-1]);
                break;
            default://Do nothing. We don't really care about typos or other stuff.
                break;
        }
        return dataStruct;
    }
    /**
     * Funcion que dibuja en el canvas las caras que se le pasen por medio del entorno.
     * @param dataStruct Entorno, cumple lo mismo que el de parse.
     */
    function draw(dataStruct){
        let verteX=dataStruct[0];
        let verteY=dataStruct[1];
        let faces= dataStruct[3];
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        let counter=0;
        faces.forEach(function drawFace(face){
            ctx.moveTo(verteX[face[0]],verteY[face[0]]);
            ctx.lineTo(verteX[face[1]],verteY[face[1]]);
            ctx.lineTo(verteX[face[2]],verteY[face[2]]);
            ctx.moveTo(verteX[face[2]],verteY[face[2]]);
            ctx.lineTo(verteX[face[1]],verteY[face[1]]);
            counter++;
        });
        console.log("Dibuje "+counter+" poligonos");
        ctx.stroke();
    }/**
    *Funcion que permite escalar el canvas a la panatalla
    * @param dataStruct Entorno, cumple lo mismo que el de parse.
    * @param maXScreen Tamaño maximo en X
    * @param maYScreen Tamaño maximo en Y
    */
    function proyeccionAViewPort(dataStruct,maXScreen,maYScreen){
        let verteX=dataStruct[0];
        let verteY=dataStruct[1];
        let Xmin=dataStruct[5][0];
        let Ymin=dataStruct[5][1];
        let Xmax=dataStruct[4][0];
        let Ymax=dataStruct[4][1];
       for(let i=0;i<verteX.length;i++){
           verteY[i]=maYScreen*((verteY[i]-Ymin)/(Ymax-Ymin));
           verteX[i]=maXScreen*((verteX[i]-Xmin)/(Xmax-Xmin));
       }
       return dataStruct;
    }
    /**
     * Funcion que Permite ver el objeto en diferentes puntos
     * @param dataStruct Entorno, cumple lo mismo que el de parse.
     */
    function viewTransform(dataStruct) {
        let verteX=dataStruct[0];
        let verteY=dataStruct[1];
        let verteZ=dataStruct[2];
        let minX=dataStruct[5][0];
        let minY=dataStruct[5][1];
        let minZ=dataStruct[5][2];
        let maxX=dataStruct[4][0];
        let maxY=dataStruct[4][1];
        let maxZ=dataStruct[4][2];
        let eye=new CG.Vector3(parseFloat(valorX.value),parseFloat(valorY.value),parseFloat(valorZ.value));
        let at=new CG.Vector3((maxX+minX)/2,(maxY+minY)/2,(maxZ+minZ)/2);
        let globos=new CG.Vector3(0,1,0);
        let lineOf=CG.Matrix4.lookAt(eye,at,globos);
        for(let i=0;i<verteX.length;i++){
            let tmp=lineOf.multiplyVector(new CG.Vector4(verteX[i],verteY[i],verteZ[i],1));
            verteX[i]=tmp.x;
            verteY[i]=tmp.y;
            verteZ[i]=tmp.z;
        }
        let tmp=lineOf.multiplyVector(new CG.Vector4(maxX,maxY,maxZ,1));
        maxX=tmp.x;
        maxY=tmp.y;
        maxZ=tmp.z;
        let tm=lineOf.multiplyVector(new CG.Vector4(minX,minY,minZ,1));
        minX=tm.x;
        minY=tm.y;
        minZ=tm.z;
        return dataStruct;
    }
    /**
     * Funcion que muestra la vista como un Frustum
     * @param dataStruct Entorno, cumple lo mismo que el de parse.
     */
   function frustumView(dataStruct) {
       let verteX=dataStruct[0];
       let verteY=dataStruct[1];
       let verteZ=dataStruct[2];
       let minX=dataStruct[5][0];
       let minY=dataStruct[5][1];
       let minZ=dataStruct[5][2];
       let maxX=dataStruct[4][0];
       let maxY=dataStruct[4][1];
       let maxZ=dataStruct[4][2];
       let frust=CG.Matrix4.frustum(minX,maxX,minY,maxY,minZ,maxZ);
       for(let foo=0;foo<verteX.length;foo++){
           let bar=frust.multiplyVector(new CG.Vector4(verteX[foo],verteY[foo],verteZ[foo],1));
           verteX[foo]=bar.x;
           verteY[foo]=bar.y;
           verteZ[foo]=bar.z;
       }
       let tmp=frust.multiplyVector(new CG.Vector4(maxX,maxY,maxZ,1));
       maxX=tmp.x;
       maxY=tmp.y;
       maxZ=tmp.z;
       let tm=frust.multiplyVector(new CG.Vector4(minX,minY,minZ,1));
       minX=tm.x;
       minY=tm.y;
       minZ=tm.z;
       return dataStruct;
   }
   /**
    * Funcion que Inicializa los elementos para dibujar
    */
   function execute() {
       let faces = [];
       let verteX = [];
       let verteY = [];
       let verteZ = [];
       let biggestBoi = [0, 0, 0];
       let smollBoi = [0, 0, 0];
       let parsedData = [verteX, verteY, verteZ, faces, biggestBoi, smollBoi];
       for (let line = 0; line < lines.length; line++) {
           parsedData = parse(lines[line], parsedData);
       }
       parsedData=viewTransform(parsedData);
       parsedData=frustumView(parsedData);
       parsedData=proyeccionAViewPort(parsedData,canvas.width,canvas.height);
       draw(parsedData);
   }
    /**
     * Podria decirse main. Cuando alguien mete un archivo, crea un nuevo entorno y le aplica el procedimiento hasta dibujarlo en el canvas.
     */
    function cambios(evt){
        let files = evt.target.files;
        let reader = new FileReader();
        reader.onload = function(reader_evt) {
                if(evt.target===file_input)lines = reader_evt.target.result.split('\n');
                execute();
        };
        if(evt.target!==file_input){
            execute();
            return;
        }
        if (files.length > 0) {
            reader.readAsText(files[0]);
        }
    }
    file_input.addEventListener("change",cambios);
    valorX.addEventListener("change",cambios);
    valorY.addEventListener("change",cambios);
    valorZ.addEventListener("change",cambios);
});

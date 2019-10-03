window.addEventListener("load", function(evt) {
    let file_input = document.getElementById("file");
    let canvas=document.getElementById("canvas");
    let ctx=canvas.getContext("2d");
    let valorX=document.getElementById("x");
    let valorY=document.getElementById("y");
    let valorZ=document.getElementById("z");
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
                dataStruct[0].push(le[1]);
                if(le[1]>dataStruct[4][0])dataStruct[4][0]=le[1];
                if(le[1]<dataStruct[5][0])dataStruct[5][0]=le[1];
                dataStruct[1].push(le[2]);
                if(le[2]>dataStruct[4][1])dataStruct[4][1]=le[2];
                if(le[2]<dataStruct[5][1])dataStruct[5][1]=le[2];
                dataStruct[2].push(le[3]);
                if(le[3]>dataStruct[4][2])dataStruct[4][2]=le[3];
                if(le[3]<dataStruct[5][2])dataStruct[5][2]=le[3];
                break;
            case "f":
                dataStruct[3].push([le[1].split('/')[0],le[2].split('/')[0],le[3].split('/')[0]]);
                break;
            default://Do nothing. We don't really care about typos or other stuff.
                break;
        }
        return dataStruct;
    }
    /**
     * Funcion que dibuja en el canvas los puntos y caras que se le pasen por medio del entorno.
     * @param dataStruct Entorno, cumple lo mismo que el de parse.
     */
    function draw(dataStruct){
        let verteX=dataStruct[0];
        let verteY=dataStruct[1];
        let faces= dataStruct[3];
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(let i=0;i<verteX.length;i++){
            ctx.strokeRect(verteX[i],verteY[i],1,1);
        }
        ctx.beginPath();
        let counter=0;
        faces.forEach(function drawFace(face){
            ctx.moveTo(verteX[face[0]],verteY[face[0]]);
            ctx.lineTo(verteX[face[1]],verteY[face[1]]);
            ctx.moveTo(verteX[face[1]],verteY[face[1]]);
            ctx.lineTo(verteX[face[2]],verteY[face[2]]);
            ctx.moveTo(verteX[face[2]],verteY[face[2]]);
            ctx.lineTo(verteX[face[0]],verteY[face[0]]);
            counter++;
        });
        console.log("Dibuje "+counter+" poligonos");
        ctx.stroke();
    }
    function proyeccionAViewPort(dataStruct,maXScreen,maYScreen){
        let verteX=dataStruct[0];
        let verteY=dataStruct[1];
        let Xmin=dataStruct[5][0];
        let Ymin=dataStruct[5][1];
        let Xmax=dataStruct[4][0];
        let Ymax=dataStruct[4][1];
       for(let i=0;i<verteX.length;i++){
           verteX[i]=((verteX[i]-Xmin)/(Xmax-Xmin));
           verteY[i]=((verteY[i]-Ymin)/(Ymax-Ymin));
       }
       return dataStruct;
    }
    /**
     * Mueve el objeto a el punto 0,0,0.
     * @param dataStruct
     * @returns {*}
     */
    function aMundo(dataStruct) {
        let verteX=dataStruct[0];
        let verteY=dataStruct[1];
        let verteZ=dataStruct[2];
        let minX=dataStruct[5][0];
        let minY=dataStruct[5][1];
        let minZ=dataStruct[5][2];
        for(let i=0;i<verteX.length;i++){
            let trans=CG.Matrix4.translate(new CG.Vector3(-minX,-minY,-minZ));
            let tmp=trans.multiplyVector(new CG.Vector4(verteX[i],verteY[i],verteZ[i],1));
            verteX[i]=tmp.x;
            verteY[i]=tmp.y;
            verteZ[i]=tmp.z;
        }
        dataStruct[4][0]-=minX;
        dataStruct[4][1]-=minY;
        dataStruct[4][2]-=minZ;
        minX=0;
        minY=0;
        minZ=0;
        return dataStruct;
    }
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
        let eye=new CG.Vector3(valorX.value,valorY.value,valorZ.value);
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
        minX=tmp.x;
        minY=tmp.y;
        minZ=tmp.z;
        return dataStruct;
    }
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
       return dataStruct;
   }
    /**
     * Podria decirse main. Cuando alguien mete un archivo, crea un nuevo entorno y le aplica el procedimiento hasta dibujarlo en el canvas.
     */
    function cambios(evt){
        let files = evt.target.files;
        let reader = new FileReader();
        reader.onload = function(reader_evt) {
            let lines = reader_evt.target.result.split('\n');
            let faces=[];
            let verteX=[];
            let verteY=[];
            let verteZ=[];
            let biggestBoi=[0,0,0];
            let smollBoi=[0,0,0];
            let parsedData=[verteX,verteY,verteZ,faces,biggestBoi,smollBoi];
            for(let line=0;line < lines.length;line++){
                parsedData=parse(lines[line],parsedData);
            }
            parsedData=aMundo(parsedData);
            parsedData=viewTransform(parsedData);
            parsedData=frustumView(parsedData);
            parsedData=proyeccionAViewPort(parsedData,canvas.width,canvas.height);
            draw(parsedData);
        };
        if (files.length > 0) {
            reader.readAsText(files[0]);
        }
    }
    file_input.addEventListener("change",cambios);
    valorX.addEventListener("change",cambios);
    valorY.addEventListener("change",cambios);
    valorZ.addEventListener("change",cambios);
});
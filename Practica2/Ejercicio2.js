window.addEventListener("load",function (evt) {
	let canvas=document.getElementById("canvas");
	let ctx=canvas.getContext("2d");
	const radioAGirar=100;	//El del circulo "grande" A editar si quiere ver otra epicicloide.
	const radioSobreGiro=100/7.2;	//El del circulo "pequeno". A editar si quiere ver otra epicicloide.
	let midX=300;
	let midY=400;
	const konstante=1+(radioAGirar/radioSobreGiro);

	/**
	 *Calcula la posicion del epicicloide en X dado cierto angulo.
	 * @param a	Angulo, en radianes.
	 * @returns {number}	Posicion en X en la que se encuentra nuestro punto. Asumiendo que el centro a girar es el origen.
	 */
	function getX(a){
		let izquierdo=(radioAGirar+radioSobreGiro)*Math.sin(a);
		let derecho=radioSobreGiro*Math.sin(a*konstante);
		return (izquierdo-derecho);
	}

	/**
	 * Calcula la posicion del epicicloide en Y dado cierto angulo.
	 * @param a	Angulo, en radianes.
	 * @returns {number}	Posicion en Y en la que se encuentra nuestro punto. Asumiento que el centro a girar es el origen.
	 */
	function getY(a){
		let izquierdo=(radioAGirar+radioSobreGiro)*Math.cos(a);
		let derecho=radioSobreGiro*Math.cos(a*konstante);
		return (izquierdo-derecho);
	}

	/**
	 * Funcion que dibuja los ejes.
	 */
	function dibujaP(){
		ctx.setLineDash([1,1]);
		ctx.beginPath();
		ctx.strokeStyle="rgba(255,0,0,0.5)";
		ctx.moveTo(midX,0);
		ctx.lineTo(midX,midY*2);
		ctx.stroke();
		ctx.moveTo(0,midY);
		ctx.lineTo(midX*2,midY);
		ctx.stroke();
	}

	/**
	 * Funcion que dibuja la epicicloide. La dibuja en puntos, asi que muy probablemente no se vea contigua, es chistosa.
	 */
	function dibujaE(){
		ctx.moveTo(0,0);
		var angle=0;
		var x=getX(0);
		var y=getY(0);
		const inicialX=getX(0);
		const inicialY=getY(0);
		ctx.strokeStyle="rgba(100,0,100,1)";
		do{

			ctx.strokeRect(Math.floor(x)+midX,Math.floor(y)+midY,1,1);
			angle++;
			x=getX(angle*Math.PI/180);
			y=getY(angle*Math.PI/180);
		}while((x!=inicialX)&&(y!=inicialY));
	}
	dibujaP();
	dibujaE();
});

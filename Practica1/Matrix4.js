var CG = (function(CG) {
  class Matrix4{
	  constructor(){
		  this.identity();
		}
	  constructor(a00,a01,a02,a03,a10,a11,a12,a13,a20,a21,a22,a23,a30,a31,a32,a33){
		  this.set(a00,a01,a02,a10,a11,a12,a20,a21,a22,a23,a30,a31,a32,a33);
	  }
	  static add(m1,m2){
		   var tmp=new Array();
		   var i;
		   for(i=0;i<16;i++){
			   tmp.push(m1.arreglo[i]+m2.arreglo[i]);
		   }
		   var resultado=new Matrix4();
		   resultado.arreglo=tmp;
		   return resultado;
	  }
	  /**
	  * Devuelve la matriz adjunta, de la matriz con la que se invoca la funcion
	  * @return Matrix3
	  * */
	  adjoint(){
			return (42);
		}
		 /**
		  * Devuelve un objeto el cual tiene los mismos valores del que lo invoco.
		  * @return Matrix4
		  * */
		 clone(){
			 var resultado=new Matrix4();
			 resultado.arreglo=this.arreglo;
			 return resultado;
		 }
		 /**
		  * Devuelve el determinante de la matriz que lo invoco.
		  * @return Number
		  * */
		  determinant(){
	  		  //TODO:Insert method.
			  return (42);
		  }
		  /**
		   * Devuelve verdadero si es aproxiamadamente igual. Bajo e=0.000001 y falso en otro caso.
		   * @param Matrix4 m1
		   * @param Matrix4 m2
		   * @return Boolean
		   * Am... tenia sentido en vectores, pero en matrices? No se batman...Es un exactEqual aqui
		   * */
		   static equals(m1,m2){
			   return (this.exactEquals(m1,m2));
		   }
		   /**
		    * Devuelve verdadero si son exactamente iguales sus argumentos.
		    * @param Matrix4 m1
		    * @param Matrix4 m2
		    * @return Boolean
		    * */
		    static exactEquals(m1,m2){
				var i;
				for(i=0;i<16;i++){
					if(m1.arreglo[i]!=m2.arreglo[i]){
						return false;
					}
				}
			    return true;
		   }
		   /**
		    * https://youtu.be/d9FEMHosi10
		    * Asigna los valores de la matriz identidad a la matriz desde donde se invoco la funcion
		    * 
		    * */
		   identity(){
			   this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);
		   }
		   /**
		    * Devuelve la inversa de la matriz con la que se invoco la funcion
		    * @return Matrix4
		    * */
		    invert(){
				var det=this.determinant();
				if(determinante==0) throw "No tiene inversa";
				var tA=transpose(this.adjoint());
				return (multiplyScalar(tA,1/det));
			}
			/**
			 * Devuelve la multiplicacion de dos matrices
			 * @param Matrix4 m1
			 * @param Matrix4 m2
			 * @return Matrix4
			 * */
			 static multiply(m1,m2){
				 var i;
				 var x;
				 var y;
				 var resultado=new Matrix4(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
				 for(i=0;i<4;i++){
					 for(x=0;x<4;x++){
						var arrayLocal=(i*4)+x;
						for(y=0;y<4;y++){
							resultado.arreglo[arrayLocal]=m1.arreglo[(i*4)+y]*m2.arreglo[(y*4)+x];
						} 
					 }
				 }
				 return resultado;
			 }
			 /**
			  * Devuelve una matriz resultado de multiplicar cada componente por un escalar
			  * @param Matrix4 m1
			  * @param Number c
			  * @return Matrix4
			  * */
			 static multiplyScalar(m1,c){
				 var resultado=new Matrix4();
				 var tmp=m1.arreglo;
				 tmp.forEach(foo(bar){
					 bar*=c;
				 });
				 resultado.arreglo=tmp;
				 return resultado;
			 }
			 /**
			  * Asigna nuevos valores a los componentes en la matriz con la que se llama
			  * @param Number a00
			  * @param Number a01
			  * @param Number a02
			  * @param Number a03
			  * @param Number a10
			  * @param Number a11
			  * @param Number a12
			  * @param Number a13
			  * @param Number a20
			  * @param Number a21
			  * @param Number a22
			  * @param Number a23
			  * @param Number a30
			  * @param Number a31
			  * @param Number a32
			  * @param Number a33
			  * */
			  set(a00,a01,a02,a03,a10,a11,a12,a13,a20,a21,a22,a23,a30,a31,a32,a33){
				  this.arreglo=new Array(a00,a01,a02,a03,a10,a11,a12,a13,a20,a21,a22,a23,a30,a31,a32,a33);
			  }
			  /**
			   * Sustrae m2 de m1
			   * @param Matrix4 m1
			   * @param Matrix4 m2
			   * @return Matrix4
			   * */			  
			   static substract(m1,m2){
				   		   var tmp=new Array();
				   		   var i;
				   		   for(i=0;i<16;i++){
							   tmp.push(m1.arreglo[i]-m2.arreglo[i]);
							}
							var resultado=new Matrix4();
							resultado.arreglo=tmp;
							return resultado;
			   }
			   /** Devuelve la matriz transpuesta de la matriz desde donde se invoco la funcion
			   * @return Matrix4
			   * */	
			  transpose(){
				  return (new Matrix4(this.arreglo[0],this.arreglo[4],this.arreglo[8],this.arreglo[12],this.arreglo[1],this.arreglo[5],this.arreglo[9],this.arreglo[13],this.arreglo[2],this.arreglo[6],this.arreglo[10],this.arreglo[14],this.arreglo[3],this.arreglo[7],this.arreglo[11],this.arreglo[15]));
			  }
	  }
  CG.Matrix4 = Matrix4;
  return CG;
})(CG || {});

var CG = (function(CG) {
  class Matrix3{
	  constructor(){
		  this.identity();
		}
	  constructor(a00,a01,a02,a10,a11,a12,a20,a21,a22){
		  this.set(a00,a01,a02,a10,a11,a12,a20,a21,a22);
	  }
	  /**
	   * Devuelve la suma de dos matrices
	   * @param Matrix3 m1
	   * @param Matrix3 m2
	   * @return Matrix3
	   * */	  
	   static add(m1,m2){
		   return (new Matrix3(m1.a00+m2.a00,m1.a01+m2.a01,m1.a02+m2.a02,m1.a10+m2.a10,m1.a11+m2.a11,m1.a12+m2.a12,m1.a20+m2.a20,m1.a21+m2.a21,m1.a22+m2.a22));
	   }
	   /**
		* Auxiliar que calcula la determinante de una 2x2
		* @param a Corresponde a pos 00
		* @param b Corresponde a pos 11
		* @param c Corresponde a pos 01
		* @param d Corresponde a pos 10
		* @return Number
		* */
	   determinanteDos(a,b,c,d){
		  return ((a*b)-(c*d));
	   }
	   /**
	    * Devuelve la matriz adjunta, de la matriz con la que se invoca la funcion
	    * @return Matrix3
	    * */
	    adjoint(){
	    	var det00 = this.determinanteDos(this.a11, this.a22, this.a12, this.a21);
	    	var det01= -this.determinanteDos(this.a10,this.a22,this.a12,this.a20);
			var det02= this.determinanteDos(this.a10,this.a21,this.a11,this.a20);
			var det10= -this.determinanteDos(this.a01,this.a22,this.a02,this.a21);
			var det11= this.determinanteDos(this.a00,this.a22,this.a02,this.a20);
			var det12= -this.determinanteDos(this.a00,this.a21,this.a20,this.a01);
			var det20= this.determinanteDos(this.a01,this.a12,this.a02,this.a11);
			var det21= -this.determinanteDos(this.a00,this.a12,this.a02,this.a10);
			var det22= this.determinanteDos(this.a00,this.a11,this.a01,this.a10);
			return (new CG.Matrix3(det00,det01,det02,det10,det11,det12,det20,det21,det22));
		}
		 /**
		  * Devuelve un objeto el cual tiene los mismos valores del que lo invoco.
		  * @return Matrix3
		  * */
		 clone(){
			 return (new CG.Matrix3(this.a00,this.a01,this.a02,this.a10,this.a11,this.a12,this.a20,this.a21,this.a22));
		 }
		 /**
		  * Devuelve el determinante de la matriz que lo invoco.
		  * @return Number
		  * */
		  determinant(){
			var det00= this.a00*this.determinanteDos(this.a11,this.a22,this.a12,this.a21);
			var det01= (-1)*this.a01*this.determinanteDos(this.a10,this.a22,this.a12,this.a20);
			var det02= this.a02*this.determinanteDos(this.a10,this.a21,this.a11,this.a20);
			  return (det00+det01+det02);
		  }
		  /**
		   * Devuelve verdadero si es aproxiamadamente igual. Bajo e=0.000001 y falso en otro caso.
		   * @param Matrix3 m1
		   * @param Matrix3 m2
		   * @return Boolean
		   * Am... tenia sentido en vectores, pero en matrices? No se batman...Es un exactEqual aqui
		   * */
		   static equals(m1,m2){
			   return ((m1.a00===m2.a00)&&(m1.a01===m2.a01)&&(m1.a02===m2.a02)&&(m1.a10===m2.a10)&&(m1.a11===m2.a11)&&(m1.a12===m2.a12)&&(m1.a20===m2.a20)&&(m1.a21===m2.a21)&&(m1.a22===m2.a22));
		   }
		   /**
		    * Devuelve verdadero si son exactamente iguales sus argumentos.
		    * @param Matrix3 m1
		    * @param Matrix3 m2
		    * @return Boolean
		    * */
		    static exactEquals(m1,m2){
			   return ((m1.a00===m2.a00)&&(m1.a01===m2.a01)&&(m1.a02===m2.a02)&&(m1.a10===m2.a10)&&(m1.a11===m2.a11)&&(m1.a12===m2.a12)&&(m1.a20===m2.a20)&&(m1.a21===m2.a21)&&(m1.a22===m2.a22));
		   }
		   /**
		    * https://youtu.be/d9FEMHosi10
		    * Asigna los valores de la matriz identidad a la matriz desde donde se invoco la funcion
		    * 
		    * */
		   identity(){
			   this.set(1,0,0,0,1,0,0,0,1);
		   }
		   /**
		    * Devuelve la inversa de la matriz con la que se invoco la funcion
		    * @return Matrix3
		    * */
		    invert(){
				var det=this.determinant();
				if(det===0) throw "No tiene inversa";
				var tA=this.trans(this.adjoint());
				return (this.multiplyScalar(tA,1/det));
			}
			/**
			 * Devuelve la matriz transpuesta.
			 * @param Matrix3 m1
			 * @return Matrix3 
			 * */
			 trans(m1){
				 return (new Matrix3(m1.a00,m1.a10,m1.a20,m1.a01,m1.a11,m1.a21,m1.a02,m1.a12,m1.a22));
			 }
			/**
			 * Devuelve la multiplicacion de dos matrices
			 * @param Matrix3 m1
			 * @param Matrix3 m2
			 * @return Matrix3
			 * */
			 static multiply(m1,m2){
				 //Pero podrias haber hecho un ciclo aqui que lo hiciera cuadratico y usar un arreglo. No se que se ve peor. El monton de variables o los como 3 fors que eso hubiera generado.
				 var novo00=(m1.a00*m2.a00)+(m1.a01*m2.a10)+(m1.a02*m2.a20);
				 var novo01=(m1.a00*m2.a01)+(m1.a01*m2.a11)+(m1.a02*m2.a21);
				 var novo02=(m1.a00*m2.a02)+(m1.a01*m2.a12)+(m1.a02*m2.a22);
				 var novo10=(m1.a10*m2.a00)+(m1.a11*m2.a10)+(m1.a12*m2.a20);
				 var novo11=(m1.a10*m2.a01)+(m1.a11*m2.a11)+(m1.a12*m2.a21);
				 var novo12=(m1.a10*m2.a02)+(m1.a11*m2.a12)+(m1.a12*m2.a22);
				 var novo20=(m1.a20*m2.a00)+(m1.a21*m2.a10)+(m1.a22*m2.a20);
				 var novo21=(m1.a20*m2.a01)+(m1.a21*m2.a11)+(m1.a22*m2.a21);
				 var novo22=(m1.a20*m2.a02)+(m1.a21*m2.a12)+(m1.a22*m2.a22);
				 return (new CG.Matrix3(novo00,novo01,novo02,novo10,novo11,novo12,novo20,novo21,novo22));
			 }
			 /**
			  * Devuelve una matriz resultado de multiplicar cada componente por un escalar
			  * @return Matrix3
			  * @param m1
			  * @param c
			  * */
			 static multiplyScalar(m1,c){
				return (new CG.Matrix3(m1.a00*c,m1.a01*c,m1.a02*c,m1.a10*c,m1.a11*c,m1.a12*c,m1.a20*c,m1.a21*c,m1.a22*c));
			 }
			 /**
			  * Asigna nuevos valores a los componentes en la matriz con la que se llama
			  * @param a00
			  * @param a01
			  * @param a02
			  * @param a10
			  * @param a11
			  * @param a12
			  * @param a20
			  * @param a21
			  * @param a22
			  * */
			  set(a00,a01,a02,a10,a11,a12,a20,a21,a22){
				  this.a00=a00;
				  this.a01=a01;
				  this.a02=a02;
				  this.a10=a10;
				  this.a11=a11;
				  this.a12=a12;
				  this.a20=a20;
				  this.a21=a21;
				  this.a22=a22;
			  }			  
			  /**
			   * Sustrae m2 de m1
			   * @return Matrix3
			   * @param m1
			   * @param m2
			   * */
			  static substract(m1,m2){
				  		   return (new CG.Matrix3(m1.a00-m2.a00,m1.a01-m2.a01,m1.a02-m2.a02,m1.a10-m2.a10,m1.a11-m2.a11,m1.a12-m2.a12,m1.a20-m2.a20,m1.a21-m2.a21,m1.a22-m2.a22));
			  }
			  /**
			   * Devuelve la matriz transpuesta de la matriz desde donde se invoco la funcion
			   * @return Matrix3 
			   * */	
			  transpose(){
				  return this.trans(this);
			  }
			  /**
			   *
			   *
			   * @returns {Vector3}
			   */
			  multiplyVector(vector){
			  	//TODO:The method.
			  	return new CG.Vector3(42,42,42);
			  }

	  /**
	   *
	   * @param rad
	   * @returns {Matrix3}
	   */
			  static rotate(rad){
			  	//TODO:The method
			  	return new CG.Matrix3(42,42,42);
			  }

	  /**
	   *
	   * @param sx
	   * @param sy
	   * @returns {Matrix3}
	   */
			  static scale(sx,sy){
			  	return new CG.Matrix3(42,42,42);
			  }

	  /**
	   *
	   * @param tx
	   * @param ty
	   * @returns {Matrix3}
	   */
			  static translate(tx,ty){
			  	return new CG.Matrix3(42,42,42);
			  }
	  }
  CG.Matrix3 = Matrix3;
  return CG;
})(CG || {});

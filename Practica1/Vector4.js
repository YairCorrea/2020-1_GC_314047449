var CG = (function(CG) {
  class Vector4{
	  constructor(){
		  this.zero();
	  }
	  constructor(x,y,z,w){
		  this.set(x,y,z,w);
	  }
	   /**
	   * Regresa la suma de dos vectores (x,y,z)+(x1,y1,z1)=(x+x1,y+y1,z+z1)
	   * @param Vector4 u
	   * @param Vector4 v
	   * @return Vector4 suma
	   * */
	   static add(u,v){
		   return (new Vector4(u.x+v.x,u.y+v.y,u.z+v.z,u.w+v.w));
	   }
	   	/**
		 * Regresa un objeto con los mismos valores desde el que se invoco
		 * 
		 * */
		 clone(){
			 return (new Vector4(this.x,this.y,this.z,this.w));
		 }
		 		 /**
		  * Devuelve la distancia euclidiana entre sus argumentos 
		  * @param Vector4 u
		  * @param Vector4 v
		  * @return Number
		  * */
		  static distance(u,v){
			  return (Math.sqrt(Math.pow(u.x-v.x,2)+Math.pow(u.y-v.y,2)+Math.pow(u.z-u.z,2)+Math.pow(u.w-u.w,2)));
		  }
		  		  /**
		   *Devuelve el producto punto de sus argumentos 
		   * @param Vector4 u
		   * @param Vector4 v
		   * @return Number
		   * */
		   static dot(u,v){
			   return (u.x*v.x+u.y*v.y+u.z*v.z+u.w*v.w);
		   }
		   		   /**
		    * Devuelve verdadero en caso de que sus argumentos sean aproximadamente iguales, bajo e=0.000001. Falso en otro caso
		    * @param Vector4 u
		    * @param Vector4 v
		    * @return Boolean
		    * */
		    static equals(u,v){
				var e=0.000001;
				return (distance(u,v)=<e);
			}
			/**
			 * Devuelve verdadero en caso de que sus argumentos sean exactamente iguales
			 * @param Vector4 u
			 * @param Vector4 v
			 * @return Boolean
			 * */
			 static exactEquals(u,v){
				 return ((u.x==v.x)&&(u.y==v.y)&&(u.z==v.z)&&(u.w==v.w));
			 }
			 			 /**
			  * Devuelve la longitud del vector.
			  * @return Number
			  * */
			  length(){
				  return (Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2)+Math.pow(this.w,2));
			  }
			  			  /**
			   * Devuelve el vector resultado de la normalizacion del vector que la invoca.
			   * @return Vector4
			   * */
			  normalize(){
				  var longitud=this.length();
				  return (new Vector4(this.x/longitud,this.y/longitud,this.z/longitud,this.w/longitud));
			  }
			  			  
			  /**
			   * Asigna nuevos valores a los componentes del vector con que se llama
			   * @param Number x
			   * @param Number y
			   * @param Number z
			   * @param Number w
			   * */
			  set(x,y,z,w){
				  this.x=x;
				  this.y=y;
				  this.z=z;
				  this.w=w;
			  }
			  			  /**
			   * Devuelve la distancia euclidiana al cuadrado que hay entre sus argumentos
			   * @param Vector4 u
			   * @param Vector4 v
			   * @return Number
			   * */
			  static squaredDistance(u,v){
				  return (Math.pow(u.x-v.x,2)+Math.pow(u.y-v.y,2)+Math.pow(u.z-u.z,2)+Math.pow(u.w-u.w,2));
			  }
			 /**
			  * Devuelve el tama&#241;o del vector al cuadrado
			  * @return Number 
			  * */
			  squaredLength(){
				  return (Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2)+Math.pow(this.w,2));
			  }
			  /**
			   *Asigna cero a cada componente del vector que invoca la funcion
			   * */
			   zero(){
				   this.set(0,0,0,0);
			   }
	  }
  CG.Vector4 = Vector4;
  return CG;
})(CG || {});


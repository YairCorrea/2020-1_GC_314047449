var CG = (function(CG) {
  class Vector3{
	  constructor(x,y,z){
		  if(typeof x!=="undefined"){
		  	this.set(x,y,z);
		  }else{
		  	this.zero();
		  }
	  }
	  /**
	   * Regresa la suma de dos vectores (x,y,z)+(x1,y1,z1)=(x+x1,y+y1,z+z1)
	   * @param Vector3 u
	   * @param Vector3 v
	   * @return Vector3 suma
	   * */
	   static add(u,v){
		   return (new Vector3(u.x+v.x,u.y+v.y,u.z+v.z));
	   }
	   /**
	   * Regresa el angulo en radianes entre sus argumentos
	   * @param Vector3 u
	   * @param Vector3 v
	   * */
	   static angle(u,v){
			var magU=u.length();
			var magV=v.length();
			var productoPunto=this.dot(u,v);
			return Math.acos(productoPunto/(magU*magV));
		}
		/**
		 * Regresa un objeto con los mismos valores desde el que se invoco
		 * 
		 * */
		 clone(){
			 return (new Vector3(this.x,this.y,this.z));
		 }
		 /**
		  * Devuelve el producto cruz de sus argumentos.
		  * @param Vector3 u
		  * @param Vector3 v
		  * @return Vector3
		  * */
		 static cross(u,v){
			 return (new Vector3(u.y*v.z-u.z*v.y,u.z*v.x-u.x*v.z,u.y*v.x-u.x*v.y));
		 }
		 /**
		  * Devuelve la distancia euclidiana entre sus argumentos 
		  * @param Vector3 u
		  * @param Vector3 v
		  * @return Number
		  * */
		  static distance(u,v){
			  return (Math.sqrt(Math.pow(u.x-v.x,2)+Math.pow(u.y-v.y,2)+Math.pow(u.z-u.z,2)));
		  }
		  /**
		   *Devuelve el producto punto de sus argumentos 
		   * @param Vector3 u
		   * @param Vector3 v
		   * @return Number
		   * */
		   static dot(u,v){
			   return ((u.x*v.x)+(u.y*v.y)+(u.z*v.z));
		   }
		   /**
		    * Devuelve verdadero en caso de que sus argumentos sean aproximadamente iguales, bajo e=0.000001. Falso en otro caso
		    * @param Vector3 u
		    * @param Vector3 v
		    * @return Boolean
		    * */
		    static equals(u,v){
				var e=0.000001;
				return (this.distance(u,v)<=e);
			}
			/**
			 * Devuelve verdadero en caso de que sus argumentos sean exactamente iguales
			 * @param Vector3 u
			 * @param Vector3 v
			 * @return Boolean
			 * */
			 static exactEquals(u,v){
				 return ((u.x===v.x)&&(u.y===v.y)&&(u.z===v.z));
			 }
			 /**
			  * Devuelve la longitud del vector.
			  * @return Number
			  * */
			  length(){
				  return (Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2)));
			  }
			  /**
			   * Devuelve el vector resultado de la normalizacion del vector que la invoca.
			   * @return Vector3
			   * */
			  normalize(){
				  var longitud=this.length();
				  return (new Vector3(this.x/longitud,this.y/longitud,this.z/longitud));
			  }
			  /**
			   * Asigna nuevos valores a los componentes del vector con que se llama
			   * @param Number x
			   * @param Number y
			   * @param Number z
			   * */
			  set(x,y,z){
				  this.x=x;
				  this.y=y;
				  this.z=z;
			  }
			  /**
			   * Devuelve la distancia euclidiana al cuadrado que hay entre sus argumentos
			   * @param Vector3 u
			   * @param Vector3 v
			   * @return Number
			   * */
			  static squaredDistance(u,v){
				  return (Math.pow(u.x-v.x,2)+Math.pow(u.y-v.y,2)+Math.pow(u.z-u.z,2));
			  }
			 /**
			  * Devuelve el tama&#241;o del vector al cuadrado
			  * @return Number 
			  * */
			  squaredLength(){
				  return (Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2));
			  }
			  /**
			   *Asigna cero a cada componente del vector que invoca la funcion
			   * */
			   zero(){
				   this.set(0,0,0);
			   }
	  }
  CG.Vector3 = Vector3;
  return CG;
})(CG || {});

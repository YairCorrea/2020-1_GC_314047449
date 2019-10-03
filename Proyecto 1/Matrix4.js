var CG;
CG = (function (CG) {
	class Matrix4 {
		constructor(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33) {
			if(typeof a00!=="undefined"){
				this.set(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33);
			}else{
				this.identity();
			}
		}

		static add(m1, m2) {
			let tmp = [];
			let i;
			for (i = 0; i < 16; i++) {
				tmp.push(m1.arreglo[i] + m2.arreglo[i]);
			}
			let resultado = new Matrix4();
			resultado.arreglo = tmp;
			return resultado;
		}

		/**
		 * Devuelve la matriz adjunta, de la matriz con la que se invoca la funcion
		 * @return Matrix4
		 * */
		adjoint() {
			//TODO:Insert method.
			return (new CG.Matrix3(42,42,42));
		}

		/**
		 * Devuelve un objeto el cual tiene los mismos valores del que lo invoco.
		 * @return Matrix4
		 * */
		clone() {
			let resultado = new Matrix4();
			resultado.arreglo = this.arreglo;
			return resultado;
		}

		/**
		 * Devuelve el determinante de la matriz que lo invoco.
		 * @return Number
		 * */
		determinant() {
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
		static equals(m1, m2) {
			return (this.exactEquals(m1, m2));
		}

		/**
		 * Devuelve verdadero si son exactamente iguales sus argumentos.
		 * @param Matrix4 m1
		 * @param Matrix4 m2
		 * @return Boolean
		 * */
		static exactEquals(m1, m2) {
			var i;
			for (i = 0; i < 16; i++) {
				if (m1.arreglo[i] !== m2.arreglo[i]) {
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
		identity() {
			this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
		}

		/**
		 * Devuelve la inversa de la matriz con la que se invoco la funcion
		 * @return Matrix4
		 * */
		invert() {
			var det = this.determinant();
			if (det === 0) throw "No tiene inversa";
			var tA = this.adjoint().transpose();
			return (CG.Matrix4.multiplyScalar(tA, 1 / det));
		}

		/**
		 * Devuelve la multiplicacion de dos matrices
		 * @param Matrix4 m1
		 * @param Matrix4 m2
		 * @return Matrix4
		 * */
		static multiply(m1, m2) {
			let i;
			let x;
			let y;
			let resultado = new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
			for (i = 0; i < 4; i++) {
				for (x = 0; x < 4; x++) {
					let arrayLocal = (i * 4) + x;
					for (y = 0; y < 4; y++) {
						resultado.arreglo[arrayLocal]+= m1.arreglo[(i * 4) + y] * m2.arreglo[(y * 4) + x];
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
		static multiplyScalar(m1, c) {
			let resultado = new Matrix4();
			let tmp = m1.arreglo;
			tmp.forEach(function foo(bar)
			{
				bar *= c;
			});
			resultado.arreglo = tmp;
			return resultado;
		}

		/**
		 * Asigna nuevos valores a los componentes en la matriz con la que se llama
		 * @param a00
		 * @param a01
		 * @param a02
		 * @param a03
		 * @param a10
		 * @param a11
		 * @param a12
		 * @param a13
		 * @param a20
		 * @param a21
		 * @param a22
		 * @param a23
		 * @param a30
		 * @param a31
		 * @param a32
		 * @param a33
		 * */
		set(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33) {
			this.arreglo = [a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33];
		}

		/**
		 * Sustrae m2 de m1
		 * @return Matrix4
		 * @param m1
		 * @param m2
		 * */
		static substract(m1, m2) {
			let tmp = [];
			let i;
			for (i = 0; i < 16; i++) {
				tmp.push(m1.arreglo[i] - m2.arreglo[i]);
			}
			let resultado = new Matrix4();
			resultado.arreglo = tmp;
			return resultado;
		}

		/** Devuelve la matriz transpuesta de la matriz desde donde se invoco la funcion
		 * @return Matrix4
		 * */
		transpose() {
			return (new Matrix4(this.arreglo[0], this.arreglo[4], this.arreglo[8], this.arreglo[12], this.arreglo[1], this.arreglo[5], this.arreglo[9], this.arreglo[13], this.arreglo[2], this.arreglo[6], this.arreglo[10], this.arreglo[14], this.arreglo[3], this.arreglo[7], this.arreglo[11], this.arreglo[15]));
		}

		/**
		 *
		 * @param left
		 * @param right
		 * @param bottom
		 * @param top
		 * @param near
		 * @param far
		 * @returns {number}
		 */
		static frustum(left,right,bottom,top,near,far){
			return new CG.Matrix4((2*near)/(right-left),0,0,0,0,(2*near)/(top-bottom),0,0,(right+left)/(right-left),(top+bottom)/(top-bottom),-(far+near)/(far-near),-1,0,0,((-2*far*near)/(far-near)),0);
		}

		/**
		 *
		 * @param eye
		 * @param center
		 * @param up
		 * @returns {Matrix4}
		 */
		static lookAt(eye,center,up){
			let ejeZ=(new CG.Vector3(eye.x-center.x,eye.y-center.y,eye.z-center.z)).normalize();
			let ejeX=CG.Vector3.cross(up,ejeZ).normalize();
			let ejeY=CG.Vector3.cross(ejeZ,ejeX);
			let orientation=new CG.Matrix4(ejeX.x,ejeX.y,ejeX.z,0,ejeY.x,ejeY.y,ejeY.z,0,ejeZ.x,ejeZ.y,ejeZ.z,0,0,0,0,1);
			let translacion=new CG.Matrix4(1,0,0,-eye.x,0,1,0,-eye.y,0,0,1,-eye.z,0,0,0,1);
			console.log(orientation);
			console.log(translacion);
			return CG.Matrix4.multiply(orientation,translacion);
		}
		/**
		 * @param {Vector4} v
		 * @return {Vector4}
		 */
		multiplyVector(v) {
			let x = (v.x * this.arreglo[0]) + (v.x * this.arreglo[4]) + (v.x * this.arreglo[8]) + (v.x * this.arreglo[12]);
			let y = (v.y * this.arreglo[1]) + (v.y * this.arreglo[5]) + (v.y * this.arreglo[9]) + (v.y * this.arreglo[13]);
			let z = (v.z * this.arreglo[2]) + (v.z * this.arreglo[6]) + (v.z * this.arreglo[10]) + (v.z * this.arreglo[14]);
			let w = (v.w * this.arreglo[3]) + (v.w * this.arreglo[7]) + (v.w * this.arreglo[11]) + (v.w * this.arreglo[15]);
			let tmp=new CG.Vector4(x, y, z, w);
			return (tmp);
		}

		/**
		 *
		 * @param left
		 * @param right
		 * @param bottom
		 * @param top
		 * @param near
		 * @param far
		 */
		static ortho(left,right,bottom,top,near,far){
			return new CG.Matrix4(2/(right-left),0,0,(-right+left)/(right-left),0,2/(top-bottom),0,(-top+bottom)/(top-bottom),0,0,2/(near-far),-near/(far-near),0,0,0,1);
		}

		/**
		 *
		 * @param fovy
		 * @param aspect
		 * @param near
		 * @param far
		 */
		static perspective(fovy,aspect,near,far){
			let S= Math.atan(fovy/2);
			return new CG.Matrix4(S/aspect,0,0,0,0,S,0,0,0,0,-far/(far-near),-1,-(far*near)/(far-near),0,(near*far)/(far-near),0);
		}

		/**
		 * @param {Number} rad
		 * @return {Matrix4}
		 */
		static rotateX(rad) {
			return new CG.Matrix4(1, 0, 0, 0, 0, Math.cos(rad), Math.sin(rad), 0, 0, -Math.sin(rad), Math.cos(rad), 0, 0, 0, 0, 1);
		}

		/**
		 * @param {Number} rad
		 * @return {Matrix4}
		 */
		static rotateY(rad) {
			return new CG.Matrix4(Math.cos(rad), 0, -Math.sin(rad), 0, 0, 1, 0, 0, Math.sin(rad), 0, Math.cos(rad), 0, 0, 0, 0, 1);
		}

		/**
		 * @param {Number} rad
		 * @return {Matrix4}
		 */
		static rotateZ(rad) {
			return new CG.Matrix4(Math.cos(rad),-Math.sin(rad), 0, 0, -Math.sin(rad), Math.cos(rad), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
		}

		/**
		 * @param {Vector3} v
		 * @return {Matrix4}
		 */
		static scale(v) {
			return new CG.Matrix4(v.x, 0, 0, 0, 0, v.y, 0, 0, 0, 0, v.z, 0, 0, 0, 0, 1);
		}

		/**
		 * @param {Vector3} v
		 * @return {Matrix4}
		 */
		static translate(v) {
			return new CG.Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, v.x, v.y, v.z, 1);
		}
	}

	CG.Matrix4 = Matrix4;
	return CG;
})(CG || {});

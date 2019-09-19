var CG;
CG = (function (CG) {
	class Matrix4 {
		constructor() {
			this.identity();
		}

		constructor(a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33) {
			this.set(a00, a01, a02, a10, a11, a12, a20, a21, a22, a23, a30, a31, a32, a33);
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
		 * @return Matrix3
		 * */
		adjoint() {
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
				if (m1.arreglo[i] != m2.arreglo[i]) {
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
			return (this.multiplyScalar(tA, 1 / det));
		}

		/**
		 * Devuelve la multiplicacion de dos matrices
		 * @param Matrix4 m1
		 * @param Matrix4 m2
		 * @return Matrix4
		 * */
		static multiply(m1, m2) {
			var i;
			var x;
			var y;
			var resultado = new Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
			for (i = 0; i < 4; i++) {
				for (x = 0; x < 4; x++) {
					var arrayLocal = (i * 4) + x;
					for (y = 0; y < 4; y++) {
						resultado.arreglo[arrayLocal] = m1.arreglo[(i * 4) + y] * m2.arreglo[(y * 4) + x];
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
			var resultado = new Matrix4();
			var tmp = m1.arreglo;
			tmp.forEach(foo(bar)
			{
				bar *= c;
			}
		)
			;
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
			//TODO: THe method.
			return 42;
		}

		/**
		 *
		 * @param eye
		 * @param center
		 * @param up
		 * @returns {number}
		 */
		static lookAt(eye,center,up){
			//TODO: The method.
			return 42;
		}
		/**
		 * @param {Vector4} v
		 * @return {Vector4}
		 */
		multiplyVector(v) {
			var x = (v.x * this.a00) + (v.x * this.a10) + (v.x * this.a20) + (v.x * this.a30);
			var y = (v.y * this.a01) + (v.y * this.a11) + (v.y * this.a21) + (v.y * this.a31);
			var z = (v.z * this.a02) + (v.z * this.a12) + (v.z * this.a22) + (v.z * this.a32);
			var w = (v.w * this.a03) + (v.w * this.a13) + (v.w * this.a23) + (v.w * this.a33);
			return vec = new CG.Vector4(x, y, z, w);
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
			//TODO:The method.
			return 42;
		}

		/**
		 *
		 * @param fovy
		 * @param aspect
		 * @param near
		 * @param far
		 */
		static perspective(fovy,aspect,near,far){
			//TODO:The method.
			return 42;
		}

		/**
		 * @param {Number} rad
		 * @return {Matrix4}
		 */
		static rotateX(rad) {
			return matr4 = new Matrix4(1, 0, 0, 0, 0, cos(red), sin(rad), 0, 0, -sin(rad), cos(rad), 0, 0, 0, 0, 1);
		}

		/**
		 * @param {Number} rad
		 * @return {Matrix4}
		 */
		static rotateY(rad) {
			return matr4 = new Matrix4(cos(rad), 0, -sin(rad), 0, 0, 1, 0, 0, sin(rad), 0, cos(rad), 0, 0, 0, 0, 1);
		}

		/**
		 * @param {Number} rad
		 * @return {Matrix4}
		 */
		static rotateZ(rad) {
			return matr4 = new Matrix4(cos(rad), sin(rad), 0, 0, -sin(rad), cos(rad), 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
		}

		/**
		 * @param {Vector3} v
		 * @return {Matrix4}
		 */
		static scale(v) {
			return matr4 = new Matrix4(v.x, 0, 0, 0, 0, v.y, 0, 0, 0, 0, v.z, 0, 0, 0, 0, 1);
		}

		/**
		 * @param {Vector3} v
		 * @return {Matrix4}
		 */
		static translate(v) {
			return matr4 = new Matrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, v.x, v.y, v.z, 1);
		}
	}

	CG.Matrix4 = Matrix4;
	return CG;
})(CG || {});

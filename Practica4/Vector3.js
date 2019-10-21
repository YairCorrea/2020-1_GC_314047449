var CG = (function(CG) {
  let epsilon = 0.000001;

  class Vector3 {
    constructor(x=0, y=0, z=0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    static add(u, v) {
      return new Vector3(
        u.x + v.x, 
        u.y + v.y, 
        u.z + v.z
      );
    }

    static angle(u, v) {
      return Math.acos(
        Vector3.dot(u, v) / (u.length() * v.length())
      );
    }

    clone() {
      return new Vector3(this.x, this.y, this.z);
    }

    static cross(u, v) {
      return new Vector3(
        u.y*v.z - u.z*v.y,
        u.z*v.x - u.x*v.z,
        u.x*v.y - u.y*v.x
      );
    }

    static distance(u, v) {
      return Math.sqrt(
        Vector3.squareDistance(u, v)
      );
    }

    static dot(u, v) {
      return u.x*v.x + u.y*v.y + u.z*v.z;
    }

    static equals(u, v) {
      return (
        Math.abs(u.x - v.x) <= epsilon && Math.abs(u.y - v.y) <= epsilon && Math.abs(u.z - v.z) <= epsilon
      );
    }

    static exactEquals(u, v) {
      return u.x === v.x && u.y === v.y && u.z === v.z;
    }

    length() {
      return Math.sqrt(
        this.squaredLength()
      );
    }

    normalize() {
      var len = this.length();

      if (len !== 0) {
        return new Vector3(
          this.x / len,
          this.y / len,
          this.z / len
        );
      }
      else {
        return new Vector3();
      }
    }

    set(x=0, y=0, z=0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    static squareDistance(u, v) {
      return (u.x-v.x)**2 + (u.y-v.y)**2 + (u.z-v.z)**2;
    }

    squaredLength() {
      return Vector3.distance(new Vector3(), this)** 2;
    }

    static subtract(u, v) {
      return new Vector3(
        u.x - v.x,
        u.y - v.y,
        u.z - v.z
      );
    }

    zero() {
      this.set();
    }

    multiplyEscalar(c){
      return new Vector3(
        this.x * c,
        this.y * c,
        this.z * c
      );
    }
  }

  CG.Vector3 = Vector3;
  return CG;
}(CG || {}));
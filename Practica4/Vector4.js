var CG = (function(CG) {
  let epsilon = 0.000001;

  class Vector4 {
		constructor(x=0, y=0, z=0, w=0) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w; 
    }

    static add(u, v) {
      return new Vector4(
        u.x + v.x, 
        u.y + v.y, 
        u.z + v.z, 
        u.w + v.w
      );
    }

    clone() {
      return new Vector4(this.x, this.y, this.z, this.w);
    }

    static distance(u, v) {
      return Math.sqrt(
        Vector4.squareDistance(u, v)
      );
    }

    static dot(u, v) {
      return u.x*v.x + u.y*v.y + u.z*v.z + u.w*v*w;
    }

    static equals(u, v) {
      return (
        Math.abs(u.x - v.x) <= epsilon && Math.abs(u.y - v.y) <= epsilon && Math.abs(u.z - v.z) <= epsilon && Math.abs(u.w - v.w) <= epsilon
      );
    }

    static exactEquals(u, v) {
      return u.x === v.x && u.y === v.y && u.z === v.z && u.w === v.w;
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
          this.z / len,
          this.w / len
        );
      }
      else {
        return new Vector3();
      }
    }

    set(x=0, y=0, z=0, w=0) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
    }

    static squareDistance(u, v) {
      return (u.x-v.x)**2 + (u.y-v.y)**2 + (u.z-v.z)**2 + (u.w-v.w)**2;
    }

    squaredLength() {
      return Vector4.distance(new Vector4(), this)**2;
    }

    zero() {
      this.set();
    }
  }

  CG.Vector4 = Vector4;
  return CG;
}(CG || {}));


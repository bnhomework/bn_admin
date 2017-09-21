var ARRAY_POOL = new Array(16);

var IDENTITY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

var TRANSPOSE_INDICES = [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15];

var Matrix = function Matrix(m1) {
  this.m = m1 != null ? m1 : null;
  if (this.m == null) {
    this.m = IDENTITY.slice();
  }
  this.baked = IDENTITY;
}

Matrix.prototype.copy = function() {
  return new Matrix(this.m.slice());
};

Matrix.prototype.matrix = function(m) {
  var c, i, j, o, u;
  c = ARRAY_POOL;
  for (j = o = 0; o < 4; j = ++o) {
    for (i = u = 0; u < 16; i = u += 4) {
      c[i + j] = m[i] * this.m[j] + m[i + 1] * this.m[4 + j] + m[i + 2] * this.m[8 + j] + m[i + 3] * this.m[12 + j];
    }
  }
  ARRAY_POOL = this.m;
  this.m = c;
  return this;
};

Matrix.prototype.reset = function() {
  this.m = this.baked.slice();
  return this;
};

Matrix.prototype.bake = function(m) {
  this.baked = (m != null ? m : this.m).slice();
  return this;
};

Matrix.prototype.multiply = function(b) {
  return this.matrix(b.m);
};

Matrix.prototype.transpose = function() {
  var c, i, len1, o, ti;
  c = ARRAY_POOL;
  for (i = o = 0, len1 = TRANSPOSE_INDICES.length; o < len1; i = ++o) {
    ti = TRANSPOSE_INDICES[i];
    c[i] = this.m[ti];
  }
  ARRAY_POOL = this.m;
  this.m = c;
  return this;
};

Matrix.prototype.rotx = function(theta) {
  var ct, rm, st;
  ct = Math.cos(theta);
  st = Math.sin(theta);
  rm = [1, 0, 0, 0, 0, ct, -st, 0, 0, st, ct, 0, 0, 0, 0, 1];
  return this.matrix(rm);
};

Matrix.prototype.roty = function(theta) {
  var ct, rm, st;
  ct = Math.cos(theta);
  st = Math.sin(theta);
  rm = [ct, 0, st, 0, 0, 1, 0, 0, -st, 0, ct, 0, 0, 0, 0, 1];
  return this.matrix(rm);
};

Matrix.prototype.rotz = function(theta) {
  var ct, rm, st;
  ct = Math.cos(theta);
  st = Math.sin(theta);
  rm = [ct, -st, 0, 0, st, ct, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
  return this.matrix(rm);
};

Matrix.prototype.translate = function(x, y, z) {
  var rm;
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (z == null) {
    z = 0;
  }
  rm = [1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1];
  return this.matrix(rm);
};

Matrix.prototype.scale = function(sx, sy, sz) {
  var rm;
  if (sx == null) {
    sx = 1;
  }
  if (sy == null) {
    sy = sx;
  }
  if (sz == null) {
    sz = sy;
  }
  rm = [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1];
  return this.matrix(rm);
};
Matrix.prototype.OrthographicProjectionMatrix = function(s) {
    s=s||{w:1,h:1,near:-1,far:1};
    return [1/s.w,0,0,0,
    0,1/s.h,0,0,
    0,0,-2/(s.far-s.near),-(s.far+s.near)/(s.far-s.near),
    0,0,0,1
    ];
  }

export default Matrix;

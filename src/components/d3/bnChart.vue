<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" :viewbox="viewbox" :width="setup.w" :height="setup.h" \:transform="transform" @mousedown="mousedown" @mouseup="mouseup" @mousemove="mousemove" @mousewheel="mousewheel" @mouseout="mouseout">
    <path class="bn-axis" v-for="line in axisLines" :d="drawLine(line)" />
    <path class="bn-axis-help" v-for="line in helpLines" :d="drawLine(line)" :class="line.c" />
    <g v-for="line in axisArrows">
      <path class="bn-axis" :d="line.path" />
      <text :x="line.label.p.x" :y="line.label.p.y" font-size="20">{{line.label.text}}</text>
    </g>
    <template v-for="point in points">
      <g class="bn-point-warp">
        <path pointer-events="all" version="1.1" xmlns="http://www.w3.org/2000/svg" :d="drawPoint(point.p)" class="bn-point">
        </path>
        <!-- <text  width="30" height="20">point.label</text> -->
        <path pointer-events="all" version="1.1" xmlns="http://www.w3.org/2000/svg" :d="drawProjectionLine(point.p,'1')" class="bn-projection-line">
        </path>
        <path pointer-events="all" version="1.1" xmlns="http://www.w3.org/2000/svg" :d="drawProjectionLine(point.p,'2')" class="bn-projection-line">
        </path>
        <path pointer-events="all" version="1.1" xmlns="http://www.w3.org/2000/svg" :d="drawProjectionLine(point.p,'3')" class="bn-projection-line">
        </path>
      </g>
    </template>
  </svg>
</template>
<script>
function Matrix(m) {
  var self = this;
  self.IDENTITY = [1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  ];
  self.TRANSPOSE_INDICES = [0, 4, 8, 12,
    1, 5, 9, 13,
    2, 6, 10, 14,
    3, 7, 11, 15
  ];
  if (m) {
    self._m = m;
  } else {
    self._m = self.IDENTITY.slice();
  }
  self.copy = function() {
    return self._m.slice();
  }
  self.matrix = function(m) {
    var c = self.IDENTITY.slice();

    for (var j = 0; j < 4; j++) {
      for (var i = 0; i < 16; i = i + 4) {

        c[i + j] =
          m[i] * self._m[j] +
          m[i + 1] * self._m[4 + j] +
          m[i + 2] * self._m[8 + j] +
          m[i + 3] * self._m[12 + j]
      }
    }
    console.log(c)
    return c;
  }

  //   # Apply a rotation about the X axis. `Theta` is measured in Radians
  self.rotx = function(theta) {
    var ct = Math.cos(theta);
    var st = Math.sin(theta);
    var rm = [1, 0, 0, 0,
     0,  ct, -st, 0, 
     0, st, ct, 0,
      0, 0, 0, 1
    ];
    return self.matrix(rm);
  }

  // # Apply a rotation about the Y axis. `Theta` is measured in Radians
  self.roty = function(theta) {
    var ct = Math.cos(theta);
    var st = Math.sin(theta);
    var rm = [ct, 0, st, 0, 0, 1, 0, 0, -st, 0, ct, 0, 0, 0, 0, 1];
    return self.matrix(rm);
  }
  // # Apply a rotation about the Z axis. `Theta` is measured in Radians
  self.rotz = function(theta) {
    var ct = Math.cos(theta);
    var st = Math.sin(theta);
    var rm = [ct, -st, 0, 0, st, ct, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    return self.matrix(rm);
  }
  // # Apply a translation. All arguments default to `0`
  self.translate = function(x = 0, y = 0, z = 0) {

    var rm = [1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1]
    return self.matrix(rm);
  }

  // # Apply a scale. If not all arguments are supplied, each dimension (x,y,z)
  // # is copied from the previous arugment. Therefore, `_scale()` is equivalent
  // # to `_scale(1,1,1)`, and `_scale(1,-1)` is equivalent to `_scale(1,-1,-1)`
  self.scale = function(sx, sy, sz) {
    sx = sx || 1;
    sy = sy || sx;
    sz = sz || sy;
    rm = [sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, sz, 0, 0, 0, 0, 1]
    return self.matrix(rm);
  }
}
export default {
  data() {
    return {
      setup: { w: 1000, h: 1000, theta: 45, helpLineDistince: 50, perspective: { left: -1, right: 1, bottom: -1, top: 1, near: 1, far: 100 } },
      action: 'NA', //pan,retoe
      cursor: { x: 0.0, y: 0.0 },
      target: {
        position: { x: 0.0, y: 0.0 },
        rotation: { x: 0.0, y: 0.0 },
        zoom: 0
      },
      targetOnDown: {
        position: { x: 0, y: 0 },
        rotation: { x: 0, y: 0 },
        zoom: 0
      },
      M: undefined
    };
  },
  created() {
    // document.add
    this.init();
  },
  beforeDestroy() {

  },
  props: ['points'],
  methods: {
    init() {
      this.M = new Matrix().copy();
      // this.M =new Matrix(this.M).rotx2(-135);
      // this.M =new Matrix(this.M).rot(30,30,0);
      // this.M =new Matrix(this.M).roty2(-45);

    },
    projection(p) {
      var d2_p = {};
      p = this.applyMatrix(p)
      // d2_p.x = this.center.x + p.x - p.z * Math.sin(this.setup.theta);
      // d2_p.y = this.center.y - p.y + p.z * Math.cos(this.setup.theta);


      d2_p.x = this.center.x + p.x - p.z * Math.sin(this.setup.theta) //-p.x* Math.cos(this.setup.theta);
      d2_p.y = this.center.y - p.y + p.z * Math.cos(this.setup.theta) //+p.x* Math.sin(this.setup.theta);

      //  d2_p.x = this.center.x + p.x /(p.y +20000)*20000;
      // d2_p.y = this.center.y +p.z /( p.y +20000)*20000;
      return d2_p;
    },
    applyMatrix(p) {
      p.w = p.w || 1;
      var r = {};
      r.x = p.x * this.M[0] + p.y * this.M[1] + p.z * this.M[2] + p.w * this.M[3]
      r.y = p.x * this.M[4] + p.y * this.M[5] + p.z * this.M[6] + p.w * this.M[7]
      r.z = p.x * this.M[8] + p.y * this.M[9] + p.z * this.M[10] + p.w * this.M[11]
      r.w = p.x * this.M[12] + p.y * this.M[13] + p.z * this.M[14] + p.w * this.M[15]

      return r;

    },
    circlePath(cx, cy, r) {
      return 'M ' + cx + ' ' + cy + ' m -' + r + ', 0 a ' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0 a ' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0';
    },
    drawPoint(p) {
      var d2_p = this.projection(p);
      return this.circlePath(d2_p.x, d2_p.y, 5);
    },
    drawLine(l) {
      var f = this.projection(l.f);
      var t = this.projection(l.t);
      return `M${f.x} ${f.y} L ${t.x} ${t.y}`;
    },
    drawProjectionLine(p, t) {
      var newP = { x: p.x, y: p.y, z: p.z };
      if (t == 1) {
        newP.x = 0;
      } else if (t == 2) {
        newP.y = 0;
      } else if (t == 3) {
        newP.z = 0;
      }
      return this.drawLine({ f: p, t: newP });
    },
    //event start
    mousewheel(e) {
      e.preventDefault();
      var delta = (e.wheelDelta) ? e.wheelDelta : -e.detail;
      this.target.zoom += (delta > 0) ? 15 : -15;
      if (this.target.zoom < 50)
        this.target.zoom = 50;
    },
    mousedown(e) {
      this.actoin = 'NA'
      if (e.which < 3) {
        if (e.which == 2) {

          this.actoin = 'pan';
        } else {
          this.action = 'rotation';
        }
        this.cursor.x = e.pageX;
        this.cursor.y = e.pageY;
        this.targetOnDown.position.x = this.target.position.x;
        this.targetOnDown.position.y = this.target.position.y;
        this.targetOnDown.rotation.x = this.target.rotation.x;
        this.targetOnDown.rotation.y = this.target.rotation.y;
        this.targetOnDown.zoom = this.target.zoom;
      }
    },
    mousemove(e) {
      var delta = { x: e.pageX - this.cursor.x, y: e.pageY - this.cursor.y };

      this.cursor.x = e.pageX;
      this.cursor.y = e.pageY;
      if (this.action == 'rotation') {
        var minDelta = 2;
        var l = 0.03 * 0.1;

        if (Math.abs(delta.x) < 2 && Math.abs(delta.y) < 2) {
          return
        }
        // this.M= new Matrix(this.M).matrix(this.xyToTransform(delta.x,delta.y));
        if (Math.abs(delta.x) > Math.abs(delta.y)) {
          this.M = new Matrix(this.M).roty(delta.x * l);
        } else {
          this.M = new Matrix(this.M).rotx(delta.y * l);
          this.M = new Matrix(this.M).rotz(-1 * delta.y * l);
        }
      } else if (this.action == 'pan') {
        this.target.position.x = this.targetOnDown.position.x + e.pageX - this.cursor.x;
        this.target.position.y = this.targetOnDown.position.y + e.pageY - this.cursor.y;
      } else if (this.action == 'zoom') {
        this.target.zoom = this.targetOnDown.zoom - (e.pageY - this.cursor.y) * 0.4;
        if (this.target.zoom < 50)
          this.target.zoom = 50;
      }
    },
    mouseup(e) {
      this.action = 'NA'
    },
    mouseout(e) {
      // this.action = 'NA'
    }
  },
  computed: {
    maxAxis() {
      return this.setup.w / 2 * 0.7;
    },
    viewbox() {
      var s = 2.0 / 3.0;

      return `${this.setup.w*s/4} ${this.setup.h*s/4} ${this.setup.w*s} ${this.setup.h*s}`
    },
    center() {
      return { x: this.setup.w / 2, y: this.setup.h / 2 }
    },
    transform() {
      // return `rotate(${this.rotation.x},${this.rotation.y})`

      return `skewX(${this.rotation.x}) skewY(${this.rotation.y})`
    },
    axisLines() {
      var lines = [];
      lines.push({ f: { x: 0, y: 0, z: 0 }, t: { x: this.maxAxis, y: 0, z: 0 } })
      lines.push({ f: { x: 0, y: 0, z: 0 }, t: { y: this.maxAxis, x: 0, z: 0 } })
      lines.push({ f: { x: 0, y: 0, z: 0 }, t: { z: this.maxAxis, y: 0, x: 0 } })
      return lines;
    },
    axisArrows() {
      var alist = [];
      var o1 = 5;
      var o2 = 3;

      var o3 = 20;
      var x1 = this.projection({ x: this.maxAxis, y: 0, z: 0 });
      var x2 = this.projection({ x: this.maxAxis, y: o2, z: 0 });
      var x3 = this.projection({ x: this.maxAxis + o1, y: 0, z: 0 });
      var x31 = this.projection({ x: this.maxAxis + o3, y: 0, z: 0 });
      var x4 = this.projection({ x: this.maxAxis, y: 0 - o2, z: 0 });
      alist.push({ label: { p: x31, text: 'x' }, path: `M${x1.x} ${x1.y} L${x2.x} ${x2.y} L${x3.x} ${x3.y} L${x4.x} ${x4.y} Z` });


      var y1 = this.projection({ y: this.maxAxis, z: 0, x: 0 });
      var y2 = this.projection({ y: this.maxAxis, z: o2, x: 0 });
      var y3 = this.projection({ y: this.maxAxis + o1, z: 0, x: 0 });
      var y31 = this.projection({ y: this.maxAxis + o3, z: 0, x: 0 });
      var y4 = this.projection({ y: this.maxAxis, z: 0 - o2, x: 0 });
      alist.push({ label: { p: y31, text: 'y' }, path: `M${y1.x} ${y1.y} L${y2.x} ${y2.y} L${y3.x} ${y3.y} L${y4.x} ${y4.y} Z` });


      var z1 = this.projection({ z: this.maxAxis, x: 0, y: 0 });
      var z2 = this.projection({ z: this.maxAxis, x: o2, y: 0 });
      var z3 = this.projection({ z: this.maxAxis + o1, x: 0, y: 0 });
      var z31 = this.projection({ z: this.maxAxis + o3, x: 0, y: 0 });
      var z4 = this.projection({ z: this.maxAxis, x: 0 - o2, y: 0 });
      alist.push({ label: { p: z31, text: 'z' }, path: `M${z1.x} ${z1.y} L${z2.x} ${z2.y} L${z3.x} ${z3.y} L${z4.x} ${z4.y} Z` });
      return alist;
    },
    helpLines() {
      var lines = [];
      var max = this.maxAxis;
      var dist = this.setup.helpLineDistince;
      var c = parseInt(max / dist, 10) || 0;

      // for (var i = c; i >= 0-c; i--) {
      //   var l = i * dist;
      //   lines.push({ f: { x: -max, y: 0, z: l }, t: { x: max, y: 0, z: l } ,c:'c1'});
      //   lines.push({ f: { x: l, y: 0, z: -max }, t: { x: l, y: 0, z: max } ,c:'c1'});
      // }
      for (var i = c; i >= 0; i--) {
        var l = i * dist;
        // //x
        lines.push({ f: { x: 0, y: 0, z: l }, t: { x: max, y: 0, z: l }, c: 'c2' });
        lines.push({ f: { x: 0, y: l, z: 0 }, t: { x: max, y: l, z: 0 }, c: 'c2' });

        //y
        lines.push({ f: { x: l, y: 0, z: 0 }, t: { x: l, y: max, z: 0 }, c: 'c2' });
        lines.push({ f: { x: 0, y: 0, z: l }, t: { x: 0, y: max, z: l }, c: 'c2' });
        //z
        lines.push({ f: { x: 0, y: l, z: 0 }, t: { x: 0, y: l, z: max }, c: 'c2' });
        lines.push({ f: { x: l, y: 0, z: 0 }, t: { x: l, y: 0, z: max }, c: 'c2' });
      }
      return lines;
    },
    perspectiveM() {
      var s = this.setup.perspective;
      var near2 = 2 * s.near
      var dx = s.right - s.left
      var dy = s.top - s.bottom
      var dz = s.far - s.near
      return [near2 / dx, 0.0, (s.right + s.left) / dx, 0.0,
        0.0, near2 / dy, 0.0, (s.top + s.bottom) / dy,
        0.0, 0.0, -(s.far + s.near) / dz, -(s.far * near2) / dz,
        0.0, 0.0, -1.0, 0.0
      ];
    }
  }
}

</script>
<style scoped>
.bn-axis {
  stroke: #111111
}

.bn-axis-help {
  stroke: #d5d5d5;
}

.bn-point {
  fill: #878aa5
}

.bn-projection-line {
  stroke: #3d3d3d;
  stroke-dasharray: 5, 5;
  display: none;
}

.bn-point-warp:hover .bn-projection-line {
  display: block;
}

svg text::selection {
  background: none; 
  pointer-events:none;
}

</style>

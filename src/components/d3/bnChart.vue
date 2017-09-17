<template>
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" :viewbox="viewbox" :width="setup.w" :height="setup.h" :transform="transform" @mousedown="mousedown" @mouseup="mouseup" @mousemove="mousemove">
    <path class="bn-axis" v-for="line in axisLines" :d="drawLine(line)" />
    <path class="bn-axis-help" v-for="line in helpLines" :d="drawLine(line)" />
    <path class="bn-axis" v-for="line in axisArrows" :d="line.path" />
    <template v-for="point in points">
      <g class="bn-point-warp">
        <path pointer-events="all" version="1.1" xmlns="http://www.w3.org/2000/svg" :d="drawPoint(point.p)" class="bn-point">
        </path>
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
  self.IDENTITY = [1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
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
      for (var i = 0; i < 16; i++) {
        if (i % 4 != 0) {
          continue;
        }
        c[i + j] =
          m[i] * self._m[j] +
          m[i + 1] * self._m[4 + j] +
          m[i + 2] * self._m[8 + j] +
          m[i + 3] * self._m[12 + j]
      }
    }
    return c;
  }

  //   # Apply a rotation about the X axis. `Theta` is measured in Radians
  self.rotx = function(theta) {
    var ct = Math.cos(theta);
    var st = Math.sin(theta);
    var rm = [1, 0, 0, 0, 0, ct, -st, 0, 0, st, ct, 0, 0, 0, 0, 1];
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
      setup: { w: 800, h: 800, theta: 45, helpLineDistince: 50 },
      action: 'NA', //pan,retoe
      cursor: { x: 0, y: 0 },
      rotation: { x: 0, y: 0 },
      rotationOnDown: { x: 0, y: 0 }
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

    },
    projection(p) {
      var d2_p = {};
      d2_p.x = this.center.x + p.x - p.z * Math.sin(this.setup.theta);
      d2_p.y = this.center.y - p.y + p.z * Math.cos(this.setup.theta);
      return d2_p;
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
      // var newP={x:0,y:0,z:0};
      // if(t==1){
      // 	newP.x=p.x;
      // }else if(t==2){
      // 	newP.y=p.y;
      // }else if(t==3){
      // 	newP.z=p.z;
      // }
      return this.drawLine({ f: p, t: newP });
    },
    //event start
    mousedown(e) {
      if (e.which < 3) {
        if (e.which == 2) {
          this.actoin = 'pan';
        } else {
          this.action = 'rotation';
        }
        this.cursor.x = e.pageX;
        this.cursor.y = e.pageY;
        this.rotationOnDown.x = this.rotation.x;
        this.rotationOnDown.y = this.rotation.y;
      }
    },
    mousemove(e) {
      if (this.action == 'rotation') {
        this.rotation.x = this.rotationOnDown.x - (e.pageY - this.cursor.y) * 0.3;
        this.rotation.y = this.rotationOnDown.y + (e.pageX - this.cursor.x) * 0.3;
      }
    },
    mouseup(e) {
      this.action = 'NA'
    }
  },
  computed: {
    maxAxis() {
      return this.setup.w / 2 * 0.9;
    },
    viewbox() {
      return `0 0 ${this.setup.w} ${this.setup.h}`
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
      var x1 = this.projection({ x: this.maxAxis, y: 0, z: 0 });
      var x2 = this.projection({ x: this.maxAxis, y: o2, z: 0 });
      var x3 = this.projection({ x: this.maxAxis + o1, y: 0, z: 0 });
      var x4 = this.projection({ x: this.maxAxis, y: 0 - o2, z: 0 });
      alist.push({ label: 'X', path: `M${x1.x} ${x1.y} L${x2.x} ${x2.y} L${x3.x} ${x3.y} L${x4.x} ${x4.y} Z` });


      var y1 = this.projection({ y: this.maxAxis, z: 0, x: 0 });
      var y2 = this.projection({ y: this.maxAxis, z: o2, x: 0 });
      var y3 = this.projection({ y: this.maxAxis + o1, z: 0, x: 0 });
      var y4 = this.projection({ y: this.maxAxis, z: 0 - o2, x: 0 });
      alist.push({ label: 'X', path: `M${y1.x} ${y1.y} L${y2.x} ${y2.y} L${y3.x} ${y3.y} L${y4.x} ${y4.y} Z` });


      var z1 = this.projection({ z: this.maxAxis, x: 0, y: 0 });
      var z2 = this.projection({ z: this.maxAxis, x: o2, y: 0 });
      var z3 = this.projection({ z: this.maxAxis + o1, x: 0, y: 0 });
      var z4 = this.projection({ z: this.maxAxis, x: 0 - o2, y: 0 });
      alist.push({ label: 'X', path: `M${z1.x} ${z1.y} L${z2.x} ${z2.y} L${z3.x} ${z3.y} L${z4.x} ${z4.y} Z` });
      return alist;
    },
    helpLines() {
      var lines = [];
      var max = this.maxAxis;
      var dist = this.setup.helpLineDistince;
      var c = parseInt(max / dist, 10) || 0;
      for (var i = c; i > 0; i--) {
        var l = i * dist;
        //x
        lines.push({ f: { x: 0, y: 0, z: l }, t: { x: max, y: 0, z: l } });
        lines.push({ f: { x: 0, y: l, z: 0 }, t: { x: max, y: l, z: 0 } });

        //y
        lines.push({ f: { x: l, y: 0, z: 0 }, t: { x: l, y: max, z: 0 } });
        lines.push({ f: { x: 0, y: 0, z: l }, t: { x: 0, y: max, z: l } });
        //z
        lines.push({ f: { x: 0, y: l, z: 0 }, t: { x: 0, y: l, z: max } });
        lines.push({ f: { x: l, y: 0, z: 0 }, t: { x: l, y: 0, z: max } });
      }
      return lines;
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

</style>

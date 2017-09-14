<template>
  <svg style="width: 100%;height: 100%;min-height: 800px;min-width: 800px">
    <template v-for="r in relationships">
      <path :d="getpath(r)" transform="translate(3.5,3)" pointer-events="visibleStroke" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none" :stroke="lineColor" style="" stroke-width="1"></path>
      <path pointer-events="all" version="1.1" xmlns="http://www.w3.org/2000/svg" :d="getEndPoint(r)" class="" :stroke="lineColor" :fill="lineColor" transform="translate(3.5,3)"></path>
      <g fill="none" class="bn-line-action">        
      <path pointer-events="all" version="1.1" xmlns="http://www.w3.org/2000/svg" :d="getActionPath(r)" class="" :stroke="lineColor" :fill="lineColor" transform="translate(3.5,3)" @click="removeRelationship(r)">   
      </path>  
      <rect x="200" y="10" width="10" height="10" class="bn-line-action-item" />   
      </g>
    </template>
  </svg>
</template>
<script>
export default {
  data() {
    return {
      locked: false,
      moving: false,
      orignalPosition: {},
      dw: 100,
      dh: 50,
      offsetx:25,
      offsetx2:5
    }
  },
  props: ['relationships'],
  created() {
    // this.eventHub.$on('drop', this.drop)
  },
  beforeDestroy: function() {
    // eventHub.$off('drop', this.drop)
  },
  methods: {
    getpath(r) {
      return this.calcLine(r).line;
    },
    getEndPoint(r) {
      return this.calcLine(r).arrow;
    },
    getActionPath(r){
      var m2= this.calcLine(r).m2
      return `M ${m2.x} ${m2.y} A 5 5 0 1 0 ${m2.x} ${m2.y-1}`
    },
    removeRelationship(r){
      var idx=r.from.next.indexOf(r.to.id);
      r.from.next.splice(idx,1);
    },
    calcLine(r){
      var fx1=this.getLeft(r.from).x;
      var fx2=this.getRight(r.from).x;
      var tx1=this.getLeft(r.to).x;
      var tx2=this.getRight(r.to).x;

      var fy1=this.getTop(r.from).y;
      var fy2=this.getBottom(r.from).y;
      var ty1=this.getTop(r.to).y;
      var ty2=this.getBottom(r.to).y;
      var minoffset=35
      if(fx2+minoffset<tx1){
        return this.drawRightToLeft(r);
      }else if(fx1>tx2+minoffset){
        return this.drawLeftToRight(r);
      }else if(fy1>ty2){
        return this.drawTopToBottom(r);
      }else if(fy2<ty2){
        return this.drawBottomToTop(r);
      }
      return this.drawRightToLeft(r);
    },
    drawRightToLeft(r) {
      var offsetx=this.offsetx;
      var from = this.getRight(r.from);
      from.x+=offsetx;
      var to = this.getLeft(r.to);
      to.x-=this.offsetx2;
      var m1 = { x: (to.x - from.x) / 2 + from.x, y: from.y };
      var m2 = { x: (to.x - from.x) / 2 + from.x, y: to.y };
      var arrow = `M${to.x},${to.y} L${to.x-10},${to.y+5} L${to.x-6.23},${to.y} L${to.x-10},${to.y-5} L${to.x},${to.y}`
      return { line: `M ${from.x-5} ${from.y} L ${m1.x} ${m1.y} L ${m2.x} ${m2.y} L ${to.x} ${to.y}`, arrow: arrow
      ,m2:m2 };
    },
    drawLeftToRight(r) {
      var offsetx=this.offsetx;
      var from = this.getLeft(r.from);
      var to = this.getRight(r.to);
      to.x+=offsetx;
      var m1 = { x: (to.x - from.x) / 2 + from.x, y: from.y };
      var m2 = { x: (to.x - from.x) / 2 + from.x, y: to.y };
      var arrow = `M${to.x},${to.y} L${to.x+10},${to.y+5} L${to.x+6.23},${to.y} L${to.x+10},${to.y-5} L${to.x},${to.y}`
      return { line: `M ${from.x-5} ${from.y} L ${m1.x} ${m1.y} L ${m2.x} ${m2.y} L ${to.x} ${to.y}`, arrow: arrow ,m2:m2};
    },
    drawTopToBottom(r){
      var from = this.getTop(r.from);
      var to = this.getBottom(r.to);

      var m1 = { x: from.x, y: (to.y - from.y)*1.0 / 2.0 + from.y };
      var m2 = { x: to.x, y: (to.y - from.y)*1.0 / 2.0 + from.y };
      var offsety=15;
      var arrow = `M${to.x},${to.y+offsety} L${to.x+5},${to.y+10+offsety} L${to.x},${to.y+6.23+offsety} L${to.x-5},${to.y+10+offsety} L${to.x},${to.y+offsety}`
      return { line: `M ${from.x} ${from.y} L ${m1.x} ${m1.y} L ${m2.x} ${m2.y} L ${to.x} ${to.y}`, arrow: arrow ,m2:m2};
    },
    drawBottomToTop(r){
      var from = this.getBottom(r.from);
      var to = this.getTop(r.to);
      to.y-=this.offsetx2;
      var m1 = { x: from.x, y: (to.y - from.y)*1.0 / 2.0 + from.y };
      var m2 = { x: to.x, y: (to.y - from.y)*1.0 / 2.0 + from.y };
      var arrow = `M${to.x},${to.y} L${to.x-5},${to.y-10} L${to.x},${to.y-6.23} L${to.x+5},${to.y-10} L${to.x},${to.y}`
      return { line: `M ${from.x} ${from.y} L ${m1.x} ${m1.y} L ${m2.x} ${m2.y} L ${to.x} ${to.y}`, arrow: arrow ,m2:m2};
    },
    getSize(item) {
      var w = item.w || this.dw;
      var h = item.h || this.dh;
      return { w: w, h: h };
    },
    getTop(item) {
      return { x: item.left + 0.5 * this.getSize(item).w, y: item.top };
    },
    getLeft(item) {

      return { x: item.left, y: item.top + 0.5 * this.getSize(item).h };
    },
    getBottom(item) {
      return { x: item.left + 0.5 * this.getSize(item).w, y: item.top + this.getSize(item).h };
    },
    getRight(item) {
      return { x: item.left + this.getSize(item).w, y: item.top + 0.5 * this.getSize(item).h };
    }

  },
  computed: {
    itemStyle() {
      var bc = this.item.backgroundColor || '#ffffff';
      return `position: absolute;top:${this.item.top}px;left:${this.item.left}px;background-color: ${bc}`
    },
    lineColor(){
      return '#919191'
    }
  }
}

</script>
<style>
.bn-draggble-item {}

.bn-draggble-item.active {
  z-index: 1000;
  color: red
}
.bn-line-action-item{
  display: none
}
.bn-line-action:hover .bn-line-action-item{
  display: block;
}
</style>

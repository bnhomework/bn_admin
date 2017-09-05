<template>
  <div :style="itemStyle"  draggable="true" @dragstart="dragstart">
    <div class="item-header">{{item.title}}</div>
    <div style="width: 100px;height: 100px;background-color: #5e5e5e"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      locked: false,
      moving: false,
      orignalPosition: {}
    }
  },
  props: ['item', 'eventHub'],
  created() {
    this.eventHub.$on('drop', this.drop)
  },
  beforeDestroy: function() {
    eventHub.$off('drop', this.drop)
  },
  methods: {
    dragstart(event) {
      this.moving = true;
      event.dataTransfer.setData("text/plain",
        (parseInt(this.item.left, 10) - event.clientX) + ',' + (parseInt(this.item.top, 10) - event.clientY));
    },
    drop(e) {
      if(this.moving){
        this.moving=false;
        this.item.top=e.y;
        this.item.left=e.x;
      }
    }
  },
  computed: {
    itemStyle() {
      return `position: absolute;top:${this.item.top}px;left:${this.item.left}px`
    }
  }
}

</script>

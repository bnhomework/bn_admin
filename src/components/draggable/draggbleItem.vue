<template>
  <div class="bn-draggble-item" :class="{active:this.activeItem==this.item.id}" @mousedown="onClick" :style="itemStyle">
    <div class="item-header"  draggable="true" @dragstart="dragstart">{{item.title}}</div>
    <div style="width: 100px;height: 100px;background-color: #5e5e5e" draggable="true" @drop="endLink"></div>
    <div class="item-tool">
      <div class="bn-icon">&#xe6a1;</div>
      <div draggable="true" class="bn-icon" @mousedown="startLink">&#xe75c;</div>
      <div class="bn-icon">&#xe60c;</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      locked: false,
      moving: false,
      // linking:false,
      orignalPosition: {}
    }
  },
  props: ['item', 'eventHub', 'activeItem'],
  created() {
    this.eventHub.$on('drop', this.drop)
  },
  beforeDestroy: function() {
    this.eventHub.$off('drop', this.drop)
  },
  methods: {
    dragstart(event) {
      this.moving = true;
      event.dataTransfer.setData("text/plain",
        (parseInt(this.item.left, 10) - event.clientX) + ',' + (parseInt(this.item.top, 10) - event.clientY));
    },
    startLink(){
      // this.linking=true;
      this.$emit('item-start-link');
    },
    endLink(){
      this.$emit('item-drop',this.item.id);
    },
    drop(e) {
      // e.preventDefault();
      if (this.moving) {
        this.moving = false;
        this.item.top = e.y;
        this.item.left = e.x;
      }
    },
    onClick() {
      this.$emit('item-click');
    }
  },
  computed: {
    itemStyle() {
      var bc = this.item.backgroundColor || '#f5f5f5';
      return `position: absolute;top:${this.item.top}px;left:${this.item.left}px;background-color: ${bc}`
    }
  }
}

</script>
<style>
.item-header:hover {
  cursor: move
}

.bn-draggble-item {}

.bn-draggble-item.active {
  z-index: 1000;
  color: red
}

.item-tool {
  position: absolute;
  right: -25px;
  width: 25px;
  top: 0px;
  height: 100%;
  padding: 3px;
  /*background-color: #7f3e5a*/
}
.item-tool>div{
  cursor: pointer;
}

</style>

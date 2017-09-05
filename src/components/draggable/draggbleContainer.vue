<template>
  <div class="bn-draggable-container" @dragover.prevent="dragover" @drop="drop">
    <slot></slot>
    <draggble-item v-for="item in items" :item="item" :eventHub="eventHub"></draggble-item>
  </div>
</template>
<script>
import draggbleItem from '@/components/draggable/draggbleItem.vue'
import Vue from 'Vue'
export default {
  data() {
    return {
      items: [],
      eventHub:new Vue()
    }
  },
  props:['itemList'],
  created() {
  	this.items=this.itemList;
  },
  methods: {
    drop(event) {
      var offset = event.dataTransfer.getData("text/plain").split(',');
      var X = event.clientX + parseInt(offset[0], 10);
      var Y = event.clientY + parseInt(offset[1], 10);
      var newlocation={ x: X, y: Y };
      this.eventHub.$emit('drop',newlocation)
    },
    dragover(e) {
      return false;
    }
  },
  components: {
    'draggble-item': draggbleItem
  }
}

</script>
<style scoped>
.bn-draggable-container {
  position: relative;
  min-width: 800px;
  min-height: 800px;
}

</style>

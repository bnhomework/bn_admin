<template>
  <div @mouseup="mouseup">
    <div class="bn-tools" >
      <div v-for="t in tools" @mousedown="pickTool(t)" draggable="true">{{t}}</div>
    </div>
    <div class="bn-draggable-container" @dragover.prevent="dragover" @drop="drop">
      <slot></slot>
      <relationship :relationships="relationships"></relationship>
      <draggble-item v-for="item in items" :item="item" :eventHub="eventHub" :activeItem="activeItem" @item-click="()=>{activeItem=item.id}"></draggble-item>
    </div>
  </div>
</template>
<script>
import draggbleItem from '@/components/draggable/draggbleItem.vue'
import relationship from '@/components/draggable/relationship.vue'
import Vue from 'Vue'
import _ from 'underscore'
export default {
  data() {
    return {
      items: [],
      eventHub: new Vue(),
      activeItem: '',
      tools: [],
      addingNewItem:undefined
    }
  },
  props: ['itemList'],
  created() {
    this.items = this.itemList;
    this.tools = ['a', 'b', 'c']
  },
  methods: {
    drop(event) {
      if(this.addingNewItem){
        console.log(this.addingNewItem);
        this.items.push({ id:'2x',title: this.addingNewItem, top: 10, left: 30 })
        this.addingNewItem=undefined;
        return
      }
      var offset = event.dataTransfer.getData("text/plain").split(',');
      var X = event.clientX + parseInt(offset[0], 10);
      var Y = event.clientY + parseInt(offset[1], 10);
      var newlocation = { x: X, y: Y };
      this.eventHub.$emit('drop', newlocation)
    },
    dragover(e) {
      return false;
    },
    mouseup(e){
      if(this.addingNewItem){
        this.addingNewItem=undefined;
      }
    },
    pickTool(t){
      this.addingNewItem=t;
    }
  },
  computed: {
    relationships() {
      var rs = [];
      _.each(this.items, (i) => {
        if (i.next != undefined) {
          _.each(i.next, (n) => {

            var nexts = _.filter(this.items, (f) => { return f.id == n });
            if (nexts.length > 0) {
              rs.push({ from: i, to: nexts[0] })
            }
          })
        }
      });
      return rs;
    }
  },
  components: {
    'draggble-item': draggbleItem,
    'relationship': relationship
  }
}

</script>
<style scoped>
.bn-draggable-container {
  position: relative;
  min-width: 800px;
  min-height: 800px;
  margin-left: 200px;
}
.bn-tools {
  height: 100%;
  width: 200px;
  float: left;
}
.bn-tools>div{
  margin: 5px;
  min-height: 50px;
  background-color: #d6d6d6
}

</style>

<template>
  <div @mouseup="mouseup">
    <div class="bn-tools" >
      <div v-for="t in tools" @mousedown="pickTool(t)" draggable="true">{{t}}</div>
    </div>
    <div class="bn-draggable-container" @dragover.prevent="dragover" @drop="drop">
      <slot></slot>
      <relationship :relationships="relationships"></relationship>
      <draggble-item v-for="item in items" :item="item" :eventHub="eventHub" :activeItem="activeItem"
       @item-click="()=>{activeItem=item.id}"
        @item-start-link="()=>{startlinkItem=item.id}"
        @item-drop="itemDrop"
       ></draggble-item>
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
      addingNewItem:undefined,
      startlinkItem:undefined,
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
        this.items.push({ id:this.addingNewItem,title: this.addingNewItem, top: 10, left: 30 })
        this.addingNewItem=undefined;
        return
      }
      var offset = event.dataTransfer.getData("text/plain").split(',');
      var X = event.clientX + parseInt(offset[0], 10);
      var Y = event.clientY + parseInt(offset[1], 10);
      var newlocation = { x: X, y: Y };
      this.eventHub.$emit('drop', newlocation)
    },
    itemDrop(target){
      if(this.startlinkItem){
        var source=this.items.filter((f) => { return f.id == this.startlinkItem&& target!=f.id });
        if(source.length>0){
            if(!source.nexts){
              source.nexts=[target];
            }else{
              if(_.indexOf(source.nexts,target)<0){
              source.nexts.push[target];                
              }
            }
        }
      }
      this.startlinkItem=undefined;
    },
    dragover(e) {
      return false;
    },
    mouseup(e){
      if(this.addingNewItem){
        this.addingNewItem=undefined;
      }
      if(this.startlinkItem){
        this.startlinkItem=undefined;
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
  background-color: #ffffff
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

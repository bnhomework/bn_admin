<template>
  <div @mouseup="mouseup">
    <div class="bn-tools bn-panel">
      <div class="header">工具箱</div>
      <div style="max-height:700px;overflow-y:auto">
      <div class="tool bn-panel" v-for="t in tools" @mousedown="pickTool(t)" draggable="true" @dragstart="addToolstart">{{t}}</div>
        
      </div>
    </div>
    <div class="bn-draggable-container bn-panel" @dragover.prevent="dragover" @drop="drop">
      <slot></slot>
      <relationship :relationships="relationships"></relationship>
      <draggble-item v-for="item in items" :item="item" :eventHub="eventHub" :activeItem="activeItem" 
      @item-click="()=>{activeItem=item.id}" @item-start-link="()=>{startlinkItem=item.id}" @item-drop="itemDrop"
      @item-delete="itemDelete"></draggble-item>
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
      addingNewItem: undefined,
      startlinkItem: undefined,
    }
  },
  props: ['itemList'],
  created() {
    this.items = this.itemList;
    this.tools = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'M', 'n', 'o','p']
  },
  methods: {
    drop(event) {
      var d=event.dataTransfer.getData("text/plain")||',';
      var offset = d.split(',');
      var X = event.clientX + (parseInt(offset[0], 10));
      var Y = event.clientY + (parseInt(offset[1], 10));
      var newlocation = { x: X, y: Y };
      if (this.addingNewItem) {
        var c=document.getElementsByClassName('bn-draggable-container')[0];
        var viewportOffset =c.getBoundingClientRect();

        this.items.push({ id: this.addingNewItem, title: this.addingNewItem, top: newlocation.y-viewportOffset.top-window.scrollY, left: newlocation.x-viewportOffset.left })
        this.addingNewItem = undefined;
        return
      }
      this.eventHub.$emit('drop', newlocation)
    },
    itemDrop(target) {
      var vm = this;
      if (this.startlinkItem) {
        var sourceList = this.items.filter((f) => { return f.id == this.startlinkItem && target != f.id });
        if (sourceList.length > 0) {
          var source = sourceList[0];
          if (!source.next) {
            vm.$set(source, 'next', [target]);
          } else {
            if (_.indexOf(source.next, target) < 0) {
              source.next.push(target);
            }
          }
        }
        this.startlinkItem = undefined;
      }
    },
    itemDelete(i){
      var idx=_.findIndex(this.items,(x)=>{return x.id==i});
      if(idx>=0){
        this.items.splice(idx,1);
      }
    },
    dragover(e) {
      return false;
    },
    mouseup(e) {
      if (this.addingNewItem) {
        this.addingNewItem = undefined;
      }
      if (this.startlinkItem) {
        this.startlinkItem = undefined;
      }
    },
    addToolstart(event) {
      console.log(event);
      event.dataTransfer.setData("text/plain",
        // (0 - event.clientX) + ',' + (0 - event.clientY));
        (event.pageX - event.clientX) + ',' + (event.pageY - event.clientY));
    },
    pickTool(t) {
      this.addingNewItem = t;
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
  margin-left: 220px;
  background-color: #ffffff
}

.bn-tools {
  height: 100%;
  width: 200px;
  float: left;
  max-height: 800px;

}
.bn-tools .header{
  background-color: #d6d6d6;
  line-height: 40px;
  text-align: center;
}
.bn-tools .tool {
  min-height: 50px;
  margin: 5px;
}
.bn-panel {
    border-radius: 2px;
    border: 0;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,0.12),0 1px 6px 0 rgba(0,0,0,0.12);
}

</style>

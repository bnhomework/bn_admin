<template>
  <div @mouseup="mouseup">
    <div class="bn-tools bn-panel">
      <div class="header">工具箱</div>
      <div class="bn-tools-warp">
        <div class="tool bn-panel" v-for="t in tools" @mousedown="pickTool(t)" draggable="true" @dragstart="addToolstart">{{t}}</div>
      </div>
    </div>
    <div  class="bn-right-panel  bn-panel" @mousedown="mousedownonwarp" @mousemove="mousemoveonwarp" @mouseup="mouseuponwarp">
      <div id="bn-outter-view" style="position:relative;width:100%,height:100%;overflow:hidden" @dragover.prevent="dragover" @drop="drop">
        <div class="bn-draggable-container" @dragover.prevent="dragover" @drop="drop" :style="{top:top +'px',left:left+'px'}">
          <slot></slot>
          <relationship :relationships="relationships"></relationship>
          <draggble-item v-for="item in items" :item="item" :eventHub="eventHub" :activeItem="activeItem" @item-click="()=>{activeItem=item.id}" @item-start-link="()=>{startlinkItem=item.id}" @item-drop="itemDrop" @item-delete="itemDelete"></draggble-item>
        </div>
      </div>
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
      top: 100,
      left: 200,
      moving:undefined,
      isdragging:false
    }
  },
  props: ['itemList'],
  created() {
    this.items = this.itemList;
    this.tools = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'M', 'n', 'o', 'p']
  },
  methods: {
    drop(event) {
      var d = event.dataTransfer.getData("text/plain") || ',';
      var offset = d.split(',');
      var X = event.clientX + (parseInt(offset[0], 10));
      var Y = event.clientY + (parseInt(offset[1], 10));
      var newlocation = { x: X, y: Y };
      if (this.addingNewItem) {
        var c = document.getElementsByClassName('bn-draggable-container')[0];
        var viewportOffset = c.getBoundingClientRect();

        this.items.push({ id: this.addingNewItem, title: this.addingNewItem, top: newlocation.y - viewportOffset.top - window.scrollY, left: newlocation.x - viewportOffset.left })
        this.addingNewItem = undefined;
        return
      }
      var mod = 10;
      newlocation.x = newlocation.x - newlocation.x % mod;
      newlocation.y = newlocation.y - newlocation.y % mod;
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
    itemDelete(i) {
      var idx = _.findIndex(this.items, (x) => { return x.id == i });
      if (idx >= 0) {
        this.items.splice(idx, 1);
      }
    },
    dragover(e) {
      return false;
    },
    mousedownonwarp(e){
      if(this.startlinkItem||this.isdragging){
        return
      }
      if(e.target.id=='bn-outter-view'||e.target.id=='bn-inner-view'){

      this.moving=e;
      }
    },
    mousemoveonwarp(e){
      if(this.moving){
        console.log(this.moving)
        console.log(e)
        var x=e.clientX-this.moving.clientX;
        var y=e.clientY-this.moving.clientY;
        this.left+=x;
        this.top+=y;
        this.moving=e;
      }
    },
    mouseuponwarp(e){
      if(this.moving){
        this.moving=undefined;

      }
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
  background-color: #ffffff
}

.bn-right-panel {

  margin-left: 220px;
}

.bn-tools {
  height: 100%;
  width: 200px;
  float: left;
  max-height: 800px;
}

.bn-tools .header {
  background-color: #d6d6d6;
  line-height: 40px;
  text-align: center;
}

.bn-tools .tool {
  min-height: 50px;
  margin: 5px;
}

.bn-tools-warp {
  max-height: 700px;
  overflow-y: hidden;
}

.bn-tools-warp:hover {
  overflow-y: auto
}

.bn-panel {
  border-radius: 2px;
  border: 0;
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.12), 0 1px 6px 0 rgba(0, 0, 0, 0.12);
}

</style>

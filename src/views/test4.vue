<template>
<!--   <draggble-container  :item-list="items">
  </draggble-container> -->
  <bn-chart style="width=100%" :points="points"></bn-chart>
</template>
<script>
import draggbleContainer from '@/components/draggable/draggbleContainer.vue'
import bnChart from '@/components/d3/bnChart.vue'
export default {
  data() {
    return {
      items: [],
      points:[],
    };
  },
  created() {
    this.init();
  },

  methods: {
    init() {
      this.items.push({ id:'1',title: '1', w:100,h:50,top: 10, left: 20 ,next:['2','3']})
      this.items.push({ id:'2',title: '2', w:100,h:50, top: 10, left: 30 })
      this.items.push({ id:'3',title: '3', w:100,h:50, top: 10, left: 40 })

      this.points.push({p:{x:310,y:320,z:330},label:'x:10,y:20,z:30'})
      this.points.push({p:{x:140,y:150,z:160},label:'x:60,y:50,z:60'})
      this.points.push({p:{x:200,y:20,z:200},label:'x:20,y:20,z:20'})

      for(var i=0;i<50;i=i+6){
        for(var j=0;j<50;j=j+7){
          for(var k=0;k<10;k=k+4){
             this.points.push({p:{x:i*3,y:j*5,z:k*20},label:'x:10,y:20,z:30'})
          }
        }
      }
    }

  },
  computed: {},
  components: {
    'draggble-container': draggbleContainer,
    'bn-chart': bnChart
  },
  mounted() {

  },
  destory() {}
}

</script>
<style scoped>
svg {
  /*background-color: #555555*/
}

</style>

<template>
  <draggble-container  :item-list="items">
  </draggble-container>
</template>
<script>
import draggbleContainer from '@/components/draggable/draggbleContainer.vue'
export default {
  data() {
    return {
      items: []
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
    }

  },
  computed: {},
  components: {
    'draggble-container': draggbleContainer
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

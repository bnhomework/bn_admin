<template>
  <draggble-container title="test" :item-list="items">
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
      this.items.push({ title: '1', top: 10, left: 20 })
      this.items.push({ title: '2', top: 10, left: 30 })
      this.items.push({ title: '3', top: 10, left: 40 })
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

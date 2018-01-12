<template>
  <form id="topbar-search" v-on:submit.prevent="onSubmit" class="hidden-xs" style="display: inline-block;margin-right: 20px">
     <el-input
    :placeholder="$t('search')"
    prefix-icon="el-icon-search" clearable
    v-model="query">
  </el-input>
  </form>
</template>
<script>
export default {
  name: 'quick-search',
  data() {
    return {
      query: '',
    }
  },
  methods: {
    onSubmit() {
      var vm=this;
      if(!this.query&&this.query!=''){
        return;
      }
      this.$api.project.GetOrderIdByTrackingNumber(this.query).then((res) => {
          if (res.data.code != '1') {
            console.log(vm.$t('Tracking Number not found.')+' ['+vm.query+']')
            vm.$message(vm.$t('Tracking Number not found.')+' ['+vm.query+']');
          } else {
            vm.$router.push({name:'view_project',params:{oid:res.data.data}})
          }
        });
      }
    }

  }

</script>

<template>
  <form id="topbar-search" v-on:submit.prevent="onSubmit" class="hidden-xs" style="display: inline-block;margin-right: 20px">
     <el-input
    placeholder="请输入内容"
    prefix-icon="el-icon-search"
    v-model="content">
  </el-input>
  </form>
</template>
<script>
export default {
  name: 'quick-search',
  data() {
    return {
      content: '',
    }
  },
  methods: {
    onSubmit() {
      var vm=this;
      if(!this.content&&this.content!=''){
        return;
      }
      this.$api.project.GetOrderIdByTrackingNumber(this.content).then((res) => {
          if (res.data == '') {
            vm.$message(vm.$t('Tracking Number not found.')+' ['+vm.content+']');
          } else {
            vm.$router.push({name:'view_project',params:{oid:res.data}})
          }
        });
      }
    }

  }

</script>

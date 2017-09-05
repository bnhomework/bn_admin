<template>
  <form id="topbar-search" v-on:submit.prevent="onSubmit" class="hidden-xs" :class="{open:open}">
    <div class="input-group">
      <input type="text" v-model="content" placeholder="Search..." class="form-control">
      <span class="input-group-btn">
                  <a href="javascript:;" class="btn submit" @click="open=!open">
                  <i class="fa fa-search"></i>
                  </a>
                </span>
    </div>
  </form>
</template>
<script>
export default {
  name: 'quick-search',
  data() {
    return {
      content: '',
      open: false,
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

<template>
  <el-aside id="bn-side-menu">
    <div style="border-right: solid 1px #e6e6e6">
    </div>
    <el-menu default-active="Projects" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#33485c" text-color="#ffffff" active-text-color="#ffffff" :router="true">
      <template v-for="(m,i) in menu">
        <template v-if="m.items">
          <el-submenu :index="m.title">
            <template slot="title">
              <span :v-if="m.icon" class="bn-icon" v-html="m.icon"></span>
              <span>{{m.title}}</span>
            </template>
            <template v-for="s in m.items">
              <el-menu-item :index="s.url">{{s.title}}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="m.url">
            <span :v-if="m.icon" class="bn-icon" v-html="m.icon"></span>
            <span slot="title">{{m.title}}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  name: 'sidemenu',
  data() {
    return { selectedItem: undefined }
  },
  props: ['menu'],
  methods: {
    handleClose() {

    },
    handleOpen() {

    }
  }
}

</script>
<style>
#bn-side-menu {
  width: 250px !important;
  position: fixed;
  top:60px;
  bottom: 0px;
}

.el-menu-vertical-demo {
  height: 100%
}
#bn-side-menu .el-submenu__title i{
  color: inherit;
}
#bn-side-menu .el-menu-item.is-active{
  background-color: #e74c3c !important
}
#bn-side-menu .bn-icon{
  color: inherit;
  font-size: 20px;
  padding-right: 10px;
}
</style>

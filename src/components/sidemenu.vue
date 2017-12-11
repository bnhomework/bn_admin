<template>
  <el-aside id="bn-side-menu">
    <div style="border-right: solid 1px #e6e6e6">
      
    </div>
    <el-menu default-active="Projects" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
      <template v-for="(m,i) in menu">
        <template v-if="m.items">
          <el-submenu :index="m.title">
            <template slot="title">
              <!-- <i class="el-icon-location"></i> -->
              <i :v-if="m.icon" class="fa fa-laptop fa-fw" :class="m.icon"><div class="icon-bg bg-pink"></div></i>
              <span>{{m.title}}</span>
            </template>
            <template v-for="s in m.items">
              <el-menu-item :index="s.url">{{s.title}}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="m.url">
            <!-- <i class="el-icon-menu"></i> -->
            <i v-if="m.icon" class="fa fa-tachometer fa-fw" :class="m.icon"><div class="icon-bg bg-orange"></div></i>
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
#bn-side-menu{
  width: 250px !important;
  background-color: #545c64;
}
.el-menu-vertical-demo {
  min-height: 600px
}

</style>

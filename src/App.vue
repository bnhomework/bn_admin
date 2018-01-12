<template>
  <div id="app">
    <el-header id="header">
      <div class="header-sm">
        <img :src="require('@/assets/img/company.gif')" style="height:60px">
      </div>
      <div class="header-normal">
        <div style="float:left;height:44px">
          <img :src="require('@/assets/img/company.gif')" style="height:60px">
        </div>
        <span class="bn-icon" style="cursor: pointer;font-size: 25px;margin-left: 30px" :style="{color:sideBarCollapse?'#888':'#555'}" @click="toggleNavigation">&#xe61d;</span>
        <div style="text-align: right;position: relative;right:10px;float:right">
          <quickSearch></quickSearch>
          <languageSelect></languageSelect>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span >{{$store.state.LoginName}}</span>
        </div>
      </div>
    </el-header>
    <el-container style=" border: 1px solid #eee;margin-bottom: 20px" id="bn-body" :class="{full:sideBarCollapse}">
      <sidemenu :menu="menu1"></sidemenu>
      <el-container id="content-warp">
        <!-- <el-header style="text-align: right; font-size:12px;" height="44px">
          <el-breadcrumb separator-class="el-icon-arrow-right"style="padding: 10px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header> -->
        <el-main style="">
          <transition :name="transitionName">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
    <el-footer style="position: fixed;bottom: 0px;width:100%;height:auto; z-index: 1500;">
      <div class="copyright">2017 © Genewiz - GA Lab UI</div>
    </el-footer>
  </div>
</template>
<script>
import sidemenu from '@/components/sidemenu.vue'
import languageSelect from '@/components/languageSelect.vue'
import quickSearch from '@/components/quickSearch.vue'
import 'element-ui/lib/theme-chalk/index.css'
export default {
  name: 'app',
  data() {
    return {
      sideBarCollapse: false,
      transitionName: 'slide-left',
      menu1: []
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$api.common.BuildMenu()
        .then((res) => {
          this.menu1 = res.data;
        })
    },
    toggleNavigation: function toggleNavigation() {
      this.sideBarCollapse = !this.sideBarCollapse
    },
  },
  computed: {
    name() {
      return this.$route.meta.name || this.$route.name
    }
  },
  components: { sidemenu: sidemenu, languageSelect: languageSelect, quickSearch: quickSearch }
}

</script>
<style>

@import './assets/css/font-awesome/css/font-awesome.min.css';
@import './assets/css/style.css';
@font-face {
  font-family: 'bn-icon';  /* project id 349990 */
  src: url('//at.alicdn.com/t/font_349990_sofd35mjw2ricnmi.eot');
  src: url('//at.alicdn.com/t/font_349990_sofd35mjw2ricnmi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_349990_sofd35mjw2ricnmi.woff') format('woff'),
  url('//at.alicdn.com/t/font_349990_sofd35mjw2ricnmi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_349990_sofd35mjw2ricnmi.svg#bn-icon') format('svg');
}

</style>

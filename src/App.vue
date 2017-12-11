<template>
  <div id="app">
    <el-header style="font-size: 12px;line-height: 44px;height:44px;background-color:#fff">
      <div style="float:left;height:44px">
        <img :src="require('@/assets/img/company.gif')" style="height:44px">
      </div>
      <div style="text-align: right;position: relative;right:10px;float:right">
        <quickSearch></quickSearch>
      <languageSelect></languageSelect>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{$store.state.LoginName}}</span>
        
      </div>
    </el-header>
    <el-container style=" border: 1px solid #eee;margin-bottom: 20px">
        <sidemenu :menu="menu1"></sidemenu>
      <el-container>
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
      sideBarCollapse: true,
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
body {
  margin: 0px;
  background-color: #edf2f5;
  font-size: 12px;
}


.copyright {
  margin-right: 20px;
  float: right;
}

.bn-icon {
  font-family: 'bn-icon';
  font-size: 15px;
  color: #888;
}

@font-face {
  font-family: 'bn-icon';
  /* project id 414949 */
  src: url('//at.alicdn.com/t/font_414949_r395dq5r0zf1dcxr.eot');
  src: url('//at.alicdn.com/t/font_414949_r395dq5r0zf1dcxr.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_414949_r395dq5r0zf1dcxr.woff') format('woff'),
  url('//at.alicdn.com/t/font_414949_r395dq5r0zf1dcxr.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_414949_r395dq5r0zf1dcxr.svg#iconfont') format('svg');
}

</style>

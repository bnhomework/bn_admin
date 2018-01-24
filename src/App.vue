<template>
  <div id="app">
      <el-header id="header">
        <div class="header-sm">
          <img :src="require('@/assets/img/gwz.png')" style="height:60px">
        </div>
        <div class="header-normal">
          <div style="float:left;height:44px">
            <!-- <img :src="require('@/assets/img/gwz.png')" style="height:60px"> -->
            <span style="font-size: 25px">{{sideBarCollapse?'N':'NGS Lab'}}</span>
          </div>
          <svg t="1492500959545" @click="toggleNavigation" class="wscn-icon hamburger" :class="{'is-active':!sideBarCollapse}" style="margin-left: 15px;margin-top:20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
            <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z" p-id="1692"></path>
            <path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z" p-id="1693"></path>
            <path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z" p-id="1694"></path>
          </svg>
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

            <tags-view></tags-view>
            <!-- <transition :name="transitionName"> -->
              <router-view></router-view>
            <!-- </transition> -->
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
import TagsView from '@/components/TagsView.vue'
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
  components: { sidemenu: sidemenu, languageSelect: languageSelect, quickSearch: quickSearch, TagsView: TagsView }
}

</script>
<style>
@import './assets/css/font-awesome/css/font-awesome.min.css';
@import './assets/css/style.css';
@font-face {
  font-family: 'bn-icon';
  /* project id 349990 */
  src: url('//at.alicdn.com/t/font_349990_sofd35mjw2ricnmi.eot');
  src: url('//at.alicdn.com/t/font_349990_sofd35mjw2ricnmi.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_349990_sofd35mjw2ricnmi.woff') format('woff'),
  url('//at.alicdn.com/t/font_349990_sofd35mjw2ricnmi.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_349990_sofd35mjw2ricnmi.svg#bn-icon') format('svg');
}

.hamburger {
  display: inline-block;
  cursor: pointer;
  width: 20px;
  height: 20px;
  transform: rotate(90deg);
  transition: .38s;
  transform-origin: 50% 50%;
}

.hamburger.is-active {
  transform: rotate(0deg);
}
#bn-body .el-main{
  padding: 0px;
}
</style>

<template>
  <div id="app" :class="{'sidebar-collapsed':sideBarCollapse}">
    <div>
      <div id="header-topbar-option-demo" class="page-header-topbar">
        <nav id="topbar" role="navigation" style="margin-bottom: 0; z-index: 2;" class="navbar navbar-default navbar-static-top">
          <div class="navbar-header">
            <button type="button" data-toggle="collapse" data-target=".sidebar-collapse" class="navbar-toggle">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <router-link id="logo" class="navbar-brand" to="/">
              <span class="fa fa-rocket"></span>
              <span class="logo-text">NGS Lab</span>
              <span style="display: none" class="logo-text-icon">N</span>
            </router-link>
          </div>
          <div class="topbar-main">
            <a id="menu-toggle" href="javascript:void(0)" class="hidden-xs" @click="toggleNavigation"> <i class="fa fa-bars"></i>
            </a>
            <quick-search></quick-search>
            <ul class="nav navbar navbar-top-links navbar-right mbn">
              <language-select></language-select>
            </ul>
          </div>
        </nav>
        <!--BEGIN MODAL CONFIG PORTLET-->
        <div id="modal-config" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" data-dismiss="modal" aria-hidden="true" class="close">×</button>
                <h4 class="modal-title">Modal title</h4>
              </div>
              <div class="modal-body">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend et nisl eget porta. Curabitur elementum sem molestie nisl varius, eget tempus odio molestie. Nunc vehicula sem arcu, eu pulvinar neque cursus ac. Aliquam ultricies lobortis magna et aliquam. Vestibulum egestas eu urna sed ultricies. Nullam pulvinar dolor vitae quam dictum condimentum. Integer a sodales elit, eu pulvinar leo. Nunc nec aliquam nisi, a mollis neque. Ut vel felis quis tellus hendrerit placerat. Vivamus vel nisl non magna feugiat dignissim sed ut nibh. Nulla elementum, est a pretium hendrerit, arcu risus luctus augue, mattis aliquet orci ligula eget massa. Sed ut ultricies felis.
                </p>
              </div>
              <div class="modal-footer">
                <button type="button" data-dismiss="modal" class="btn btn-default">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="wrapper">
        <sidemenu :menu="menu1"></sidemenu>
        <div id="page-wrapper">
          <div id="title-breadcrumb-option-demo" class="page-title-breadcrumb">
            <div class="page-header pull-left">
              <div class="page-title">{{name}} {{$t('hello')}}</div>
            </div>
            <div class="clearfix"></div>
          </div>
          <div class="page-content">
            <!--  <button @click="test"> switch language</button>
          <button @click="test2"> add resource</button> -->
            <transition :name="transitionName">
              <router-view></router-view>
            </transition>
          </div>
        </div>
        <div id="footer">
          <div class="copyright">2017 © Genewiz - NGS Lab UI</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import sidemenu from '@/components/sidemenu.vue'
import languageSelect from '@/components/languageSelect.vue'
import quickSearch from '@/components/quickSearch.vue'
export default {
  name: 'app',
  data() {
    return {
      sideBarCollapse: true,
      transitionName: 'slide-left',
      menu1: []
    }
  },
  created(){
    this.init();
  },
  methods: {
    init(){
      this.$api.common.BuildMenu()
            .then((res)=>{
                this.menu1=res.data;
            })
    },
    toggleNavigation: function toggleNavigation() {
      this.sideBarCollapse = !this.sideBarCollapse
    },
  },
  computed: {
    name() {
      return this.$route.name
    }
  },
  components: { sidemenu: sidemenu, languageSelect: languageSelect, quickSearch: quickSearch }
}

</script>
<style>
@import './assets/vendors/font-awesome/css/font-awesome.min.css';
@import './assets/vendors/bootstrap/css/bootstrap.min.css';
@import '../node_modules/element-ui/lib/theme-default/index.css';
@import './assets/css/themes/style1/orange-blue.css';
@import './assets/css/style-responsive.css';
@import './assets/css/style.css';

</style>

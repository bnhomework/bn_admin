import _ from 'underscore'
import Vue from 'vue'
import Vuei18n from 'vue-i18n'
// import config from '../config'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import jaLocale from 'element-ui/lib/locale/lang/ja'
import ElementLocale from 'element-ui/lib/locale'

import bn_zh from '@/locale/lang/zh'
import bn_en from '@/locale/lang/en'
import bn_ja from '@/locale/lang/ja'

Vue.use(Vuei18n)

if (!window.loadedComponents) {
  window.loadedComponents = []
}
const autoLoader = {
  created () {
    //will load languages from json file
    //this.loadLanguage()
    var name='bn';
    if(!_.contains(window.loadedComponents, name)){
      if(this.$i18n&&this.$i18n.mergeLocaleMessage){
        
      window.loadedComponents.push(name)
      this.$i18n.mergeLocaleMessage('en', bn_en);
      this.$i18n.mergeLocaleMessage('zh', bn_zh);
      this.$i18n.mergeLocaleMessage('ja', bn_ja);
      }
    }
  },
  methods: {
    // loadLanguage: function () {
    //   var name = this.$options.name
    //   var config =this.$appSetting
    //   if(!this.needLoadLanguage)
    //     return
    //   if (name && !_.contains(window.loadedComponents, name)) {
    //     window.loadedComponents.push(name)
    //     this.$api.common.GetLangByComponentName(name)
    //     .then((res) => {
    //       if (res.data) {
    //         if (res.data.en) {
    //           this.$i18n.mergeLocaleMessage('en', res.data.en)
    //         };
    //         if (res.data.zh) {
    //           this.$i18n.mergeLocaleMessage('zh', res.data.zh)
    //         };
    //         if (res.data.ja) {
    //           this.$i18n.mergeLocaleMessage('ja', res.data.ja)
    //         };
    //       }
    //     }
    //     )
    //   }
    // }
  }
}
Vue.mixin(autoLoader)

const messages = {
  ja: jaLocale,
  en: enLocale,
  zh: zhLocale
}

const langLoader = new Vuei18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages,
  silentTranslationWarn: true
})
ElementLocale.i18n(key=>langLoader.t(key))
export default langLoader

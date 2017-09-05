import _ from 'underscore'
import Vue from 'vue'
import Vuei18n from 'vue-i18n'
// import config from '../config'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import jaLocale from 'element-ui/lib/locale/lang/ja'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(Vuei18n)

if (!window.loadedComponents) {
  window.loadedComponents = []
}
const autoLoader = {
  created () {
    this.loadLanguage()
  },
  methods: {
    loadLanguage: function () {
      var name = this.$options.name
      var config =this.$appSetting
      if(!this.needLoadLanguage)
        return
      if (name && !_.contains(window.loadedComponents, name)) {
        window.loadedComponents.push(name)
        this.$api.common.GetLangByComponentName(name)
        .then((res) => {
          if (res.data) {
            if (res.data.en) {
              this.$i18n.mergeLocaleMessage('en', res.data.en)
            };
            if (res.data.zh) {
              this.$i18n.mergeLocaleMessage('zh', res.data.zh)
            };
            if (res.data.ja) {
              this.$i18n.mergeLocaleMessage('ja', res.data.ja)
            };
          }
        }
        )
      }
    }
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

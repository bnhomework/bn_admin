<template>
  <el-dropdown @command="handleCommand">
    <i class="el-icon-globe" style="margin-right: 15px;cursor: pointer">{{selectedLang.displayName}}</i>
    <el-dropdown-menu slot="dropdown">
      <template v-for="(l,i) in languages">
        <el-dropdown-item :command="l.name">{{l.displayName}}</el-dropdown-item>
      </template>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
import _ from 'underscore'
export default {
  name: 'languageSelect',
  data() {
    return {
      languages: [{ name: 'en', displayName: 'English' },
        { name: 'zh', displayName: '中文'},
        { name: 'ja', displayName: '日本語' }
      ],
      localeName: 'zh'
    }
  },
  created() {
    this.localeName = this.$i18n.locale
  },
  methods: {
    handleCommand(c){
      this.localeName = c
      this.$i18n.locale = c
    },
  },
  computed: {
    selectedLang: function() {
      var sl = _.filter(this.languages, (x) => { return x.name === this.localeName })
      if (sl && sl.length > 0) {
        return sl[0]
      }
      return this.languages[0]
    }
  }
}

</script>

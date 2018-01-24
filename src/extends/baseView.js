import _ from 'underscore'
import moment from 'moment'
import * as logger from '@/extends/logger';
import customerTableHeader from '@/extends/el/customerTableHeader';

let baseview = {
  data() {
    return {
      logger: logger
    }
  },
  // extends: customerTableHeader,
  methods: {
    needLoadLanguage: function() {
      return true;
    },
    isAuthorize: function(p) {
      return _.contains(this.$store.state.permissions, p);
    },
    syncvalue(obj, feild) {
      return function(v, ctx) {
        ctx.$set(obj, feild, v)
      }
    },
    $bn_loadEnums(enumTypes, cb) {
      var self = this;
      var needToLoadTypes = [];
      _.each(enumTypes, (x) => {
        if (self.$store.state.Enums[x] == null) {
          self.$store.state.Enums[x] = [];
          needToLoadTypes.push(x);
        }
      });
      if (needToLoadTypes.length > 0) {
        self.$api.common.GetEnumItems(needToLoadTypes)
          .then((res) => {
            for (var i = 0; i < needToLoadTypes.length; i++) {
              var x = needToLoadTypes[i]
              var tmp = null;
              if (res.data.code == 1 && res.data.data[x] != null) {
                tmp = res.data.data[x];
              }
              self.$store.state.Enums[x] = tmp;
            }
            if (cb) {
              cb();
            }
          });
      } else {
        if (cb) {
          cb();
        }
      }
    },
    $bn_enum(enumType, enumValue) {
      var self = this;
      if (self.$store.state.Enums[enumType] != null) {
        var items = _.filter(self.$store.state.Enums[enumType], (x) => { return x.ItemValue == enumValue; });
        if (items.length > 0) {
          return self.$t(items[0].ItemName);
        }
      }
      return enumValue;
    }
  },
  filters: {
    dtfmt: function(v, fmt) {
      fmt = fmt || 'YYYY-MM-DD hh:mm:ss';
      if (v) {
        var m = moment.utc(v)
        return m.local().format(fmt);
      }
      return v;
    },
    toStr: function(v) {

    }
  }
}
console.log(baseview)
export default baseview;

import _ from 'underscore'
import * as logger from '@/extends/logger';
export default {
 data(){
 	return {
 		logger:logger
 	}
 },
  methods: {    
    needLoadLanguage: function () {
        return true;
    },
    isAuthorize:function(p){
    	return _.contains(this.$store.state.permissions,p);
    }
  }
};
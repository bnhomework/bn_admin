import Vue from 'vue'
import Vuex from 'vuex'
import {api} from '@/api'
import project from './modules/project'
import tagsView from './modules/tagsView'
import * as logger from '@/extends/logger'


Vue.use(Vuex)
// const apiModules = api.apiModules

const modules={project,tagsView}

var d = new Date();
var timezoneOffset=0-d.getTimezoneOffset()/60;
const store=new Vuex.Store({
    modules: modules,
    state: {
        isAuth: false,
        TokenId:'',
        LoginName: '',
        TimezoneOffset:timezoneOffset,
        Permissions: [],
        Enums:{},
    },
    mutations: {
        authSuccess(state, preload) {
            var d = new Date();
            logger.info( JSON.stringify(preload));
            Vue.set(state, 'isAuth', true);
            Vue.set(state, 'UserId', preload["UserId"]);
            if( preload["TokenId"]){
                Vue.set(state, 'TokenId', preload["TokenId"]);                
            }
            Vue.set(state, 'LoginName', preload["LoginName"]);
            Vue.set(state, 'Permissions', preload["Permissions"]);
        },
        authFailed(state) {
            Vue.set(state, 'isAuth', false);
            Vue.set(state, 'UserId', undefined);
            Vue.set(state, 'LoginName', '');
            Vue.set(state, 'Permissions', []);
        }
    },
    actions: {
        onAuth(context, next) {
            if (context.state.isAuth) {
                next()
            } else {
                api.common.GetCurrentIdentity()
                    .then((res) => {
                        context.commit('authSuccess', res.data);
                        logger.info('------authSuccess----')
                        next()
                    },()=>{
                    	logger.warn('-------authFailed-------');
                    	context.commit('authFailed');
                    	next({name: '401'})
                    });
            }
        }
    }
})

export default store
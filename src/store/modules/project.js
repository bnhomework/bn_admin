import {api} from '@/api'
import Vue from 'vue'
export default {
    namespaced: true,
    state: {
        projectStepProgress: {}
    },
    getters: {
        projectStepProgress: store => store.projectStepProgress
    },
    mutations: {
        progressChange(state, preload) {
            Vue.set(state, 'projectStepProgress', preload);
        }
    },
    actions: {
        progressChange(context, orderId) {
            api.project.GetProjectProgressStatus(orderId).then(
                (res) => {
                    context.commit('progressChange', res.data)
                });
        }
    }
}

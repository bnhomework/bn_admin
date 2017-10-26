import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

const Hello = (resolve) => { require(['@/views/Hello.vue'], resolve) }
const Hello2 = (resolve) => { require(['@/views/Hello2.vue'], resolve) }
const SearchProject = (resolve) => { require(['@/views/projectSearch/index.vue'], resolve) }
const ViewProject = (resolve) => { require(['@/views/project/index.vue'], resolve) }
const UnAuthen = (resolve) => { require(['@/views/401.vue'], resolve) }
const NotFound = (resolve) => { require(['@/views/NotFound.vue'], resolve) }
const test = (resolve) => { require(['@/views/test.vue'], resolve) }
const test4 = (resolve) => { require(['@/views/test4.vue'], resolve) }
const test2 = (resolve) => { require(['@/views/test2.vue'], resolve) }
const test3 = (resolve) => { require(['@/views/test3.vue'], resolve) }

var routes = [{path: '/', name: 'Home', component: Home},
{path: '/h1', name: 'Hello', component: Hello},
    {path: '/h2', name: 'Hello2', component: Hello2},
    {path: '/project_management', name: 'project_management', component: SearchProject},
    {path: '/project/:oid', name: 'view_project', component: ViewProject},
    {path: '/401', name: '401', component: UnAuthen,meta: { allowAnonymous: true}},
    {path: '/test', name: 'project_and_sample', component: test,meta: { name:'PROJECT & SAMPLE MANAGEMENT',allowAnonymous: true}},
    {path: '/test4', name: 'bnChart', component: test4,meta: { allowAnonymous: true}},
    {path: '/test2', name: 'test2', component: test2,meta: { allowAnonymous: true}},
    {path: '/test3', name: 'Drapable', component: test3,meta: { allowAnonymous: true}},
    {path: '*', name: '404', component: NotFound,meta: { allowAnonymous: true}}]

const router=new Router({
  routes: routes,
  mode: 'history'
})
router.beforeEach((to, from, next) => {
    if (to.meta.allowAnonymous) {
        next()
    } else {
        store.dispatch('onAuth', next)
    }
    window.scrollTo(0, 0)
})
export default router

import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter)


export default new VueRouter({
    routes: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '../components/HelloWorld.vue'),
        },
        {
            path: '/2',
            component: () => import(/* webpackChunkName: "home" */ '../components/HelloWorld2.vue'),
        },
    ]
});

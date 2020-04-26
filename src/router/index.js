import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter);


export default new VueRouter({
    routes: [
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "home" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '导航+标题' },
            children:[
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },{
                    path:'/table',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Table.vue'),
                    meta: { title: '表格' }
                },{
                    path:'/user',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/User.vue'),
                    meta: { title: '用户管理' }
                }
            ]
        }
    ]
});

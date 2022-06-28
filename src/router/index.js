import Vue from 'vue'
import VueRouter from 'vue-router'
import nestedRouter from './modules/nested'

// 在当前页面点击该页面的路由时会有报错(官方bug)，在vuerouter注册之前写入以下代码
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch((err) => {})
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue')
  },
  ...nestedRouter
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

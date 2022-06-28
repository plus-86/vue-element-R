const nestedRouter = [
  {
    path: '/nested',
    redirect: '/nested/menu1/menu1-1'
  },
  {
    path: '/nested/menu1',
    redirect: '/nested/menu1/menu1-1'
  },
  {
    path: '/nested/menu1/menu1-1',
    name: 'menu1-1',
    component: () => import('@/views/NestedMenu/Menu1/Menu1-1/Menu1-1.vue')
  },
  {
    path: '/nested/menu1/menu1-2',
    redirect: '/nested/menu1/menu1-2/menu1-2-1'
  },
  {
    path: '/nested/menu1/menu1-2/menu1-2-1',
    name: 'menu1-2-1',
    component: () =>
      import('@/views/NestedMenu/Menu1/Menu1-2/Menu1-2-1/Menu1-2-1.vue')
  },
  {
    path: '/nested/menu1/menu1-2/menu1-2-2',
    name: 'menu1-2-2',
    component: () =>
      import('@/views/NestedMenu/Menu1/Menu1-2/Menu1-2-2/Menu1-2-2.vue')
  },
  {
    path: '/nested/menu2',
    name: 'menu2',
    component: () => import('@/views/NestedMenu/Menu2/Menu2.vue')
  }
]

export default nestedRouter

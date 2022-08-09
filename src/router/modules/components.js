const componentsRouter = [
  {
    path: '/components/richtext',
    name: 'richtext',
    component: () => import('@/views/Components/RichText.vue')
  },
  {
    path: '/components/formandtable',
    name: 'formandtable',
    component: () => import('@/views/Components/FormAndTable.vue')
  }
]

export default componentsRouter

import router from '../../router/index'
export default {
  namespaced: true,
  state: {
    tagsArray: [
      {
        tagName: '首页',
        path: '/dashboard'
      }
    ]
  },
  mutations: {
    addTag(state, payload) {
      // 当路由为空时，不进行任何操作
      if (!payload.path) return
      // 为被点击的侧边菜单添加标签，如果标签已存在，则什么也不做
      if (state.tagsArray.some((v) => v.path === payload.path)) return
      state.tagsArray.push(payload)
      router.push(payload.path)
      if (payload.path === '/dashboard') return sessionStorage.clear()
      sessionStorage.setItem(
        'router',
        JSON.stringify({ tagName: payload.tagName, path: payload.path })
      )
    },
    removeTag(state, payload) {
      // 用页面传进来的路径，寻找该标签在数组中的位置，移除标签并跳转至最后一个标签
      let index = state.tagsArray.findIndex((v) => v.path === payload.path)
      state.tagsArray.splice(index, 1)
      let lastIndex = state.tagsArray.length - 1
      router.push(state.tagsArray[lastIndex].path)
      // 除了首页以外全部关掉了，就清除缓存
      if (state.tagsArray.length === 1) sessionStorage.clear()
    },
    switchTag(state, payload) {
      router.push(payload.path)
      if (payload.path === '/dashboard') return sessionStorage.clear()
      sessionStorage.setItem(
        'router',
        JSON.stringify({ tagName: payload.tagName, path: payload.path })
      )
    }
  }
}

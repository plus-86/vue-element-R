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
      if (state.tagsArray.some((v) => v.path === payload.path)) return
      state.tagsArray.push(payload)
    },
    removeTag(state, payload) {
      if (state.tagsArray.length === 1) return
      let index = state.tagsArray.findIndex((v) => v.path === payload.path)
      state.tagsArray.splice(index, 1)
      let lastIndex = state.tagsArray.length - 1
      router.push(state.tagsArray[lastIndex].path)
      // 除了首页以外全部关掉了，就清除缓存
      if (state.tagsArray.length === 1) sessionStorage.clear()
    }
  }
}

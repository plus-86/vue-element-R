export default {
  namespaced: true,
  state: {
    isOpen: false
  },
  mutations: {
    switchDrawer(state) {
      state.isOpen = !state.isOpen
    }
  }
}

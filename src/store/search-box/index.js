export default {
  namespaced: true,
  state: {
    searchBoxState: false
  },
  mutations: {
    openSearchBox(state) {
      state.searchBoxState = !state.searchBoxState
    }
  }
}

export default {
  namespaced: true,
  state: {
    textThemeColor: [
      { color: '#2d8cf0' },
      { color: '#36b368' },
      { color: '#f6ad55' },
      { color: '#f56c6c' },
      { color: '#3963bc' }
    ],
    textNum: 0
  },
  mutations: {
    chooseTextThemeColor(state, payload) {
      state.textNum = payload
      localStorage.setItem('color', payload)
    }
  }
}

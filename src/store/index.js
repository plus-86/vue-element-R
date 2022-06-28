import Vue from 'vue'
import Vuex from 'vuex'
import LeftMenu from './left-menu'
import DrawerMenu from './drawer-menu'
import ThemeColor from './theme-color'
import SearchBox from './search-box'
import TagBar from './tag-bar'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    LeftMenu,
    DrawerMenu,
    ThemeColor,
    SearchBox,
    TagBar
  }
})

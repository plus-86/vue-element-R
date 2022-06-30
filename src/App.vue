<template>
  <div id="app">
    <section class="Aside-Menu">
      <AsideMenu></AsideMenu>
    </section>
    <section class="body">
      <div class="Nav-Bar"><NavBar></NavBar></div>
      <div class="Tag-Bar"><TagBar></TagBar></div>
      <div class="router">
        <router-view />
      </div>
    </section>
    <div v-show="isOpen" class="Drawer">
      <Drawer></Drawer>
    </div>
  </div>
</template>
<script>
import AsideMenu from '@/components/AsideMenu.vue'
import NavBar from '@/components/NavBar.vue'
import Drawer from '@/components/NavBar/Drawer.vue'
import TagBar from '@/components/TagBar.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  created() {
    if (localStorage.getItem('color'))
      this.chooseTextThemeColor(localStorage.getItem('color'))
  },
  methods: {
    ...mapMutations('ThemeColor', ['chooseTextThemeColor'])
  },
  computed: {
    ...mapState('DrawerMenu', ['isOpen'])
  },
  components: {
    AsideMenu,
    NavBar,
    Drawer,
    TagBar
  }
}
</script>
<style lang="scss">
#app {
  display: flex;
  height: 100vh;
  .body {
    width: 100%;
    display: flex;
    flex-direction: column;
    .router {
      flex: 1;
    }
  }
}
.Drawer {
  width: 100%;
  height: 100vh;
  position: absolute;
}
</style>

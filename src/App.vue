<template>
  <div id="app">
    <section class="Aside-Menu">
      <AsideMenu></AsideMenu>
    </section>
    <section class="body">
      <div class="Nav-Bar"><NavBar></NavBar></div>
      <div class="Tag-Bar"><TagBar></TagBar></div>
      <router-view />
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
import { mapState } from 'vuex'
export default {
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
  }
}
.Drawer {
  width: 100%;
  height: 100vh;
  position: absolute;
}
</style>

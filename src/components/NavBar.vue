<template>
  <div class="Nav-Bar">
    <div class="left-side">
      <i
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
        @click="collapseMenu"
        v-show="isCollapse"
        class="el-icon-s-fold"
      ></i>
      <i
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
        @click="collapseMenu"
        v-show="!isCollapse"
        class="el-icon-s-unfold"
      ></i>
      <div class="crumb">
        <Crumb></Crumb>
      </div>
    </div>
    <div class="right-side">
      <i
        @click="openSearchBox"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
        class="el-icon-search"
      ></i>
      <Search v-show="searchBoxState"></Search>
      <User></User>
      <i
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
        @click="switchDrawer"
        class="el-icon-more"
      ></i>
    </div>
  </div>
</template>

<script>
import Crumb from '@/components/NavBar/Crumb.vue'
import Search from '@/components/NavBar/Search.vue'
import User from '@/components/NavBar/User.vue'
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState('LeftMenu', ['isCollapse']),
    ...mapState('ThemeColor', ['textThemeColor', 'textNum']),
    ...mapState('SearchBox', ['searchBoxState'])
  },
  methods: {
    ...mapMutations('SearchBox', ['openSearchBox']),
    mouseEnter(e) {
      let doc = document.querySelector('.' + e.target.className)
      let color = this.textThemeColor[this.textNum].color
      doc.style['border-top-color'] = color
      doc.style['color'] = color
    },
    mouseLeave(e) {
      let doc = document.querySelector('.' + e.target.className)
      doc.style['border-top-color'] = 'transparent'
      doc.style['color'] = 'black'
    },

    ...mapMutations('DrawerMenu', ['switchDrawer']),
    ...mapMutations('LeftMenu', ['collapseMenu'])
  },
  components: {
    Crumb,
    User,
    Search
  }
}
</script>

<style lang="scss" scoped>
$icon-padding: 15px;
$drawer-transition-time: 0.3s;
.Nav-Bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px #00000014;
  .left-side {
    display: flex;
    i,
    .crumb {
      padding: $icon-padding;
      border-top: 2px solid transparent;
    }
    i {
      transition: $drawer-transition-time;
      cursor: pointer;
    }
  }
  .right-side {
    display: flex;
    i {
      border-top: 2px solid transparent;
      padding: $icon-padding;
      transition: $drawer-transition-time;
    }
  }
}
</style>

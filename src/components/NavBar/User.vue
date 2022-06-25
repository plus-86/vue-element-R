<template>
  <div class="User">
    <el-dropdown>
      <i
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
        class="el-icon-user"
      ></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">个人中心</el-dropdown-item>
        <el-dropdown-item command="e" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('ThemeColor', ['textThemeColor', 'textNum'])
  },
  methods: {
    mouseEnter(e) {
      let doc = document.querySelector('.el-icon-user')
      let color = this.textThemeColor[this.textNum].color
      doc.style['border-top-color'] = color
      doc.style['color'] = color
    },
    mouseLeave(e) {
      let doc = document.querySelector('.el-icon-user')
      doc.style['border-top-color'] = 'transparent'
      doc.style['color'] = 'black'
    }
  }
}
</script>

<style lang="scss" scoped>
i {
  border-top: 2px solid transparent;
  padding: 15px;
  transition: 0.3s;
}
</style>

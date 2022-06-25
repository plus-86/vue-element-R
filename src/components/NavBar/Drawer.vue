<template>
  <div class="Drawer">
    <div @click="closeDrawer" class="mask"></div>
    <div :class="drawer ? 'active' : ''" class="drawer-menu">
      <div class="color-options">
        <p>主题配色</p>
        <ul>
          <li
            :style="{ background: item.color }"
            v-for="(item, index) in textThemeColor"
            :key="index"
            @click="chooseTextThemeColor(index)"
          >
            <i v-show="textNum === index" class="el-icon-check"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      drawer: false
    }
  },
  watch: {
    // isOpen直接拿来用，会导致进入组件时active样已经激活，进而进入动画失效
    isOpen(newValue, oldValue) {
      setTimeout(() => {
        this.drawer = newValue
      }, 0)
    }
  },
  methods: {
    closeDrawer() {
      // 先关掉抽屉
      this.drawer = false
      // 等抽屉关闭再关闭遮罩层
      setTimeout(() => {
        this.switchDrawer()
      }, 500)
    },
    ...mapMutations('DrawerMenu', ['switchDrawer']),
    ...mapMutations('ThemeColor', ['chooseTextThemeColor'])
  },
  computed: {
    // isOpen不能直接拿来跟抽屉active样式做绑定，因为点击NavBar打开抽屉组件时，isOpen已经是true，那么进入组件前抽屉active样式已经激活，所以不会有进场动画效果
    ...mapState('DrawerMenu', ['isOpen']),
    ...mapState('ThemeColor', ['textThemeColor', 'textNum'])
  }
}
</script>

<style lang="scss" scoped>
.Drawer {
  display: flex;
  overflow: hidden;
  .mask {
    width: 100%;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.3);
  }
  .drawer-menu {
    position: absolute;
    width: 25%;
    height: 100vh;
    background: #fff;
    right: -25%;
    transition: 0.5s;
    .color-options {
      p {
        font-size: 14px;
        padding: 20px;
      }
      ul {
        display: flex;
        padding: 10px 0 0 20px;
        li {
          width: 30px;
          height: 30px;
          border-radius: 3px;
          text-align: center;
          cursor: pointer;
          i {
            color: #fff;
            line-height: 30px;
          }
        }
        li:not(:first-child) {
          margin-left: 15px;
        }
      }
    }
  }
  .active {
    right: 0%;
  }
}
</style>

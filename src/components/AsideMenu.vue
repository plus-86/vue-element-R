<template>
  <div class="Aside-Menu">
    <el-menu
      :active-text-color="textThemeColor[textNum].color"
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu
        :index="item.index"
        v-for="(item, index) in menuData"
        :key="index"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.name }}</span>
        </template>
        <el-submenu
          v-for="(child, index) in item.children"
          :key="index"
          :index="child.index"
        >
          <i :class="child.icon"></i>
          <span slot="title">{{ child.name }}</span>
          <el-submenu
            v-for="(gchild, index) in child.children"
            :key="index"
            :index="gchild.index"
          >
            <i :class="gchild.icon"></i>
            <span slot="title">{{ gchild.name }}</span>
            <el-submenu
              v-for="(ggchild, index) in gchild.children"
              :key="index"
              :index="ggchild.index"
            >
              <i :class="ggchild.icon"></i>
              <span slot="title">{{ ggchild.name }}</span>
            </el-submenu>
          </el-submenu>
        </el-submenu>
      </el-submenu>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      menuData: [
        {
          index: '1',
          name: '首页',
          icon: 'el-icon-menu'
        },
        {
          index: '2',
          name: '路由嵌套',
          icon: 'el-icon-document-copy',
          children: [
            {
              index: '2-1',
              name: '菜单1',
              children: [
                {
                  index: '2-1-1',
                  name: '菜单1-1'
                },
                {
                  index: '2-1-2',
                  name: '菜单1-2',
                  children: [
                    {
                      index: '2-1-2-1',
                      name: '菜单1-2-1'
                    },
                    {
                      index: '2-1-2-2',
                      name: '菜单1-2-2'
                    }
                  ]
                }
              ]
            },
            {
              index: '2-2',
              name: '菜单2'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState('LeftMenu', ['isCollapse']),
    ...mapState('ThemeColor', ['textThemeColor', 'textNum'])
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 220px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;
  overflow-y: auto;
}
</style>

<template>
  <div class="Aside-Menu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :active-text-color="textThemeColor[textNum].color"
    >
      <template v-for="item in menuData">
        <!-- 有子路由 -->
        <template v-if="item.hasChildren">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="child in item.children">
              <!-- 有子路由 -->
              <template v-if="child.hasChildren">
                <el-submenu :index="child.index" :key="child.index">
                  <template slot="title">
                    <i :class="child.icon"></i>
                    <span>{{ child.name }}</span>
                  </template>
                  <template v-for="gchild in child.children">
                    <!-- 有子路由 -->
                    <template v-if="gchild.hasChildren">
                      <el-submenu :index="gchild.index" :key="gchild.index">
                        <template slot="title">
                          <i :class="gchild.icon"></i>
                          <span>{{ gchild.name }}</span>
                        </template>
                        <template v-for="ggchild in gchild.children">
                          <!-- 有子路由 -->
                          <template v-if="ggchild.hasChildren">
                            <el-submenu
                              :index="ggchild.index"
                              :key="ggchild.index"
                            >
                              <template slot="title">
                                <i :class="ggchild.icon"></i>
                                <span>{{ ggchild.name }}</span>
                              </template>
                            </el-submenu>
                          </template>
                          <!-- 没子路由 -->
                          <template v-else>
                            <el-menu-item
                              :index="ggchild.index"
                              :key="ggchild.index"
                            >
                              <i :class="ggchild.icon"></i>
                              <span slot="title">{{ ggchild.name }}</span>
                            </el-menu-item>
                          </template>
                        </template>
                      </el-submenu>
                    </template>
                    <!-- 没子路由 -->
                    <template v-else>
                      <el-menu-item :index="gchild.index" :key="gchild.index">
                        <i :class="gchild.icon"></i>
                        <span slot="title">{{ gchild.name }}</span>
                      </el-menu-item>
                    </template>
                  </template>
                </el-submenu>
              </template>
              <!-- 没子路由 -->
              <template v-else>
                <el-menu-item :index="child.index" :key="child.index">
                  <i :class="child.icon"></i>
                  <span slot="title">{{ child.name }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>
        <!-- 没子路由 -->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
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
          icon: 'el-icon-menu',
          hasChildren: false
        },
        {
          index: '2',
          name: '路由嵌套',
          icon: 'el-icon-document-copy',
          hasChildren: true,
          children: [
            {
              index: '2-1',
              name: '菜单1',
              hasChildren: true,
              children: [
                {
                  index: '2-1-1',
                  name: '菜单1-1'
                },
                {
                  index: '2-1-2',
                  name: '菜单1-2',
                  hasChildren: true,
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
              name: '菜单2',
              hasChildren: false
            }
          ]
        },
        {
          index: '3',
          name: '组件',
          icon: 'el-icon-cpu',
          hasChildren: true,
          children: [
            {
              index: '3-1',
              name: '富文本编辑器'
            },
            {
              index: '3-2',
              name: 'Markdown'
            },
            {
              index: '3-3',
              name: 'JSON 编辑器'
            },
            {
              index: '3-4',
              name: '小组件'
            },
            {
              index: '3-5',
              name: 'Count To'
            },
            {
              index: '3-6',
              name: '头像上传'
            },
            {
              index: '3-7',
              name: '拖拽'
            },
            {
              index: '3-8',
              name: 'Splitpane'
            },
            {
              index: '3-9',
              name: '返回顶部'
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

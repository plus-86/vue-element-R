<template>
  <div class="Aside-Menu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :active-text-color="textThemeColor[textNum].color"
    >
      <template v-for="item in menuData">
        <!-- 有子路由 -->
        <template v-if="item.hasChildren">
          <!-- @click在el-submenu使用无效，使用@click.native即可 -->
          <el-submenu
            @click.native="addTag(item)"
            :index="item.index"
            :key="item.index"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.tagName }}</span>
            </template>
            <template v-for="child in item.children">
              <!-- 有子路由 -->
              <template v-if="child.hasChildren">
                <el-submenu
                  @click.native="addTag(child)"
                  :index="child.index"
                  :key="child.index"
                >
                  <template slot="title">
                    <i :class="child.icon"></i>
                    <span>{{ child.tagName }}</span>
                  </template>
                  <template v-for="gchild in child.children">
                    <!-- 有子路由 -->
                    <template v-if="gchild.hasChildren">
                      <el-submenu
                        @click.native="addTag(gchild)"
                        :index="gchild.index"
                        :key="gchild.index"
                      >
                        <template slot="title">
                          <i :class="gchild.icon"></i>
                          <span>{{ gchild.tagName }}</span>
                        </template>
                        <template v-for="ggchild in gchild.children">
                          <!-- 有子路由 -->
                          <template v-if="ggchild.hasChildren">
                            <el-submenu
                              @click.native="addTag(ggchild)"
                              :index="ggchild.index"
                              :key="ggchild.index"
                            >
                              <template slot="title">
                                <i :class="ggchild.icon"></i>
                                <span>{{ ggchild.tagName }}</span>
                              </template>
                            </el-submenu>
                          </template>
                          <!-- 没子路由 -->
                          <template v-else>
                            <el-menu-item
                              @click.native="addTag(ggchild)"
                              :index="ggchild.index"
                              :key="ggchild.index"
                            >
                              <i :class="ggchild.icon"></i>
                              <span slot="title">{{ ggchild.tagName }}</span>
                            </el-menu-item>
                          </template>
                        </template>
                      </el-submenu>
                    </template>
                    <!-- 没子路由 -->
                    <template v-else>
                      <el-menu-item
                        @click.native="addTag(gchild)"
                        :index="gchild.index"
                        :key="gchild.index"
                      >
                        <i :class="gchild.icon"></i>
                        <span slot="title">{{ gchild.tagName }}</span>
                      </el-menu-item>
                    </template>
                  </template>
                </el-submenu>
              </template>
              <!-- 没子路由 -->
              <template v-else>
                <el-menu-item
                  @click.native="addTag(child)"
                  :index="child.index"
                  :key="child.index"
                >
                  <i :class="child.icon"></i>
                  <span slot="title">{{ child.tagName }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>
        <!-- 没子路由 -->
        <template v-else>
          <el-menu-item
            @click.native="addTag(item)"
            :index="item.index"
            :key="item.index"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.tagName }}</span>
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
      arr: [],
      menuData: [
        {
          index: '1',
          tagName: '首页',
          icon: 'el-icon-menu',
          hasChildren: false,
          path: '/dashboard'
        },
        {
          index: '2',
          tagName: '路由嵌套',
          icon: 'el-icon-document-copy',
          hasChildren: true,
          children: [
            {
              index: '2-1',
              tagName: '菜单1',
              hasChildren: true,
              children: [
                {
                  index: '2-1-1',
                  tagName: '菜单1-1',
                  path: '/nested/menu1/menu1-1'
                },
                {
                  index: '2-1-2',
                  tagName: '菜单1-2',
                  hasChildren: true,
                  children: [
                    {
                      index: '2-1-2-1',
                      tagName: '菜单1-2-1',
                      path: '/nested/menu1/menu1-2/menu1-2-1'
                    },
                    {
                      index: '2-1-2-2',
                      tagName: '菜单1-2-2',
                      path: '/nested/menu1/menu1-2/menu1-2-2'
                    }
                  ]
                }
              ]
            },
            {
              index: '2-2',
              tagName: '菜单2',
              hasChildren: false,
              path: '/nested/menu2'
            }
          ]
        },
        {
          index: '3',
          tagName: '组件',
          icon: 'el-icon-cpu',
          hasChildren: true,
          children: [
            {
              index: '3-1',
              tagName: '表单和表格',
              hasChildren: false,
              path: '/components/formandtable'
            },
            {
              index: '3-2',
              tagName: 'Markdown'
            },
            {
              index: '3-3',
              tagName: 'JSON 编辑器'
            },
            {
              index: '3-4',
              tagName: '小组件'
            },
            {
              index: '3-5',
              tagName: 'Count To'
            },
            {
              index: '3-6',
              tagName: '头像上传'
            },
            {
              index: '3-7',
              tagName: '拖拽'
            },
            {
              index: '3-8',
              tagName: 'Splitpane'
            },
            {
              index: '3-9',
              tagName: '返回顶部'
            },
            {
              index: '3-10',
              tagName: '富文本编辑器',
              hasChildren: false,
              path: '/components/richtext'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapState('LeftMenu', ['isCollapse']),
    ...mapState('ThemeColor', ['textThemeColor', 'textNum']),
    ...mapState('TagBar', ['tagsArray'])
  },
  methods: {
    ...mapMutations('TagBar', ['addTag'])
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

<template>
  <div class="Tag-Bar">
    <ul>
      <li
        @click="switchTag(item)"
        v-for="(item, index) in tagsArray"
        :style="
          $route.path === item.path
            ? {
                background: textThemeColor[textNum].color,
                'border-color': textThemeColor[textNum].color,
                color: '#fff'
              }
            : ''
        "
        :key="index"
      >
        <i class="el-icon-location"></i>
        <span>{{ item.tagName }}</span>
        <i
          v-show="item.path === '/dashboard' ? false : true"
          @click.stop="removeTag({ path: item.path })"
          class="el-icon-close"
        ></i>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  created() {
    if (JSON.parse(sessionStorage.getItem('router'))) {
      this.addTag(JSON.parse(sessionStorage.getItem('router')))
    }
  },
  methods: {
    ...mapMutations('TagBar', ['removeTag', 'addTag', 'switchTag'])
  },
  computed: {
    ...mapState('TagBar', ['tagsArray']),
    ...mapState('ThemeColor', ['textThemeColor', 'textNum'])
  }
}
</script>

<style lang="scss" scoped>
.Tag-Bar {
  color: #fff;
  font-size: 12px;
  box-shadow: 0 2px 4px #00000014;
  ul {
    display: flex;
    align-items: center;
    margin-left: 15px;
    height: 40px;
    li {
      background: #fff;
      color: #495060;
      border: 1px solid #d8dce5;
      padding: 4px 8px;
      cursor: pointer;
      transition: 0.5s;
      &.active {
        background: #36b368;
        border-color: #36b368;
        color: #fff;
      }
      i {
        font-size: 12px;
      }
      span {
        margin: 0 5px;
      }
    }
    li:not(:first-child) {
      margin-left: 5px;
    }
  }
}
</style>

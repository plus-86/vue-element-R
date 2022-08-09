<template>
  <div class="Crumb">
    <span
      v-show="$route.path === item.path"
      v-for="(item, index) in tagsArray"
      :key="index"
      >{{ item.tagName }}</span
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('TagBar', ['tagsArray'])
  }
}
</script>

<style lang="scss" scoped>
.Crumb {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  cursor: default;
}
</style>

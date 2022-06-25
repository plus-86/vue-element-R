<template>
  <div class="Tag-Bar">
    <ul>
      <li v-for="(item, index) in 6" :key="index">
        <i class="el-icon-location"></i>
        <span>首页</span>
        <i class="el-icon-close"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
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
      background: #42b983;
      padding: 4px 8px;
      cursor: pointer;
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

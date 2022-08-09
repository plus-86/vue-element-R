<template>
  <div class="table" style="width: 98%; margin: 15px auto; border-radius: 5px">
    <el-card>
      <div>
        <!-- 新增、导入、导出按钮 -->
        <el-button
          @click="
            item.buttonName === '新增车辆' ? $emit('addVehicle') : '',
              item.buttonName === '新增保单' ? $emit('addNewPolicy') : '',
              item.buttonName === '新增渠道' ? $emit('toShowFormTwo') : '',
              item.buttonName === '新增人员'
                ? $emit('navToCreateAndModify')
                : '',
              item.buttonName === '导入' ? $emit('importFile') : '',
              item.buttonName === '导出' ? $emit('exportFile') : ''
          "
          v-for="(item, index) in tempButton"
          :key="index"
          class="custom-button-style"
          type="primary"
          >{{ item.buttonName }}</el-button
        >

        <el-table
          :data="tempTableData"
          style="width: 100%; margin-bottom: 20px"
          row-key="id"
          default-expand-all
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        >
          <template v-for="item in tempTableItems">
            <!-- 选择框 -->
            <el-table-column
              v-if="item.type"
              :type="item.type"
              :prop="item.prop ? item.prop : ''"
              :label="item.label ? item.label : ''"
              :width="item.width ? item.width : ''"
              :align="item.align ? item.align : ''"
              :header-align="item['header-align'] ? item['header-align'] : ''"
              :key="item.prop"
            ></el-table-column>
            <!-- 开关按钮 -->
            <el-table-column
              v-if="item.prop === 'state'"
              :key="item.prop"
              :prop="item.prop ? item.prop : ''"
              :label="item.label ? item.label : ''"
              :width="item.width ? item.width : ''"
              :align="item.align ? item.align : ''"
              :header-align="item['header-align'] ? item['header-align'] : ''"
            >
              <template slot-scope="scope">
                <el-switch
                  class="tableScopeSwitch"
                  v-model="scope.row.state"
                  active-color="#1890ff"
                  inactive-color="rgb(192, 192, 192)"
                  active-value="1"
                  inactive-value="0"
                  active-text="启用"
                  inactive-text="禁用"
                  @change="switchChange(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
            <!-- 显示文本 -->
            <el-table-column
              v-if="
                !item.type && item.prop !== 'state' && item.prop !== 'operation'
              "
              :key="item.prop"
              :prop="item.prop ? item.prop : ''"
              :label="item.label ? item.label : ''"
              :width="item.width ? item.width : ''"
              :align="item.align ? item.align : ''"
              :header-align="item['header-align'] ? item['header-align'] : ''"
            ></el-table-column>

            <!-- 操作按钮组 -->
            <el-table-column
              v-if="item.prop === 'operation'"
              :key="item.prop"
              :label="item.label ? item.label : ''"
              :width="item.width ? item.width : ''"
              :align="item.align ? item.align : ''"
              :header-align="item['header-align'] ? item['header-align'] : ''"
            >
              <template slot-scope="scope">
                <el-button
                  @click="
                    but.type == 'checkRowDetail'
                      ? $emit('checkRowDetail', scope)
                      : '',
                      but.type == 'editRow' ? $emit('editRow', scope) : '',
                      but.type == 'removeRow' ? $emit('removeRow', scope) : ''
                  "
                  v-for="(but, index) in scope.row.operation"
                  :key="index"
                  type="text"
                  size="small"
                  :style="but.color ? { color: but.color } : ''"
                  >{{ but.operationName }}</el-button
                >
              </template>
            </el-table-column>
          </template>
        </el-table>
        <el-pagination
          class="paging"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageSize: 10,
      currentPage: 1,
      show: true,
      tempTableData: [],
      tempTableItems: [],
      tempButtonConfig: [],
      tempButton: []
    }
  },
  props: {
    tableItems: {
      type: Array,
      default: function () {
        return []
      }
    },
    tableData: {
      type: Array,
      default: function () {
        return []
      }
    },
    buttonConfig: {
      type: Array,
      default: function () {
        return []
      }
    },
    button: {
      type: Array,
      default: function () {
        return []
      }
    },
    total: {
      type: Number,
      default: 0
    }
  },
  watch: {
    // 表格数据
    tableData: {
      handler(val) {
        this.tempTableData = val
      },
      deep: true,
      immediate: true
    },
    // 列表头
    tableItems: {
      handler(val) {
        this.tempTableItems = val
      },
      deep: true,
      immediate: true
    },
    buttonConfig: {
      handler(val) {
        this.tempButtonConfig = val
      },
      deep: true,
      immediate: true
    },
    // 表头操作按钮(导入、导出、新增)
    button: {
      handler(val) {
        this.tempButton = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange() {},
    switchChange(item) {
      console.log('switchChange')
      console.log(item)
      // 通过item去开关启用状态
      // 用item去发起请求，来更改启用禁用状态
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/assets/style/global-style.scss';

.table {
  @include main-card-frame;
}
.paging {
  display: flex;
  justify-content: flex-end;
}
::v-deep.tableScopeSwitch .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
/*打开时文字位置设置*/
::v-deep.tableScopeSwitch .el-switch__label--right {
  z-index: 1;
  right: 22px; /*不同场景下可能不同，自行调整*/
}
/*关闭时文字位置设置*/
::v-deep.tableScopeSwitch .el-switch__label--left {
  z-index: 1;
  left: 22px; /*不同场景下可能不同，自行调整*/
}
/*显示文字*/
::v-deep.tableScopeSwitch .el-switch__label.is-active {
  display: block;
}
::v-deep.tableScopeSwitch.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 60px !important; /*开关按钮的宽度大小*/
}
.custom-button-style {
  margin-bottom: 20px;
  padding: 10px 20px;
}
</style>

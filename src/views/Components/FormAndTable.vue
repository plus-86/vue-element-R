<template>
  <div class="page">
    <MyForm
      :formTitle="formTitle"
      :formData="formData"
      :formItems="formItems"
      @handleSearch="handleSearch"
      @reset="reset"
    />
    <MyTable
      @importFile="importFile"
      @exportFile="exportFile"
      @checkRowDetail="checkRowDetail"
      @editRow="editRow"
      @removeRow="removeRow"
      :button="button"
      :total="total"
      :tableItems="tableItems"
      :tableData="tableData"
    />
  </div>
</template>
<script>
// import { getVehicleList } from "@/api/vehicleManage/index.js";
export default {
  data() {
    return {
      formTitle: '车辆管理',
      // 数据条数
      total: 0,
      // 按键名
      button: [],
      defaultWidth: '200px',
      // 表单
      formItems: [],
      formData: {},
      // 表格
      tableItems: [],
      tableData: []
    }
  },
  async created() {
    // this.obtainVehicleList()
    this.initFormItems()
    this.initTable()
  },
  methods: {
    // async obtainVehicleList(option) {
    //   let res = await getVehicleList(option)
    //   this.total = res.total
    //   if (res.rows.length == 0) return (this.tableData = [])
    //   for (let i in res.rows) {
    //     let operation = [
    //       {
    //         operationName: '车辆信息',
    //         type: 'checkRowDetail'
    //       },
    //       {
    //         operationName: '编辑',
    //         type: 'editRow'
    //       },
    //       {
    //         operationName: '删除',
    //         color: 'red',
    //         type: 'removeRow'
    //       }
    //     ]
    //     res.rows[i].operation = operation
    //     this.tableData = res.rows
    //   }
    // },
    async handleSearch() {
      this.$message({
        type: 'success',
        message: 'search'
      })
      //   this.obtainVehicleList(this.formData)
    },
    //#region
    checkRowDetail(scope) {
      console.log(scope)
      this.$message({
        type: 'success',
        message: 'checkRowDetail'
      })
    },
    editRow(scope) {
      console.log(scope)
      this.$message({
        type: 'success',
        message: 'editRow'
      })
    },
    removeRow(scope) {
      console.log(scope)
      this.$message({
        type: 'success',
        message: 'removeRow'
      })
    },
    importFile() {
      this.$message({
        type: 'success',
        message: 'importFile'
      })
    },
    exportFile() {
      this.$message({
        type: 'success',
        message: 'exportFile'
      })
    },
    reset() {
      this.formData = {}
      this.$message({
        type: 'success',
        message: 'reset'
      })
      //   this.obtainVehicleList(this.formData)
    },
    //#endregion
    initTable() {
      this.button = [
        {
          buttonName: '导入'
        },
        {
          buttonName: '导出'
        }
      ]
      this.tableData = [
        {
          plateNo: 1,
          vin: 2,
          engineNo: 3,
          owner: 4,
          carOwnerType: 5,
          deptId: 6,
          dwId: 7,
          vehicleType: 8,
          operation: [
            {
              operationName: '车辆信息',
              type: 'checkRowDetail'
            },
            {
              operationName: '编辑',
              type: 'editRow'
            },
            {
              operationName: '删除',
              color: 'red',
              type: 'removeRow'
            }
          ]
        }
      ]
      // table column
      this.tableItems = [
        {
          type: 'selection'
        },
        {
          prop: 'plateNo', // 这个prop跟后端传的字段同名，就不用重新命名字段
          label: '车牌号',
          align: 'center',
          'header-align': 'center'
        },
        {
          prop: 'vin',
          label: '车架号',
          align: 'center',
          'header-align': 'center'
        },
        {
          prop: 'engineNo',
          label: '发动机号',
          align: 'center',
          'header-align': 'center'
        },
        {
          prop: 'owner',
          label: '车主姓名',
          align: 'center',
          'header-align': 'center'
        },

        {
          prop: 'carOwnerType',
          label: '车主类型',
          align: 'center',
          'header-align': 'center'
        },
        {
          prop: 'deptId',
          label: '所属机构',
          align: 'center',
          'header-align': 'center'
        },
        {
          prop: 'dwId',
          label: '所属渠道',
          align: 'center',
          'header-align': 'center'
        },

        {
          prop: 'vehicleType',
          label: '车辆类型',
          align: 'center',
          'header-align': 'center'
        },
        {
          prop: 'operation',
          label: '操作',
          align: 'center',
          'header-align': 'center',
          width: '200'
        }
      ]
    },
    initFormItems() {
      this.formItems = [
        {
          type: 'Input', // 选择表单类
          name: 'ownerName',
          prop: 'name', // 决定formData内属性名(v-model="tempFormData[item.prop]")，发请求时候的字段名，所以最好跟后端同名
          placeholder: '请输入车主姓名',
          width: this.defaultWidth,
          label: '车主姓名'
        },
        {
          type: 'Select',
          name: 'ownerType',
          prop: 'carOwnerType',
          placeholder: '选择类型',
          width: this.defaultWidth,
          label: '车主类型',
          // select内的选项
          options: {
            data: [
              { ownerType: '选项1', carOwnerType: '1' },
              { ownerType: '选项2', carOwnerType: '2' }
            ],
            key: 'carOwnerType', // 选项标签 label
            value: 'ownerType' // 选项值 value
          }
        },
        {
          type: 'Select',
          name: 'fuelType',
          prop: 'fuelType',
          placeholder: '选择类型',
          width: this.defaultWidth,
          label: '燃料类型',
          options: {
            data: [
              { fuelOption: '类型1', fuelType: '1' },
              { fuelOption: '类型2', fuelType: '2' }
            ],
            key: 'fuelType',
            value: 'fuelOption'
          }
        },
        {
          type: 'Select',
          name: 'vehicleType',
          prop: 'vehicleType',
          placeholder: '选择类型',
          width: this.defaultWidth,
          label: '车辆类型',
          options: {
            data: [
              { vehicleOption: '类型1', vehicleType: '1' },
              { vehicleOption: '类型2', vehicleType: '2' }
            ],
            key: 'vehicleType',
            value: 'vehicleOption'
          }
        },
        {
          type: 'Input',
          name: 'plateNumber',
          prop: 'plateNo',
          placeholder: '请输入',
          width: this.defaultWidth,
          label: '车牌号'
        },
        {
          type: 'Input',
          name: 'engineNumber',
          prop: 'engineNo',
          placeholder: '请输入',
          width: this.defaultWidth,
          label: '发动机号'
        },
        {
          type: 'Input',
          name: 'vehicleFrameNumber',
          prop: 'vin',
          placeholder: '请输入',
          width: this.defaultWidth,
          label: '车架号'
        },
        {
          type: 'Input',
          name: 'salesman',
          prop: 'salesman',
          placeholder: '请输入',
          width: this.defaultWidth,
          label: '业务人员'
        },
        {
          type: 'Select',
          name: 'belongTo',
          prop: 'deptId',
          placeholder: '请选择',
          width: this.defaultWidth,
          label: '所属机构',
          options: {
            data: [{ belongTo: 'b1', deptId: '104' }],
            key: 'deptId',
            value: 'belongTo'
          }
        },
        {
          type: 'Select',
          name: 'channel',
          prop: 'dwId',
          placeholder: '请选择',
          width: this.defaultWidth,
          label: '所属渠道',
          options: {
            data: [{ channel: '渠道', dwId: '104' }],
            key: 'dwId',
            value: 'channel'
          }
        }
      ]
    }
  }
}
</script>

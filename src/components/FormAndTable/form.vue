<template>
  <div
    style="width: 98%; margin: 15px auto; border-radius: 5px"
    :class="inline == true ? 'the-form' : ''"
  >
    <el-card>
      <div slot="header" class="clearfix">
        <span>{{ formTitle }}</span>
      </div>
      <el-form
        :model="tempFormData"
        :label-width="labelWidth"
        :width="formWidth"
        :inline="inline"
        :loading="loading"
        :size="size"
      >
        <el-form-item
          v-for="item in tempFormItems"
          :label="item.label ? item.label + '：' : ''"
          :key="item.prop"
          :prop="item.prop"
          :rules="item.rules"
        >
          <!-- 输入框 -->
          <el-input
            v-if="item.type === 'Input' && !view"
            v-model="tempFormData[item.prop]"
            :style="{ width: item.width }"
            :disabled="item.disable"
            :placeholder="
              item.placeholder ? item.placeholder : '请输入' + item.label
            "
          >
          </el-input>
          <template v-if="view">
            <span v-text="tempFormData[item.prop]"></span>
          </template>
          <!-- 数字输入框 -->
          <el-input
            type="number"
            :min="1"
            v-if="item.type === 'inputNumber' && !view"
            v-model.number="tempFormData[item.prop]"
            :style="{ width: item.width }"
            :disabled="item.disable"
            :placeholder="
              item.placeholder ? item.placeholder : '请输入' + item.label
            "
          >
          </el-input>
          <template v-if="view">
            <span v-text="tempFormData[item.prop]"></span>
          </template>
          <!-- 下拉框 filterable 是否可搜索 默认是false  multiple 是否多选 默认false-->
          <el-select
            v-if="item.type === 'Select'"
            :multiple="item.multiple"
            :filterable="item.filterable"
            v-model="tempFormData[item.prop]"
            :style="{ width: item.width }"
            :disabled="item.disable"
            :placeholder="
              item.placeholder ? item.placeholder : '请选择' + item.label
            "
            :remote="item.remote"
            :remote-method="
              (query) => {
                remoteMethod(query, item.prop)
              }
            "
            clearable
          >
            <el-option
              v-for="op in item.options.data"
              :label="op[item.options.key] || op.key"
              :value="op[item.options.value] || op.value"
              :key="op[item.options.key] || op.key"
            >
            </el-option>
          </el-select>

          <!-- 日期 -->
          <el-date-picker
            v-if="item.type === 'Date'"
            v-model="tempFormData[item.prop]"
            :disabled="item.disable"
            :placeholder="item.placeholder ? item.placeholder : '请选择日期'"
            :style="{ width: item.width }"
            clearable
          >
          </el-date-picker>

          <!-- 时间 -->
          <el-time-select
            v-if="item.type === 'Time'"
            v-model="tempFormData[item.prop]"
            :disabled="item.disable"
            :placeholder="item.placeholder ? item.placeholder : '请选择时间'"
            clearable
          >
          </el-time-select>

          <!-- 日期时间 -->
          <el-date-picker
            v-if="item.type === 'DateTime'"
            type="datetime"
            v-model="tempFormData[item.prop]"
            :disabled="item.disable"
            :placeholder="item.placeholder ? item.placeholder : '请选择日期'"
            clearable
          >
          </el-date-picker>

          <!-- 日期范围,带时间 -->
          <el-date-picker
            v-if="item.type === 'datetimerange'"
            type="datetimerange"
            v-model="tempFormData[item.prop]"
            :disabled="item.disable"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
          >
          </el-date-picker>
          <!-- 日期范围,只有日期 -->
          <el-date-picker
            v-if="item.type === 'daterange'"
            type="daterange"
            v-model="tempFormData[item.prop]"
            :disabled="item.disable"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable
            :style="{ width: item.width }"
          >
          </el-date-picker>

          <!-- 单选框 普通的样式 Radio 的尺寸，仅在 border 为真时有效-->
          <template v-if="item.type === 'radio'">
            <el-radio
              v-model="tempFormData[item.prop]"
              v-for="op in item.options.data"
              :disabled="item.disable"
              :border="tempFormData[item.border]"
              :size="tempFormData[item.size]"
              :label="op[item.options.value] || op.value"
              :value="op[item.options.key] || op.key"
              :key="op[item.options.key] || op.key"
            ></el-radio>
          </template>

          <!-- 单选框 按钮样式 -->
          <el-radio-group
            v-if="item.type === 'radioButtom'"
            v-model="tempFormData[item.prop]"
            :size="tempFormData[item.size]"
            :disabled="item.disable"
          >
            <el-radio-button
              v-for="op in item.options.data"
              :label="op[item.options.value] || op.value"
              :value="op[item.options.key] || op.key"
              :key="op[item.options.key] || op.key"
            ></el-radio-button>
          </el-radio-group>

          <!-- 文本框 -->
          <el-input
            v-if="item.type === 'textarea' && !view"
            v-model="tempFormData[item.prop]"
            type="textarea"
            :style="{ width: item.width }"
            :disabled="item.disable"
            :rows="item.row"
            :autosize="item.autosize"
            :placeholder="
              item.placeholder ? item.placeholder : '请输入' + item.label
            "
          >
          </el-input>
          <el-upload
            v-if="item.type === 'upload' && !view"
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <!-- 查询按钮 -->
        <span style="margin-left: 120px" v-if="inline">
          <el-form-item v-show="show">
            <el-button type="primary" @click="handleSearch">
              {{ formBtn }}
            </el-button>
          </el-form-item>
          <el-form-item v-show="show">
            <el-button @click="$emit('reset')"> 重置 </el-button>
          </el-form-item>
        </span>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { deepClone } from '@/utils'
export default {
  props: {
    formTitle: {
      type: String
    },
    view: {
      type: Boolean,
      default: false
    },
    formBtn: {
      type: String,
      default: '查询'
    },
    loading: {
      //加载
      type: Boolean,
      default: false
    },
    isBtnSave: {
      type: Boolean,
      default: false
    },
    // 由inline属性决定form表单是普通表单，还是行内表单
    inline: {
      //排列方式
      type: Boolean,
      default: true
    },
    isSearch: {
      //是否展示搜索按钮
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    //form表单宽度
    formWidth: {
      type: String,
      default: '200px'
    },
    // 表单项
    formItems: {
      type: Array,
      default: []
    },
    // 表单数据
    formData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    // 用于控制该表单内组件的尺寸 medium / small / mini
    size: {
      type: String,
      default: 'medium'
    }
  },
  watch: {
    // formData是从父组件流过来的数据，首次加载时formData由undefined变为空对象被侦听器侦听(数据从父组件流过来以后变成空对象)，并赋值给该组件的tempFormData，此操作是浅拷贝，因此当组件上的tempFormItems发生改变时，父组件的formItems也同时发生了改变。所以我可以在父组件上拿到这个formItems进行查询操作
    formData: {
      handler(val) {
        this.tempFormData = val // 赋值给该组件内的数进行操作，不对props进行操作
      },
      deep: true,
      immediate: true
    },
    // formItems是表单项
    formItems: {
      handler(val) {
        this.tempFormItems = deepClone(val) // 赋值给该组件内的数进行操作，不对props进行操作
      },
      deep: true,
      immediate: true
    }
  },
  data() {
    return {
      show: true,
      tempFormData: {},
      tempFormItems: []
    }
  },
  methods: {
    // 远程搜索
    remoteMethod(value, type) {
      this.$emit('remoteMethod', value, type)
    },
    // 行内表单搜索事件
    handleSearch() {
      this.$emit('handleSearch')
    },
    // 清空form表单事件
    resetFields() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form--inline .el-form-item__label,
::v-deep .el-input--medium .el-input__inner {
  font-size: 12px;
}
</style>

<template>
  <div>
    <div class="ml_wrap">
      <div :span="3" ref="drug" class="ml_drug_lf">
        <div>中药物业</div>
      </div>
      <div class="ml_drug_rg">
        <div>
          <table border="1" class="ml_table">
            <tr>
              <th v-for="(item) in drugTableHeadA" :width="item.width" :key="item.id">{{item.label}}</th>
            </tr>
            <tr v-for="(item, index) in drugTableBodyAForm" :key="index">
              <td>{{index + 1}}</td>
              <td>
                <el-select
                  v-model="item.drugName"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="serachChinesData"
                  clearable
                  @change="drugChangeA"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in drugOptionsA"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </td>
              <td>
                <div>
                  <input v-model="item.takingAmount.num" class="ml_input" />
                  次/日
                  <input v-model="item.takingAmount.day" class="ml_input" />
                  片/日
                </div>
              </td>
              <td>
                <input v-model="item.takingWay" class="ml_input" />
              </td>
              <td>
                <el-date-picker v-model="item.startTime" type="date" placeholder="请选择开始日期"></el-date-picker>
              </td>
              <td>
                <el-date-picker v-model="item.endTime" type="date" placeholder="请选择结束日期"></el-date-picker>
              </td>
              <td>
                <input v-model="item.staggerTaking" class="ml_input" />
              </td>
              <td>
                <span
                  style="color: #dd6161; font-size: 13px;cursor: pointer;"
                  title="点击删除"
                  @click="handleDelData(index, '1')"
                >删除</span>
                &nbsp;
                <span
                  style="color: #409eff; font-size: 13px;cursor: pointer;"
                  title="点击添加"
                  @click="handleAddData('1')"
                >添加</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="ml_wrap">
      <div :span="3" ref="drug" class="ml_drug_lf">
        <div>西药物业</div>
      </div>
      <div class="ml_drug_rg">
        <div>
          <table border="1" class="ml_table">
            <tr>
              <th v-for="(item) in drugTableHeadB" :width="item.width" :key="item.id">{{item.label}}</th>
            </tr>
            <tr v-for="(item, index) in drugTableBodyBForm" :key="index">
              <td>{{index + 1}}</td>
              <td>
                <el-select
                  v-model="item.drugName"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="serachChinesData"
                  clearable
                  @change="drugChangeA"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in drugOptionsA"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </td>
              <td>
                <div>
                  <input v-model="item.takingAmount.num" class="ml_input" />
                  次/日
                  <input v-model="item.takingAmount.day" class="ml_input" />
                  片/日
                </div>
              </td>
              <td>
                <input v-model="item.takingWay" class="ml_input" />
              </td>
              <td>
                <el-date-picker v-model="item.startTime" type="date" placeholder="请选择开始日期"></el-date-picker>
              </td>
              <td>
                <el-date-picker v-model="item.endTime" type="date" placeholder="请选择结束日期"></el-date-picker>
              </td>
              <td>
                <input v-model="item.staggerTaking" class="ml_input" />
              </td>
              <td>
                <span
                  style="color: #dd6161; font-size: 13px;cursor: pointer;"
                  title="点击删除"
                  @click="handleDelData(index, '2')"
                >删除</span>
                &nbsp;
                <span
                  style="color: #409eff; font-size: 13px;cursor: pointer;"
                  title="点击添加"
                  @click="handleAddData('2')"
                >添加</span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div style="text-align: center; padding-top: 10px;">
      <el-button type="primary" @click="saveFrom">提交</el-button>
    </div>
  </div>
</template>

<script>
import { getDrugModel, drugColumnName } from "../utils/model";
export default {
  name: "kai",
  data() {
    return {
      drugTableHeadA: [...drugColumnName], // 中方药物头部栏
      drugTableBodyAForm: [{ ...getDrugModel() }], // 中方药物主体表单数据,默认指定一条数据
      drugTableHeadB: [...drugColumnName], // 西方药物头部栏
      drugTableBodyBForm: [{ ...getDrugModel() }], // 西方药物主体表单数据,默认指定一条数据
      initDrugOptionsA: [],
      drugOptionsA: [],
      initDrugOptionsB: [],
      drugOptionsB: [],
      drugOptions: [],
      loading: false,
      serachTimeFlag: true // 搜索防抖标记
    };
  },
  created() {
    // 页面初始化把俩个请求发出去
    this.requestDrugAll().then(res => {
      if (res[0] && res[0]["code"] == "0") {
        this.initDrugOptionsA = res[0]["data"];
        this.drugOptionsA = res[0]["data"];
      }

      if (res[1] && res[1]["code"] == "0") {
        this.initDrugOptionsB = res[1]["data"];
        this.drugOptionsB = res[1]["data"];
      }
    });
  },
  methods: {
    // 添加, type 为 1 是增加中方药物， 为2是增加西方药物, 默认值1
    handleAddData(type = "1") {
      if (type === "1") {
        this.drugTableBodyAForm.push({ ...getDrugModel() });
      } else if (type === "2") {
        this.drugTableBodyBForm.push({ ...getDrugModel() });
      }
    },
    // 删除, index是当前的索引，根据当前的索引去删除当前行, type 为 1 是增加中方药物， 为2是增加西方药物, 默认值1
    handleDelData(index, type = "1") {
      if (this.drugTableBodyAForm.length > 1 || this.drugTableBodyBForm.length > 1) {
        if (type === "1") {
          this.drugTableBodyAForm.splice(index, 1); // splice('删除的当前行', '删除的数量')
        } else {
          this.drugTableBodyBForm.splice(index, 1); // splice('删除的当前行', '删除的数量')
        }
      } else {
        this.$message("必须保留一条");
      }
    },

    // 请求药品的函数
    async requestDrug(type = "1", keyWord = "") {
      let self = this;
      let result = await self.$httpService({
        url: "/getDrugs",
        type: "POST",
        otherConfig: {
          data: {
            type,
            keyWord
          }
        }
      });

      return result;
    },

    // 西方药物搜索

    // 页面初始化，请求中药跟西药
    async requestDrugAll() {
      let result = await Promise.all([
        this.requestDrug(1),
        this.requestDrug(2)
      ]);
      return result;
    },

    serachChinesData(query) {
      if (this.serachTimeFlag) {
        this.serachTimeFlag = false;
        this.requestDrug("1", query).then(res => {
          if (res.code == "0") {
            this.drugOptionsA = res.data;
          }
        });
        setTimeout(() => {
          this.serachTimeFlag = true;
        }, 500);
      }
    },

    // 还原药物名称之前的数据
    initData(type = "1") {
      if (type == "1") {
        this.drugOptionsA = [...this.initDrugOptionsA];
      } else {
        this.drugOptionsB = [...this.initDrugOptionsB];
      }
    },
    drugChangeA(keyWord) {
      if (!keyWord) {
        this.initData("1");
      }
    },
    drugChangeB(keyWord) {
      if (!keyWord) {
        this.initData("2");
      }
    },

    saveFrom () {
        console.log(this.drugTableBodyAForm, '中药')
        console.log(this.drugTableBodyBForm, '西药')
    }
  }
};
</script>

<style lang="scss">
@for $i from 50 through 300 {
  .hy_height_#{$i} {
    height: #{$i}px;
  }
}
.hy_head {
  display: flex;
  border: 1px solid #ccc;
  border-left: none;
  span {
    flex: 1;
    border-right: 1px solid #ccc;
    text-align: center;
    &:last-child {
      border: none;
    }
  }
}

.ml_wrap {
  position: relative;
  width: 100%;
  .ml_drug_lf {
    width: 200px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ml_drug_rg {
    position: relative;
    left: 200px;
    width: calc(100% - 200px);
    right: 0;
    bottom: 0;
  }
}

.ml_drug_lf {
  border: 1px solid #333;
  border-right: none;
  height: 100%;
  line-height: 100%;
}

.ml_table {
  th {
    padding: 6px 0px;
  }
  td {
    text-align: center;
  }
  .ml_input {
    width: 40px;
    border: none;
    border-bottom: 1px solid #333;
    padding-bottom: 5px;
    text-align: center;
  }
}
</style>
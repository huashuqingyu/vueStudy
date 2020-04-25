
<template>
  <div>
    <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header" render-header="labelHead" highlight-current-row stripe @current-change="handleCurrentChange">

      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column>
      <el-table-column prop="F_KEY" label="主键" width="55" align="center" v-if="false"></el-table-column> <!--隐藏某列 -->
      <el-table-column prop="F_NAME" label="用户名" width="100"></el-table-column>
      <el-table-column prop="F_USERNAME" label="登录账号" width="100"></el-table-column>
      <el-table-column prop="F_PASSWORD" label="密码"></el-table-column>
      <el-table-column prop="DICF_ROLE" label="角色" width="100"></el-table-column>
      <el-table-column prop="F_REMARK" label="备注" width="100"></el-table-column>

      <!--      <el-table-column label="账户余额">-->
<!--        <template slot-scope="scope">￥{{scope.row.money}}</template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="头像(查看大图)" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <el-image-->
<!--                  class="table-td-thumb"-->
<!--                  :src="scope.row.thumb"-->
<!--                  :preview-src-list="[scope.row.thumb]"-->
<!--          ></el-image>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="状态" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag-->
<!--                  :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"-->
<!--          >{{scope.row.state}}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
                  type="text"
                  icon="el-icon-delete"
                  class="red"
                  @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
       </template>
     </el-table-column>
    </el-table>


    <!-- 编辑弹出框 form表单-->
    <el-dialog title="编辑" :visible.sync="editVisible" label-width="auto" width="40%" >

      <el-form  :model="getform" :inline="true" :rules="rules" class="saveForm" ref="saveForm" label-width="100px"><!-- 表单显示多行-->
        <el-form-item label="角色">
          <el-select v-model="getform.F_ROLE" placeholder="请选择" class="widthSet">
            <el-option
                    v-for="item in options"
                    :key="item.LABEL"
                    :label="item.LABEL"
                    :value="item.VALUE">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="姓名" prop="F_NAME">
          <el-input v-model="getform.F_NAME" placeholder="姓名" class="widthSet" ></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="F_REMARK">
          <el-input v-model="getform.F_REMARK" placeholder="备注" class="widthSet"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="resetForm('saveForm')">重 置</el-button>
          <el-button type="primary" @click="clearForm('saveForm')">清 空</el-button>
          <el-button type="primary" @click="saveEdit('saveForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ruleUtils from "../../utils/rules"
  export default {

    data() {
      return {
        tableData:[],
        header:[],
        editVisible:false,
        getform: {F_NAME:'',F_REMARK:'',F_ROLE:''},
        options:[],
        value: '',
        rules:{
          F_NAME: [
            { validator: ruleUtils.isEmpty, trigger: 'blur' },
          ]
        }
      }
    },
    created(){
       this.getData();
       this.getCombox();
    },
    methods:{
      indexMethod(index) { // index
        return index +1;
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {   // 选中的数据
        this.currentRow = val;
      },

      getData () {// 获取table数据
        this.$axios.get(this.$base + '/dataInfro/getTableByFieldPage', {
          params: {
            strTableName: "T_USER",
            strModel: "",
            strOrder: "F_NAME",
            intI: "1"
          }
        })
        .then((response) => {
          this.tableData = response.data;
        })

      },
      getCombox(){
        var comboxModel=[];
        comboxModel.push({field:"F_DICTYPE",value:"usertype",operator:"="});
        this.$axios.get(this.$base + '/combox/getComboxVue', {
          params: {
            strTableName: "DIC_BUS",
            strValue: "F_VALUE",
            strText: "F_TEXT",
            strModel: JSON.stringify(comboxModel),
            strOrder:"F_INDEX"
          }
        })
        .then((response) => {
          this.options = response.data;
        })

      },
      handleEdit(index, row) {// 编辑操作
        this.idx = index;
        console.log(row);
        this.getform = row;
        this.editVisible = true;
      },
      resetForm(formName) { // 重置表单
        this.$refs[formName].resetFields();
      },
      clearForm(){
        this.getform={F_NAME:'',F_REMARK:'',F_ROLE:''}
      },
      saveEdit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>

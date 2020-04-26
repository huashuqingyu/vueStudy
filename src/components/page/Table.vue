
<template>
  <div >
    <div class="dataTable" >
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>
            <i class="el-icon-lx-cascades"></i> 基础表格
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
        <div class="handle-box">
          <el-button
                  type="primary"
                  icon="el-icon-delete"
                  class="handle-del mr10"
                  @click="delAllSelection"
          >批量删除</el-button>
          <el-select v-model="query.address" placeholder="地址" class="handle-select mr10">
            <el-option key="1" label="广东省" value="广东省"></el-option>
            <el-option key="2" label="湖南省" value="湖南省"></el-option>
          </el-select>
          <el-input v-model="query.queryModel.F_NAME" placeholder="用户名" class="handle-input mr10"></el-input>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
      <el-table :data="tableData" border class="table" :height="tableHeight"
                ref="multipleTable"
                header-cell-class-name="table-header"
                render-header="labelHead"
                highlight-current-row stripe
                @current-change="handleCurrentChange">
        <el-table-column type="selection" width="55" fixed align="center"></el-table-column>
        <el-table-column type="index" label="序号" fixed width="50" :index="indexMethod"></el-table-column>
        <el-table-column prop="F_KEY" label="主键" width="55" align="center" v-if="false"></el-table-column> <!--隐藏某列 -->
        <el-table-column prop="F_NAME" label="用户名" width="100"></el-table-column>
        <el-table-column prop="F_USERNAME" label="登录账号" width="100"></el-table-column>
        <el-table-column prop="F_PASSWORD" label="密码"></el-table-column>
        <el-table-column prop="DICF_ROLE" label="角色" width="100"></el-table-column>
        <el-table-column prop="F_REMARK" label="备注" width="100"></el-table-column>
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
      <div class="pagination-bar">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handlePageChange"
                :current-page="query.page.currentPage"
                :page-sizes="[20, 50, 100]"
                :page-size="query.page.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
        </el-pagination>
      </div>
      </div>
    </div>
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
  import getData from "@/request/getData"
  export default {

    data() {
      return {
        tableData:[],
        tableHeight:635,
        header:[],
        editVisible:false,
        getform: {F_NAME:'',F_REMARK:'',F_ROLE:''},
        options:[],
        value: '',
        rules:{
          F_NAME: [
            { validator: ruleUtils.isEmpty, trigger: 'blur' },
          ]
        },
        query: {
          queryModel:{F_NAME: ''},
          page:{
            pageSize:20,// 显示数量
            currentPage:1//当前页
          }
        },
        totalCount:0, //总数
      }
    },
    created(){
       this.getData();
      //  this.getCombox();
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
      getData(){
        var data = {
          strTableName: "T_USER",
          strOrder: "F_NAME",
          query: this.query
        }

        getData.getTableByFiledPage(data)
          .then(res=>{
            console.log(res)
          })

        // if(data.type=="true"){
        //   this.tableData = response.data.tableData;
        //   this.totalCount = Number(response.data.countData[0].F_COUNT);
        // }else{

        // }
      },
      // getData () {// 获取table数据
      //   var  Query=[];
      //   Query.push(this.query);
      //   this.$axios.get(this.$base + '/dataInfro/getDataByPageFieldForVue', {
      //     params: {
      //       strTableName: "T_USER",
      //       strOrder: "F_NAME",
      //       QueryMoel:JSON.stringify(Query)
      //     }
      //   })
      //   .then((response) => {
      //     if(response.data.type=="true"){
      //       this.tableData = response.data.tableData;
      //       this.totalCount = Number(response.data.countData[0].F_COUNT);
      //     }
      //   })
      // },

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
      },
      handlePageChange(val){//页码改变
        this.query.page.currentPage=val;
        this.getData();
      },
      handleSizeChange(val){ //页面条数改变
        this.query.page.pageSize=val;
        this.getData();
      },  //删除全部
      delAllSelection(){

      },//查询
      handleSearch(){
        this.query.page.currentPage=1
        this.getData();
      }
    }
  }
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }
  .table {
    width: 100%;
    font-size: 14px;
  }
  .red {
    color: #ff0000;
  }
  .mr10 {
    margin-right: 10px;
  }
  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>

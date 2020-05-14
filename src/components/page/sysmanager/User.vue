<template>
<div class="container">
    <div class="queryModel">
        <el-input v-model="query.queryModel.F_NAME.value" placeholder="姓名"></el-input>
        <el-select v-model="query.queryModel.F_ROLE.value" placeholder="角色">
             <el-option label="-请选择-" value=""></el-option>
            <el-option v-for="item in roleOptions" :key="item.VALUE" :label="item.LABEL" :value="item.VALUE"></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button type="success" icon="el-icon-plus" @click="handleCreate">新建</el-button>
    </div>

    <div class="dataTable">
        <el-table :data="tableData" border class="table" :height="tableHeight" ref="multipleTable">
            <template v-for="item in dictableLabel">
                <el-table-column  v-if="item.F_ISVISIBLE ==='1'?true:false" :key="item.F_INDEX" align="center" :label="item.F_DESCRIPTION" :prop="item.F_ISDIC==='1'?'DIC'+item.F_FIELDNAME:item.F_FIELDNAME"></el-table-column>
            </template>
            <el-table-column label="操作">
                    <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <template>
                            <el-popconfirm
                            style="margin-left:10px"
                            title="删除用户后无法恢复，确认删除吗？"
                            icon="el-icon-warning"
                            @onConfirm="handleDelete(scope.$index, scope.row)"
                            >
                            <el-button slot="reference" 
                                size="mini"
                                type="danger"
                                >删除</el-button>
                            </el-popconfirm>
                        </template>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-bar">
            <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="query.page.currentPage" :page-sizes="[20, 50, 100]" :page-size="query.page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
            </el-pagination>
        </div>
    </div>

    <el-dialog :title="editTitle" :visible.sync="editVisible" label-width="auto" width="400px">
        <el-form :model="getform" :inline="true" :rules="rules" class="saveForm" ref="saveForm" label-width="100px">
            <el-form-item label="系统用户名" prop="F_USERNAME.value">
                    <el-input v-model="getform.F_USERNAME.value" placeholder="系统用户名" class="widthSet"></el-input>
            </el-form-item>
            <el-form-item label="名称" prop="F_NAME.value">
                    <el-input v-model="getform.F_NAME.value" placeholder="名称" class="widthSet"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="F_ROLE.value">
                <el-select v-model="getform.F_ROLE.value" placeholder="角色" class="widthSet">
                    <el-option v-for="item in roleOptions" :key="item.VALUE" :label="item.LABEL" :value="item.VALUE"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="getform.F_REMARK.value" placeholder="备注" class="widthSet"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button plain @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit('saveForm',editType)">保存</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            dictableLabel:[],
            tableHeight: 600,
            editVisible: false,
            editTitle: "",
            editType:"edit",
            roleOptions: [], //角色下拉框数据
            getform: {
                F_KEY: {value:''},
                F_USERNAME: {value:''},
                F_NAME: {value:''},
                F_ROLE: {value:''},
                F_REMARK: {value:''}
            },
            rules: {
                "F_USERNAME.value": {
                    validator: this.$ruleUtils.isEmpty,
                    trigger: 'blur'
                },  
                "F_NAME.value": {
                    validator: this.$ruleUtils.isEmpty,
                    trigger: 'blur'
                },  
                "F_ROLE.value": {
                    validator: this.$ruleUtils.isEmpty,
                    trigger: 'blur'
                }
            },
            query: {
                queryModel: {
                    F_NAME:{value:"",operat:"like"},
                    F_ROLE:{value:"",operat:"="}
                },
                page: {
                    pageSize: 20, // 显示数量
                    currentPage: 1 //当前页
                }
            },
            totalCount: 0, //总数
        }
    },
    mounted() {
        // 初始化table大小
        setTimeout(() => {
            this.tableHeight = this.$parent.$refs.content.offsetHeight - 190
        }, 50)
        // 监听浏览器变化
        window.onresize = () => {
            this.tableHeight = this.$parent.$refs.content.offsetHeight - 190
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.$getData.getComboxVue({field: "F_DICTYPE",value: "ROLE",operator: "="}).then(res => {
                this.roleOptions = res
            })
            this.$getData.getTableByField("T_USER").then(res => {
                this.dictableLabel = res;
                this.search() 
            })
        },
        // 查询
        search(){
            this.query.page.currentPage = 1
            this.$getData.getTableByFiledPage({strTableName: "T_USER",strOrder: "F_NAME",query: this.query}).then(res =>{
                if (res.type == "true") {
                    this.tableData = res.tableData;
                    this.totalCount = Number(res.countData[0].F_COUNT);
                }
            })
        },
        //页码改变
        handlePageChange(val) { 
            this.query.page.currentPage = val;
            this.getData();
        },
        //页面条数改变
        handleSizeChange(val) { 
            this.query.page.pageSize = val;
            this.getData();
        }, 
        // 删除用户
        handleDelete(index, row){
            this.$delData.doData({strTableName: "T_USER",strKeyValue: row.F_KEY,strValue: "1"}).then(res => {
                if(res.type == "true"){
                    this.$message.success("删除成功");
                    this.search()
                }
            })
        },
        handleEdit(index, row) { // 编辑操作
            this.getform = this.$saveData.bindData(this.getform,row);
            this.editTitle = "编辑";
            this.editType = "edit"
            this.editVisible = true;
        },
        // 新增dialog
        handleCreate() {
            this.editTitle = "新建";
            this.editType = "save";
            this.editVisible = true;
            this.clearFrom()
        },
        saveEdit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 保存
        saveEdit(formName, type) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    switch (type) {
                        case "edit":
                            this.$saveData.updateByField({strTableName: "T_USER",strKey: "F_KEY",save: this.getform}).then(res => {
                                if(res.type == "true"){
                                    this.$message.success(res.message);
                                    this.editVisible = false;
                                    this.search()
                                }else{
                                    this.$message.error(res.message);
                                }
                            })
                            break
                        case "save":
                            this.$saveData.saveData({strTableName: "T_USER",save: this.getform}).then(res=>{
                                if(res.type == "true"){
                                    this.$message.success(res.message);
                                    this.editVisible = false;
                                    this.search()
                                }else{
                                    this.$message.error(res.message);
                                }
                            })
                            break   
                    }
                } else {
                    return false;
                }
            });
        },
        clearFrom(){
            this.getform = {
                F_KEY: {value:''},
                F_USERNAME: {value:''},
                F_NAME: {value:''},
                F_ROLE: {value:''},
                F_REMARK: {value:''}
            }
        }
    }
}
</script>

<style scoped>
</style>

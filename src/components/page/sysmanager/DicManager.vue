<template>
    <div class="container">
        <div class="queryModel">
            <el-input v-model="query.F_DICNAME.value" placeholder="字典"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
            <el-button type="success" icon="el-icon-plus" @click="handleCreate">新建</el-button>
        </div>
        <div class="dataTable">
            <el-row :gutter="10">
                <el-col :span="3">
                    <el-table :data="busTableData" border :show-header="false"  class="table" :height="tableHeight" ref="multipleTable" @current-change="handleCurrentChange">
                        <el-table-column align="center"  prop="F_DICNAME"></el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="20">
                    <el-table :data="dictableDate" border class="table" :height="tableHeight">
                        <el-table-column v-for="item in dictableLabel" :key="item.F_INDEX" align="center" :label="item.F_DESCRIPTION" :prop="item.F_FIELDNAME"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <template>
                                    <el-popconfirm
                                    style="margin-left:10px"
                                    title="删除字典后无法恢复，确认删除吗？"
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
                </el-col>
            </el-row>
        </div>
        
        <el-dialog :title="editTitle" :visible.sync="editVisible" label-width="auto" width="400px">
            <el-form :model="getform" :inline="true" :rules="rules" class="saveForm" ref="saveForm" label-width="100px">
                <el-form-item label="名称" prop="F_TEXT.value">
                     <el-input v-model="getform.F_TEXT.value" placeholder="名称" class="widthSet"></el-input>
                </el-form-item>
                <el-form-item label="字典编号" prop="F_VALUE.value">
                    <el-input v-model="getform.F_VALUE.value" placeholder="字典编号" class="widthSet"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="getform.F_OTHER.value" placeholder="备注" class="widthSet"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="value">
                    <el-input v-model="getform.value" placeholder="备注" class="widthSet"></el-input>
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
            dictableLabel: [], //字典表头
            dictableDate: [], //字典数据
            busTableData: [], 
            currentData: {}, //选中数据
            tableHeight: 600, //表格高度
            editVisible: false, 
            editTitle: "",
            editType:"edit",
            getform: {
                F_KEY: {value:''},
                F_TEXT: {value:''},
                F_VALUE: {value:''},
                F_OTHER: {value:''},
                F_DICTYPE: {value:''}
            },
            rules: {
                "F_TEXT.value": {
                    validator: this.$ruleUtils.isEmpty,
                    trigger: 'blur'
                },
                "F_VALUE.value": {
                    validator: this.$ruleUtils.isEmpty,
                    trigger: 'blur'
                }
            },
            query:{
                F_DICNAME:{value:"",operat:"like"},
                F_FLAG:{value:"0",operat:"="}
            }
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
        // 选中行
        handleCurrentChange(val) {
            if(val) this.currentData = val
            let query = {
                "F_DICTYPE":{value: this.currentData.F_DICTYPE, operat:"="}
            }
            
            this.$getData.getDataAll({strTableName: "DIC_BUS",strOrder: "F_DICTYPE",query: query}).then(res => {
                this.dictableDate = res;
            })
        },
        // 获取数据
        getData() {
            this.$getData.getDataAll({strTableName:"SYS_DICBUS",strOrder: "F_DICTYPE",query: this.query}).then(res => {
                this.busTableData = res;
                this.dictableDate = []
            })
            this.$getData.getTableByField("DIC_BUS").then(res => {
                this.dictableLabel = res;
            })
        },
        // 编辑dialog
        handleEdit(index, row) { // 编辑操作
            this.getform = this.$saveData.bindData(this.getform,row);
            this.editTitle = "编辑";
            this.editType = "edit"
            this.editVisible = true;
        },
        // 删除
        handleDelete(index, row){
            this.$delData.doData({strTableName: "DIC_BUS",strKeyValue: row.F_KEY,strValue: "1"}).then(res => {
                if(res.type == "true"){
                    this.$message.success("删除成功");
                    this.handleCurrentChange()
                }
            })
        },
        // 新增dialog
        handleCreate() { 
            if(JSON.stringify(this.currentData) === '{}'){
                this.$message.warning("请先选择字典");
                return
            }
            this.clearFrom()
            this.getform.F_DICTYPE.value = this.currentData.F_DICTYPE
            this.editTitle = "新建";
            this.editType = "save";
            this.editVisible = true;
        },
        // 保存
        saveEdit(formName, type) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    switch (type) {
                        case "edit":
                            this.$saveData.updateByField({strTableName: "DIC_BUS",strKey: "F_KEY",save: this.getform}).then(res => {
                                if(res.type == "true"){
                                    this.$message.success(res.message);
                                    this.editVisible = false;
                                    this.handleCurrentChange()
                                }else{
                                    this.$message.error(res.message);
                                }
                            })
                            break
                        case "save":
                            this.$saveData.saveData({strTableName: "DIC_BUS",save: this.getform}).then(res=>{
                                if(res.type == "true"){
                                    this.$message.success(res.message);
                                    this.editVisible = false;
                                    this.handleCurrentChange()
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
            this.getform =  {
                F_KEY: {value:''},
                F_TEXT: {value:''},
                F_VALUE: {value:''},
                F_OTHER: {value:''},
                F_DICTYPE: {value:''}
            }
        }
    }
}
</script>

<style scoped>

</style>

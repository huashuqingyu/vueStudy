<template>
    <div class="container">
        <div class="queryModel">
            <el-input v-model="query.name.value" placeholder="字典"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
            <el-button type="success" icon="el-icon-plus" @click="handleCreate">新建</el-button>
        </div>
        <div class="dataTable">
            <el-row  :gutter="10">
                <el-col :span="3">
                    <el-table :data="busTableData" border :show-header="false"  class="table" :height="tableHeight" ref="multipleTable" highlight-current-row @current-change="handleCurrentChange">
                        <el-table-column align="center"  prop="F_DICNAME"></el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="20">
                    <el-table :data="dictableDate" :row-class-name="dictableDateRowClassName" border class="table" :height="tableHeight">
                        <el-table-column v-for="item in dictableLabel" :key="item.F_INDEX" align="center" :label="item.F_DESCRIPTION" :prop="item.F_FIELDNAME"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                            <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>`
                    </el-table>
                </el-col>
            </el-row>
        </div>
        
        <el-dialog :title="editTitle" :visible.sync="editVisible" label-width="auto" width="40%">
            <el-form :model="getform" :inline="true" :rules="rules" class="saveForm" ref="saveForm" label-width="100px">
                <el-form-item label="名称" prop="F_TEXT">
                     <el-input v-model="getform.F_TEXT" placeholder="名称" class="widthSet"></el-input>
                </el-form-item>
                <el-form-item label="字典编号" prop="F_VALUE">
                    <el-input v-model="getform.F_VALUE" placeholder="字典编号" class="widthSet"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="F_REMARK">
                    <el-input v-model="getform.F_OTHER" placeholder="备注" class="widthSet"></el-input>
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
import ruleUtils from "../../../utils/rules"
import getData from "@/request/getData"
import saveData from "@/request/saveData"
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
                F_TEXT: '',
                F_VALUE: '',
                F_OTHER: '',
                F_DICTYPE: ''
            },
            rules: {
                F_TEXT: {
                    validator: ruleUtils.isEmpty,
                    trigger: 'blur'
                },
                F_VALUE: {
                    validator: ruleUtils.isEmpty,
                    trigger: 'blur'
                }
            },
            query:{
                name:{field:"F_DICNAME", value:"",operat:"like"},
                flag:{field:"F_FLAG", value:"0",operat:"="}
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
        dictableDateRowClassName({row, rowIndex}){
            if (row.F_FLAG === 1) {
                return 'error-row';
            }
            return '';
        },
        handleCurrentChange(val) {
            this.currentData = val
            let data = {
                strTableName: "DIC_BUS",
                strOrder: "F_DICTYPE",
                query: [{field:"F_DICTYPE", value: val.F_DICTYPE, operat:"="}]
            }
            getData.getDataAll(data)
            .then(res => {
                this.dictableDate = res;
            })
        },
        getData() {
            let data = {
                strTableName: "SYS_DICBUS",
                strOrder: "F_DICTYPE",
                query: this.query
            }
            getData.getDataAll(data)
            .then(res => {
                this.busTableData = res;
                this.dictableDate = []
            })

            getData.getTableByField("DIC_BUS")
            .then(res => {
                this.dictableLabel = res;
            })
        },
        handleEdit(index, row) { // 编辑操作
            this.getform = row;
            this.editTitle = "编辑";
            this.editType = "edit"
            this.editVisible = true;
        },
        handleCreate() { 
            if(JSON.stringify(this.currentData) === '{}'){
                this.$message.warning("请先选择字典");
                return
            }
            this.getform.F_DICTYPE = this.currentData.F_DICTYPE
            this.editTitle = "新建";
            this.editType = "save"
            this.editVisible = true;
        },
        saveEdit(formName, type) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    switch (type) {
                        case "edit":
                            let data = {
                                strTableName: "DIC_BUS",
                                strKey: "F_KEY",
                                save: this.getform
                            }
                            saveData.updateByField(data)
                            .then(res => {
                                if(res.type == "true"){
                                this.$message.success(res.message);
                                    this.editVisible = false;
                                }else{
                                    this.$message.error(res.message);
                                }
                            })
                            break
                        case "save":
                            console.log("save")    
                    }

                    
                } else {
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>

</style>

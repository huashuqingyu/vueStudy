<template>
<div>
    <div class="dataTable">
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.name.value" placeholder="用户名" class="handle-input mr10"></el-input>
                <!-- <el-select v-model="query.F_ROLE.data22" filterable placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select> -->
                <el-button type="primary" icon="el-icon-search" @click="getData">搜索</el-button>
            </div>
            <el-table :data="tableData" border class="table" :height="tableHeight" ref="multipleTable" header-cell-class-name="table-header" render-header="labelHead" highlight-current-row stripe @current-change="handleCurrentChange">
                <el-table-column prop="F_NAME" label="用户名" width="100"></el-table-column>
                <el-table-column prop="F_USERNAME" label="登录账号" width="100"></el-table-column>
                <el-table-column prop="DICF_ROLE" label="角色" width="100"></el-table-column>
                <el-table-column prop="F_REMARK" label="备注" width="100"></el-table-column>
            </el-table>
        </div>
    </div>
    <!-- 编辑弹出框 form表单-->
    <el-dialog title="编辑" :visible.sync="editVisible" label-width="auto" width="40%">

        <el-form :model="getform" :inline="true" :rules="rules" class="saveForm" ref="saveForm" label-width="100px">
            <!-- 表单显示多行-->
            <el-form-item label="角色">
                <el-select v-model="getform.F_ROLE" placeholder="请选择" class="widthSet">
                    <el-option v-for="item in options" :key="item.LABEL" :label="item.LABEL" :value="item.VALUE">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="姓名" prop="F_NAME">
                <el-input v-model="getform.F_NAME" placeholder="姓名" class="widthSet"></el-input>
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
import ruleUtils from "../../../utils/rules"
import getData from "@/request/getData"
export default {
    data() {
        return {
            tableData: [],
            tableHeight: 600,
            header: [],
            editVisible: false,
            getform: {
                F_NAME: '',
                F_REMARK: '',
                F_ROLE: ''
            },
            options: [],
            rules: {
                F_NAME: [{
                    validator: ruleUtils.isEmpty,
                    trigger: 'blur'
                }, ]
            },
            query:{
                name:{field:"F_NAME", value:"",operat:"like"}
            },
            options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }],
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
        //  this.getCombox();
    },
    methods: {
        handleCurrentChange(val) { // 选中的数据
            this.currentRow = val;
        },
        getData() {
            let data = {
                strTableName: "T_USER",
                strOrder: "F_NAME",
                query: this.query
            }
            getData.getTableByFieldAll(data)
            .then(res => {
                this.tableData = res;
            })

        },
        getCombox() {
            var comboxModel = [];
            comboxModel.push({
                field: "F_DICTYPE",
                value: "usertype",
                operator: "="
            });

            this.$axios.get(this.$base + '/combox/getComboxVue', {
                    params: {
                        strTableName: "DIC_BUS",
                        strValue: "F_VALUE",
                        strText: "F_TEXT",
                        strModel: JSON.stringify(comboxModel),
                        strOrder: "F_INDEX"
                    }
                })
                .then((response) => {
                    this.options = response.data;
                })

        },
        handleEdit(index, row) { // 编辑操作
            this.idx = index;
            console.log(row);
            this.getform = row;
            this.editVisible = true;
        },
        resetForm(formName) { // 重置表单
            this.$refs[formName].resetFields();
        },
        clearForm() {
            this.getform = {
                F_NAME: '',
                F_REMARK: '',
                F_ROLE: ''
            }
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
        handlePageChange(val) { //页码改变
            this.query.page.currentPage = val;
            this.getData();
        },
        handleSizeChange(val) { //页面条数改变
            this.query.page.pageSize = val;
            this.getData();
        }, //删除全部
        delAllSelection() {

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

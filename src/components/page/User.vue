<template>
<el-card class="box-card">
    <div class="tools-bar">
        <el-button type="success" icon="el-icon-plus" size="small" @click="dialogVisible = true;dialogTitle='新增用户'">新增用户</el-button>
    </div>
    <div>
        <el-table ref="singleTable" height:800 :data="userList" border highlight-current-row style="width: 100%">
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="F_USERNAME" label="登录名" min-width="120">
            </el-table-column>
            <el-table-column prop="F_NAME" label="真实姓名" min-width="120">
            </el-table-column>
            <el-table-column prop="F_ROLE" label="权限" min-width="210">
            </el-table-column>
            <el-table-column prop="F_YYS" label="营业所" min-width="200">
            </el-table-column>
            <el-table-column prop="F_ZGS" label="总公司" width="250">
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="170">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="pagination-bar">
        <el-pagination layout="prev, pager, next" :page-size=2 :total="totalCount" @current-change="handleCurrentChange">
        </el-pagination>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" @close="onDialogClose()">
        <el-form ref="dataForm" :rules="rules" :model="dataForm" label-width="80px">
            <el-form-item label="用户名" prop="loginName">
                <template v-if="dialogTitle=='修改用户信息'">{{dataForm.loginName}}</template>
                <el-input v-else v-model="dataForm.loginName" placeholder="登录名"></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" prop="name">
                <el-input v-model="dataForm.name" placeholder="真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="mobile">
                <el-input v-model="dataForm.mobile" placeholder="权限"></el-input>
            </el-form-item>
            <el-form-item label="营业所" prop="address">
                <el-input v-model="dataForm.address" placeholder="营业所"></el-input>
            </el-form-item>
            <el-form-item label="总公司" prop="email">
                <el-input v-model="dataForm.email" placeholder="总公司"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="info" @click="onDialogSubmit()" v-if="dialogTitle=='修改用户信息'">保存</el-button>
            <el-button type="primary" @click="onDialogSubmit()" v-else>立即创建</el-button>
        </div>
    </el-dialog>
</el-card>
</template>

<script>
export default {
    data() {
        return {
            totalRecord: 0,
            pageSize: 10,
            dialogVisible: false,
            dialogTitle: '新增用户',
            roles: [{
                    id: "001",
                    roleName: '超级管理员'
                },
                {
                    id: "002",
                    roleName: '普通用户'
                }
            ],
            defaultTreeProps: {
                children: 'childPermList',
                label: 'permissionName'
            },
            rules: {
                loginName: [{
                    required: true,
                    message: '登录名不能为空',
                    trigger: 'blur'
                }],
                name: [{
                    required: true,
                    message: '真实姓名不能为空',
                    trigger: 'blur'
                }],
                mobile: [{
                    required: true,
                    message: '联系电话不能为空',
                    trigger: 'blur'
                }],
                email: [{
                    required: true,
                    message: '请输入邮箱地址',
                    trigger: 'blur'
                }]
            },
            dataForm: {
                id: '',
                loginName: '',
                tempRoleIds: [],
                roleIds: '',
                name: '',
                mobile: '',
                address: '',
                email: ''
            },
            userList: [],
            totalCount: 0
        }
    },
    created() {
        this.initList(1)
    },
    methods: {
        async initList(page) {
            const userList = await this.$axios.get(this.$base + '/dataInfro/getTableByFieldPage', {
                params: {
                    strTableName: "T_USER",
                    strModel: "",
                    strOrder: "F_KEY",
                    intI: page
                }
            })
            this.userList = userList.data.page
            this.totalCount = userList.data.count[0].F_COUNT
        },
        handleStatus(row) {},
        statusFormat(row, column, cellValue) {
            return {
                '0': '停用',
                '1': '启用'
            } [cellValue] || ''
        },
        onDialogClose() {
            this.dataForm.tempRoleIds = []
            this.$refs.dataForm.resetFields()
        },
        handleSizeChange(val) {
            this.pageSize = val
        },
        handleCurrentChange(val) {

            this.initList(val)
        },
        handleChangeStatus(index, row) {},
        handleResetPwd(index, row) {
            this.$confirm('确认重置该用户的登录密码？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {})
        },
        handleEdit(index, row) {
            this.dialogVisible = true
            this.dialogTitle = '修改用户信息'
            this.dataForm.tempRoleIds = []
            console.log(index, row)
        },
        onDialogSubmit() {}
    }
}
</script>

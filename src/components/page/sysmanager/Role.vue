<template>
    <div class="container">
        <div class="queryModel">
            <el-input v-model="query.F_TEXT.value" placeholder="角色"></el-input>
            <el-button icon="el-icon-search" @click="getData">搜索</el-button>
            <el-button type="success" icon="el-icon-success" @click="saveCheck">保存</el-button>
        </div>
        <div class="dataTable">
            <el-row :gutter="10">
                <el-col :span="3">
                    <el-table :data="busTableData" highlight-current-row border :show-header="false"  class="table" :height="tableHeight" ref="multipleTable" @current-change="handleCurrentChange">
                        <el-table-column align="center"  prop="F_TEXT"></el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="20">
                    <el-tree
                        :data="treeData"
                        ref="checkTree"
                        show-checkbox
                        node-key="id"
                        >
                    </el-tree>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import {createMenuTreeFunc} from '../../common/menu/main';
export default {
    data() {
        return {
            tableHeight: 600, //表格高度
            busTableData: [], 
            currentData: {}, //选中数据
            query:{
                F_TEXT:{value:"",operat:"like"}
            },
            treeData: [],
           
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
            let query = {"F_ROLEID":{value: this.currentData.F_VALUE, operat:"="}}
            this.$getData.getDataAll({strTableName: "SYS_ROLE",strOrder: "F_ROLEID",query: query}).then(res => {
                if(res.length > 0){
                    var menus = res[0].F_MENUS.split(",");
                    this.$refs.checkTree.setCheckedKeys(menus);
                }
            })
        },
        // 获取数据
        getData() {
            this.treeData = createMenuTreeFunc()

            this.$getData.getDataAll({strTableName:"DIC_BUS",strOrder: "F_VALUE",query: this.query}).then(res => {
                this.busTableData = res;
            })
        },
        saveCheck(data, checked, indeterminate){
            if(JSON.stringify(this.currentData) === '{}'){
                this.$message.warning("请先选择角色");
                return
            }
            var checkNode =  this.$refs.checkTree.getCheckedNodes(true,true);
            this.$http.get('/role/save', {roleId: this.currentData.F_VALUE, checkNodes: JSON.stringify(checkNode)}).then(res =>{
                if(res.success){
                    this.$message.success(res.msg);
                }else{
                     this.$message.error(res.msg);
                }
            })
        }
    }
}
</script>

<style scoped>

</style>

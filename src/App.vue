<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import "./assets/css/main.css";
  @import "./assets/css/color-dark.css";
  .widthSet{
    width: 200px;
  }
  .queryModel{
    display: flex;
    flex-direction: row;
    & .el-input{
      width: 150px;
      margin-right: 8px;
    }
    & .el-button{
      width: 80px;
    }
  }
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
  .el-table .error-row {
    background: #F56C6C;
  }
</style>

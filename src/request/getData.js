import http from "./http"

const service = {
    /**
     * 查询表头从SYS_FIELD表
     * 
     * @param: 表名
     */
    getTableByField: function(param){
        var promise = http.get('/dataInfro/getTableByField', {
            strTableName: param
        })
        return promise
    },

    /**
     * 分页查询
     * 
     * @param {
     * 
     *  query: {
     *    queryModel:{F_NAME: ''},
     *    page:{
     *      pageSize:20,// 显示数量
     *       currentPage:1//当前页
     *     }
     *   }
     *  } params
     */
    getTableByFiledPage: function (params) {
        var query = []
        for(var key in params.query.queryModel){
            if(params.query.queryModel[key].value){
                query.push({field:key, value:params.query.queryModel[key].value, operator:params.query.queryModel[key].operat})
            }
        }
        var promise = http.get('/dataInfro/getDataByPageFieldForVue', {
            strTableName: params.strTableName,
            queryModel: JSON.stringify(query),
            pageModel: JSON.stringify(params.query.page),
            strOrder: params.strOrder
        })
        return promise
    },

    /**
     * 直接查询数据
     * 
     * @param {
     *      query:[{field:"F_DICTYPE", value: val.F_DICTYPE, operat:"="}]
     * } params 
     */
    getDataAll: function(params) {
        var query = []
        for(var key in params.query){
            query.push({field:key, value:params.query[key].value, operator:params.query[key].operat})
        }
        var promise = http.get('/dataInfro/getDataAll', {
            strTableName: params.strTableName,
            strModel: JSON.stringify(query),
            strOrder: params.strOrder
        })
        return promise
    },

    /**
     * 查询所有数据
     * 
     * @param {
     *     query:[{field:"F_DICTYPE", value: val.F_DICTYPE, operat:"="}]
     * } params 
     */
    getTableByFieldAll: function(params) {
        var query = []
        for(var key in params.query){
            query.push({field:params.query[key].field, value:params.query[key].value, operator:params.query[key].operat})
        }
        var promise = http.get('/dataInfro/getTableByFieldAll', {
            strTableName: params.strTableName,
            strModel: JSON.stringify(query),
            strOrder: params.strOrder
        })
        return promise
    },

    /**
    * 查询所有数据
    * 
    * @param {
    *     query:[{field:"F_DICTYPE", value: val.F_DICTYPE, operat:"="}]
    * } params 
    */
    getComboxVue: function(param) {
        var query = [param]
        var promise = http.get('/combox/getComboxVue', {
            strTableName: "DIC_BUS",
            strValue: "F_VALUE",
            strText: "F_TEXT",
            strModel: JSON.stringify(query),
            strOrder: "F_INDEX"
        })
        return promise
    }
}

export default service;

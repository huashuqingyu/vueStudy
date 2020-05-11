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
        var query = [params.query];
        var promise = http.get('/dataInfro/getDataByPageFieldForVue', {
            strTableName: params.strTableName,
            QueryMoel: JSON.stringify(query),
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
            query.push({field:params.query[key].field, value:params.query[key].value, operator:params.query[key].operat})
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
    }
}

export default service;

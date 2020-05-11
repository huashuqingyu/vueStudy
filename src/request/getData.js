import http from "./http"

const service = {
    getTableByFiledPage: function (params) {
        var Query = [params.query];
        var promise = http.get('/dataInfro/getDataByPageFieldForVue', {
            strTableName: params.strTableName,
            QueryMoel: JSON.stringify(Query),
            strOrder: params.strOrder
        })
        return promise
    },
    getDataAll: function(params) {
        var Query = [params.query];
        var promise = http.get('/dataInfro/getDataAll', {
            strTableName: params.strTableName,
            QueryMoel: JSON.stringify(Query),
            strOrder: params.strOrder
        })
        return promise
    },
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

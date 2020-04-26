import http from "./http"

const service = {
    getTableByFiledPage: function (params) {
        var Query = [params.query];
        var promise = http.get('/dataInfro/getDataByPageFieldForVue', {
            strTableName: params.strTableName,
            strOrder: params.strOrder,
            QueryMoel: JSON.stringify(Query)
        })
        return promise
    }
}

export default service;

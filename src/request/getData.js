import http from "./http"

const service = {
    getTableByFiledPage: function (params) {
        console.log(params)
        var Query = [];
        Query.push(params.query);
        
        var promise = http.get('http://127.0.0.1:1001/dataInfro/getDataByPageFieldForVue', {
            strTableName: params.strTableName,
            strOrder: params.strOrder,
            QueryMoel: JSON.stringify(Query)
        })
        return promise

    }
}

export default service;

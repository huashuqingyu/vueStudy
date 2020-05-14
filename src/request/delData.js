import http from "./http"

const service = {
    
    /**
     * 逻辑删除
     * 
     * @param {
     *  strTableName 表名
     *  strKeyValue  主键值（F_KEY的值）
     *  strValue     F_FLAG 更改之后的值
     * } params 
     */
    doData: function(params){
        var promise = http.get('/delData/doData', {
            strTableName: params.strTableName,
            strKeyValue: params.strKeyValue,
            strValue: params.strValue
        })
        return promise
    }
}

export default service;

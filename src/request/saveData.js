import http from "./http"

const service = {
    /**
     * 直接更新
     * 
     * @param {
     *  save:[{field:value}]
     * } params 
     */
    updateByField: function(params){
        var model = new Object
        for(var key in params.save){
            model[key] = params.save[key]
        }
        var save = [model]
        var promise = http.get('/dataUpdateDo/updateByField', {
            strModel: JSON.stringify(save),
            strTableName: params.strTableName,
            strKey: params.strKey
        })
        return promise
    },

    saveData: function(params){
        var model = new Object
        for(var key in params.save){
            model[key] = params.save[key]
        }
        var save = [model]
        var promise = http.get('/dataInsertDo/insert', {
            strTableName: params.strTableName,
            strModel: JSON.stringify(save)
        })
        return promise
    }
}

export default service;

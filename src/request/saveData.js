import http from "./http"

const service = {
    /**
     * 绑定数据
     * 
     * @param {} param 
     */
    bindData: function(form,param){
        for(var formKey in form){
            for(var paramKey in param){
                if(formKey === paramKey){
                    form[formKey].value = param[paramKey]
                }
            }
        }
       
        return form
    },
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
            model[key] = params.save[key].value
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
        var save = []
        for(var key in params.save){
            if(key === "F_KEY"){
                continue
            }
            var model = new Object
            model["field"] = key
            model["value"] = params.save[key].value ? params.save[key].value:""
            model["create"] = params.save[key].create ? params.save[key].create: "0"
            model["intLength"] = params.save[key].intLength ? params.save[key].intLength: "0"
            model["repeat"] = params.save[key].repeat ? params.save[key].repeat: "1"
            model["description"] = params.save[key].description? params.save[key].description: ""
            save.push(model)
        }
        var promise = http.get('/dataInsertDo/insert', {
            strTableName: params.strTableName,
            strModel: JSON.stringify(save)
        })
        return promise
    }
}

export default service;

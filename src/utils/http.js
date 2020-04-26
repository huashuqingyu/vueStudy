
// 在http.js中引入axios
import axios from 'axios'; // 引入axios
// import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据

axios.defaults.baseURL = 'http://127.0.0.1:1001';
const service={
 get:function(url, params){
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
        })    
    });
},

post:function (url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, params)
        .then(res => {
            resolve(res.data);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
},
del:function (url, params) {
    return new Promise((resolve, reject) => {
         axios.delete(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
        })    
    });
}
}
export default service;



import axios from 'axios'; // 引入axios

// axios.defaults.baseURL = 'http://127.0.0.1:1001';

const service = {
    get: function (url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, {
                params: params
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data)
            })
        });
    },

    post: function (url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
                .then(res => {
                    resolve(res.data);
                })
                .catch(err => {
                    reject(err.data)
                })
        });
    },
    del: function (url, params) {
        return new Promise((resolve, reject) => {
            axios.delete(url, {
                params: params
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data)
            })
        });
    }
}
export default service;


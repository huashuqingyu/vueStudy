
const service = {
    isEmpty : (rule, value, callback) => {
        if (!value) {
            return  callback(new Error('不能为空!'));
        }else{
            callback();
        }
    },
    isInt: (rule, value, callback) => {
        if (isNaN(parseInt(value))) {
            return  callback(new Error('请输入整数'));
        }else{
            callback();
        }
    },
    isFloat: (rule, value, callback) => {
        if (isNaN(parseFloat(value))) {
            return  callback(new Error('请输入数字值'));
        }else{
            callback();
        }
    },
}

export default service;

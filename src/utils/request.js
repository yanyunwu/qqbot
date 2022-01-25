const axios = require('axios').default;
/**
 * 请求封装模块
*/

const service = axios.create({
    timeout: 10000
});

function request(config) {
    return new Promise(resolve => {
        service(config).then(value => resolve(value.data)).catch(err => console.log(err))
    });
}

module.exports = request;

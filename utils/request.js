const axios = require('axios').default;


let instance = axios.create({
    baseURL: 'https://v2.alapi.cn/api',
    timeout: 5000
});

instance.interceptors.request.use((config) => {
    if (!config.params) config.params = {};
    config.params.token = 'OSauMnzvmctNHe2n';
    return config;
});

module.exports = function (config) {
    return new Promise((resolve, reject) => {
        instance(config).then(value => {
            resolve(value.data);
        }, reject);
    });
};
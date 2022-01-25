const request = require('../utils/request');

// 聊天api
exports.chat = function (msg) {
    return request({
        url: 'http://api.qingyunke.com/api.php',
        params: {
            key: 'free',
            appid: 0,
            msg: msg
        }
    })
}
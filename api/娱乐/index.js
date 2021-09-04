const request = require('../../utils/request');

exports.dog = function () {
    return request({
        url: '/dog',
        method: 'get',
    });
}

exports.soul = function () {
    return request({
        url: '/soul',
        method: 'get',
    });
}

exports.acg = function () {
    return request({
        url: 'acg',
        method: 'get',
        params: {
            format: 'json'
        }
    })
}
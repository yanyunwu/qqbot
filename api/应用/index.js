const request = require('../../utils/request');
// 查询天气
exports.weather = function (location) {
    return request({
        url: '/weather/hourly',
        method: 'get',
        params: {
            location
        }
    });
}
// 搜索歌曲
exports.music = function (keyword) {
    return request({
        url: '/music/search',
        method: 'get',
        params: {
            keyword,
            type: 1
        }
    });
}
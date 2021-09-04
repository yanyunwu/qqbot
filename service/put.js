const { query } = require('../utils/mysql');
const now = require('../utils/date');


// 修改个人积分
exports.putPoint = function (id, point) {
    return new Promise((resolve, reject) => {
        let sql = 'UPDATE user SET point=? WHERE (id=?)';
        query(sql, [point, id]).then(value => resolve(value), reason => reject(reason));
    });
}
//修改签到日期
exports.putQd = function (id) {
    return new Promise(resolve => {
        let sql = 'UPDATE user SET qdtime=? WHERE (id=?)';
        let nowdate = now();
        query(sql, [nowdate, id]).then(resolve);
    });
}
//修改权限
exports.putPower = function (id, power) {
    power = parseInt(power);
    return new Promise(resolve => {
        let sql = 'UPDATE user SET power=? WHERE (uid=?)';
        query(sql, [power, id]).then(resolve);
    });
}
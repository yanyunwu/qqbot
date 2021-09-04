const { query } = require('../utils/mysql');
const { createAccount } = require('./post');


// 获取个人信息
exports.userInfo = function (gid, uid) {
    return new Promise((resolve, reject) => {
        gid = String(gid); uid = String(uid);
        let sql = 'SELECT * FROM user WHERE gid=? AND uid=?';
        query(sql, [gid, uid]).then(value => {
            if (!value.length) {
                createAccount(gid, uid).then(value => {
                    query(sql, [gid, uid]).then(value => resolve(value), reason => reject(reason));
                }, reason => reject(reason));
            } else {
                resolve(value);
            }
        }, reason => {
            reject(reason);
        });
    });
}
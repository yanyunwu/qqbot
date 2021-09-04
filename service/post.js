const { query } = require('../utils/mysql');

// 创建账户
exports.createAccount = function createAccount(gid, uid) {
    return new Promise((resolve, reject) => {
        gid = String(gid); uid = String(uid);
        let sql = 'INSERT INTO user (gid, uid, point) VALUES (?, ?, 50)';
        query(sql, [gid, uid]).then(value => {
            resolve(value);
        }, reason => {
            reject(reason);
        });
    });
}
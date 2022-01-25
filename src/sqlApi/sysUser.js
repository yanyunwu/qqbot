const { runSql, getSql } = require('../utils/sqlite3');

// 查询用户
exports.getSysUser = function (qq) {
    qq = String(qq);
    return getSql({
        sql: 'SELECT * FROM sys_user WHERE qq_account=?',
        params: [qq]
    });
}
const { runSql, getSql } = require('../utils/sqlite3');

// 查询配置
exports.getConfig = function (key) {
    key = String(key);
    return getSql({
        sql: 'SELECT * FROM config WHERE key=?',
        params: [key]
    });
}

// 修改配置
exports.setConfig = function (key, value) {
    key = String(key);
    value = String(value)
    return runSql({
        sql: 'UPDATE config SET value=? WHERE key=?',
        params: [value, key]
    });
}
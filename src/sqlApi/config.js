const { runSql, getSql } = require('../utils/sqlite3');

// 查询配置
exports.getConfig = function (key, gid) {
    key = String(key);
    return getSql({
        sql: 'SELECT * FROM config WHERE key=? AND gid=?',
        params: [key, gid]
    });
}

// 修改配置
exports.setConfig = function (key, value, gid) {
    key = String(key);
    value = String(value)
    gid = String(gid)
    return getSql({
        sql: 'SELECT * FROM config WHERE key=? AND gid=?',
        params: [key, gid]
    }).then(value2 => {
        console.log(value2);
        if (value2.length) {
            return runSql({
                sql: 'UPDATE config SET value=? WHERE key=? AND gid=?',
                params: [value, key, gid]
            });
        } else {
            return runSql({
                sql: 'REPLACE INTO config(key,value,gid) VALUES(?,?,?)',
                params: [key, value, gid]
            });
        }
    })
}
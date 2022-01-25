const { runSql, getSql } = require('../utils/sqlite3');

// 添加指令
exports.setAuth = function (title) {
    return runSql({
        sql: 'INSERT INTO authority(title) VALUES(?)',
        params: [title]
    });
}

// 删除指令by title
exports.delAuthByTitle = function (title) {
    return runSql({
        sql: 'DELETE FROM authority WHERE title=?',
        params: [title]
    });
}

// 获取所有指令
exports.getAllAuth = function () {
    return getSql({
        sql: 'SELECT * FROM authority',
        params: []
    });
}
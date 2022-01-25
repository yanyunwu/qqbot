const { runSql, getSql } = require('../utils/sqlite3');

// 添加角色
exports.setAuth = function (title) {
    return runSql({
        sql: 'INSERT INTO authority(title) VALUES(?)',
        params: [title]
    });
}

// 删除角色by title
exports.delAuthByTitle = function (title) {
    return runSql({
        sql: 'DELETE FROM authority WHERE title=?',
        params: [title]
    });
}
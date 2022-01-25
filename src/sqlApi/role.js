const { runSql, getSql } = require('../utils/sqlite3');


// 添加角色
exports.setRole = function (title) {
    return runSql({
        sql: 'INSERT INTO role(title) VALUES(?)',
        params: [title]
    });
}

// 删除角色by title
exports.delRoleByTitle = function (title) {
    return runSql({
        sql: 'DELETE FROM role WHERE title=?',
        params: [title]
    });
}

// 修改角色名
exports.updRoleTitleByTitle = function (title, newTitle) {
    return runSql({
        sql: 'UPDATA role SET title=? WHERE title=?',
        params: [newTitle, title]
    });
}

// 添加角色权限
exports.setRoleAuthByTitle = function (title, authTitle) {
    return runSql({
        sql: `INSERT INTO role_auth(rid,aid) VALUES(
            (SELECT rid FROM role WHERE title=?),
            (SELECT aid FROM authority WHERE title=?)
            )`,
        params: [title, authTitle]
    });
}

// 删除角色权限
exports.delRoleAuthByTitle = function (title, authTitle) {
    return runSql({
        sql: `DELETE FROM role_auth WHERE rid=
            (SELECT rid FROM role WHERE title=?) AND aid=
            (SELECT aid FROM authority WHERE title=?)
            )`,
        params: [title, authTitle]
    });
}


// 查询所有角色及权限
exports.getAllRoleAuth = function () {
    return getSql({
        sql: `SELECT title FROM role`,
        params: []
    });
}
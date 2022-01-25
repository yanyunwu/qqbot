const { runSql, getSql } = require('../utils/sqlite3');

// 查询用户
exports.getUser = function (qq, gid) {
    qq = String(qq);
    gid = String(gid);
    return getSql({
        sql: 'SELECT * FROM user WHERE qq_account=? AND qq_group=?',
        params: [qq, gid]
    });
}

// 存储用户
exports.setUser = function (qq, gid) {
    qq = String(qq);
    gid = String(gid);
    return runSql({
        sql: 'INSERT INTO user(qq_account,qq_group) VALUES(?,?)',
        params: [qq, gid]
    });
}

// 添加指令
exports.setOrder = function (title, ident) {
    return runSql({
        sql: 'INSERT INTO authority(title,identifier) VALUES(?,?)',
        params: [title, ident]
    });
}

// 添加角色
exports.setRole = function (title) {
    return runSql({
        sql: 'INSERT INTO role(title) VALUES(?)',
        params: [title]
    });
}

// 设置用户角色
exports.setUserRole = function (uid, title) {
    return getSql({
        sql: 'SELECT rid FROM role WHERE title=?',
        params: [title]
    }).then(value => {
        if (value.length) {
            return runSql({
                sql: 'INSERT INTO user_role(uid,rid) VALUES(?,?)',
                params: [uid, value[0].rid]
            });
        }

        return Promise.reject(null)
    })
}



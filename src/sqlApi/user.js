const { runSql, getSql } = require('../utils/sqlite3');


// 查询用户是否拥有权限
exports.checkUserAllAuth = function (qq, gid, title) {
    qq = String(qq);
    gid = String(gid);
    return getSql({
        sql: `SELECT au.title FROM user_role AS ur
        LEFT JOIN role_auth AS ra ON ra.rid=ur.rid
        LEFT JOIN authority AS au ON au.aid=ra.aid
        WHERE uid=(SELECT uid FROM user WHERE qq_account=? AND qq_group=?) AND au.title=?`,
        params: [qq, gid, title]
    })
}

// 删除用户角色
exports.delUserRole = function (qq, title) {
    qq = String(qq)
    return runSql({
        sql: `DELETE FROM user_role WHERE uid=
        (SELECT uid FROM user WHERE qq_account=?) AND
        rid=(SELECT rid FROM role WHERE title=?)`,
        params: [qq, title]
    });

}
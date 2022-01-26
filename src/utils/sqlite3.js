const { Database } = require('sqlite3').verbose();
const path = require('path')

// 获取数据库连接
const getDatabase = () => {
    return new Promise(resolve => {
        const db = new Database(path.resolve(__dirname, '../database/qqbot.db'), function () {
            resolve(db);
        });
    });
}

// 增删改sql
function runSql(options = {}) {
    let opts = options.params || [];
    return new Promise(resolve => {
        const run = db => db.run(options.sql, opts, () => resolve(this))
        getDatabase().then(run).catch(err => console.log(err));
    })
}

// 查询sql
function getSql(options = {}) {
    let opts = options.params || [];
    return new Promise(resolve => {
        const all = db => db.all(options.sql, opts, (err, rows) => resolve(rows))
        getDatabase().then(all).catch(err => console.log(err))
    })
}

module.exports = { runSql, getSql };


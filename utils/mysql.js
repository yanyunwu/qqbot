const mysql = require('mysql');

const pool = mysql.createPool({
    host: '47.111.23.167',
    port: 3306,
    database: 'qqbot',
    user: 'root',
    password: '1234',
    connectionLimit: 50
});

exports.query = function query(sql, data) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, con) => {
            if (err) {
                reject(err);
                return;
            }
            con.query(sql, data, (err, value) => {
                if (err) {
                    con.release();
                    reject(err);
                    return;
                }
                con.release();
                resolve(value);
            });
        });
    });
}

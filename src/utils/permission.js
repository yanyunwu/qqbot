const { checkUserAllAuth } = require('../sqlApi/user')
const { getSysUser } = require('../sqlApi/sysUser')
const config = require('../../config');

module.exports = function (userId, groupId, title) {
    return new Promise(resolve => {
        if (config.whiteAuth.includes(title)) {
            resolve(true);
            return;
        }

        if (config.admin && config.admin.includes(String(userId))) {
            resolve(true);
            return;
        }
        getSysUser(userId).then(value => {
            if (value.length) {
                resolve(true)
            } else {
                checkUserAllAuth(userId, groupId, title).then(value => resolve(!!value.length))
            }
        });
    })
}
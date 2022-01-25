const { checkUserAllAuth } = require('../sqlApi/user')

module.exports = function (userId, groupId, title) {
    return checkUserAllAuth(userId, groupId, title).then(value => value && !!value.length)
}
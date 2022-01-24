const { setUser, getUser } = require('../sqlApi/index')

module.exports = function (userId, groupId) {
    getUser(userId, groupId).then(value => {
        if (!value.length) {
            setUser(userId, groupId).then(value => value).catch(err => console.log(err))
        }
    })
}
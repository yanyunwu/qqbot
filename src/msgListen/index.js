const messageListeners = require('./messages/group');
const testListeners = require('./messages/test')
const apiListeners = require('./messages/api');
const userListener = require('./messages/user')
const masterListener = require('./messages/master')

/**
 * 信息分类模块，可细分到各种监听事件
*/

messageListeners.listeners = Object.assign(messageListeners.listeners,
    testListeners.listeners,
    apiListeners.listeners,
    userListener.listeners,
    masterListener.listeners)



module.exports = messageListeners;
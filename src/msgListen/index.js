const messageListeners = require('./messages/group');
const testListeners = require('./messages/test')
const apiListeners = require('./messages/api');

/**
 * 信息分类模块，可细分到各种监听事件
*/

messageListeners.listeners = Object.assign(messageListeners.listeners, testListeners.listeners, apiListeners.listeners)



module.exports = messageListeners;
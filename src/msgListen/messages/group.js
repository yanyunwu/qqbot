const listeners = {};
listeners.msg = function (msg, controller) {
    this[msg] = controller;
}
const { doHello } = require('../controllers/group')


const app = listeners;
app.msg('hello', doHello)


module.exports = listeners;
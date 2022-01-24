const Listener = require('../../utils/listener');
const app = new Listener();
const { doHello } = require('../controllers/group')
const { setOrder, setRole, setUserRole, getUser } = require('../../sqlApi/index')

app.msg('hello', doHello)
app.msg('打印|1', (event, args) => {
    let log = args[0];
    event.reply(log);
})
app.msg('打印|2', (event, args) => {
    event.reply(args.join(','))
})

app.msg('添加指令|2', (event, args) => {
    let [a, b] = args;
    setOrder(a, b).then(value => {
        event.reply('指令添加成功！')
    })
})

app.msg('添加角色|1', (event, args) => {
    let [a] = args;
    setRole(a).then(value => {
        event.reply('角色添加成功！')
    })
})

app.msg('设置角色|2', (event, args) => {
    let userId = event.user_id;
    let groupId = event.group_id;
    let [qq, role] = args;
    getUser(qq, groupId).then(value => {
        if (value.length) {

            let uid = value[0].uid;
            setUserRole(uid, role).then(value => {
                event.reply('设置角色成功！')
            })
        } else {
            event.reply('用户不存在，用户需先发言注册！')
        }
    })

})







app.msg('*', (event, args) => {


})


module.exports = app;
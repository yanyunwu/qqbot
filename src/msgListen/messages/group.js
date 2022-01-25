const Listener = require('../../utils/listener');
const app = new Listener();

const { setOrder, setRole, setUserRole, getUser } = require('../../sqlApi/index')
const { getUserAllAuth } = require('../../sqlApi/user')
const config = require('../../../config')



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

app.msg('查看权限', (event, args) => {
    let userId = event.user_id;
    let groupId = event.group_id;
    getUserAllAuth(userId, groupId).then(value => {
        console.log(value);
    })
})

app.msg('设置回复概率|1', (event, args) => {
    config.chatProbability = args[0];
    event.reply('设置成功');
})




module.exports = app;
const Listener = require('../../utils/listener');
const app = new Listener();
const { setOrder, setRole, setUserRole, getUser } = require('../../sqlApi/index')
const { setConfig } = require('../../sqlApi/config');
const { delUserRole } = require('../../sqlApi/user')
const { delRoleByTitle, setRoleAuthByTitle, delRoleAuthByTitle } = require('../../sqlApi/role')
const bot = global.bot

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

app.msg('删除角色|1', (event, args) => {
    let [a] = args;
    delRoleByTitle(a).then(value => {
        event.reply('角色删除成功！')
    })
})

app.msg('设置用户角色|2', (event, args) => {
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

app.msg('删除用户角色|2', (event, args) => {
    let userId = event.user_id;
    let groupId = event.group_id;
    let [qq, role] = args;
    delUserRole(qq, role).then(value => {
        event.reply('删除用户角色成功！')
    })

})

app.msg('添加角色权限|2', (event, args) => {
    let userId = event.user_id;
    let groupId = event.group_id;
    let [title, auth] = args;
    setRoleAuthByTitle(title, auth).then(value => {
        event.reply('添加角色权限成功！')
    })

})

app.msg('删除角色权限|2', (event, args) => {
    let userId = event.user_id;
    let groupId = event.group_id;
    let [title, auth] = args;
    delRoleAuthByTitle(title, auth).then(value => {
        event.reply('删除角色权限成功！')
    })

})

app.msg('设置回复概率|1', (event, args) => {
    setConfig('chatProbability', args[0], String(event.group_id)).then(value => {
        event.reply('设置成功');
    })
})





module.exports = app;
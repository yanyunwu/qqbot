const Listener = require('../../utils/listener');
const app = new Listener();
const bot = global.bot

const { getAllAuth } = require('../../sqlApi/authority')
const { getAllRole, getRoleAuth } = require('../../sqlApi/role')


app.msg('查看所有指令', (event, args) => {
    getAllAuth().then(value => {
        let authList = value.map(item => {
            return `${item.title} ${item.describe || ""}`
        });
        event.reply(authList.join('\n'))
    })
})

app.msg('查看所有角色', (event, args) => {
    getAllRole().then(value => {
        let authList = value.map(item => {
            return `${item.title}`
        });
        event.reply(authList.join('\n'))
    })
})

app.msg('查看角色|1', (event, args) => {
    getRoleAuth(args[0]).then(value => {
        let authList = value.map(item => {
            return `${item.title} ${item.describe || ""}`
        });
        event.reply(`${args[0]}共有${authList.length}项权限\n${authList.join('\n')}`)
    })
})




module.exports = app;
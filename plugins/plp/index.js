const { Database } = require('sqlite3').verbose();
const { Command } = require('commander');
const path = require('path');
let dbcache = null;


const getDatabase = () => {
    return new Promise(resolve => {
        if (dbcache) {
            resolve(dbcache);
            return;
        }

        const db = new Database(path.resolve(__dirname, './data.db'), function () {
            dbcache = db;
            resolve(db);
        });

    });
}



async function plp(ctx, next) {
    let event = ctx.event;
    let rowMsg = event.raw_message;
    const program = new Command();
    program
        .command('捡漂流瓶')
        .action(() => {
            readPlp().then(rows => {
                rows.forEach(row => {
                    sendMsg(ctx, row)
                })
            })
        })

    program
        .command('扔漂流瓶 <msg>')
        .action((msg) => {
            console.log(msg);
            event.reply(msg)
        })

    program
        .configureOutput({
            // 此处使输出变得容易区分
            // writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
            writeOut: (str) => event.reply(str),
            // writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
            // 将错误高亮显示
            // outputError: (str, write) => write(errorColor(str))
        });




    let argv = rowMsg.trim().split(/\s+/);

    program.exitOverride();
    try {
        program.parse(argv, { from: 'user' })
    } catch (err) {
        console.log('不存在该命令');
        next();
    }



    // writePlp(String(event.user_id), String(event.group_id), JSON.stringify(event.message));

}

function sendMsg(ctx, row) {
    let getG = ctx.bot.getGroupInfo(row.group_id);
    let getP = ctx.bot.getStrangerInfo(row.account_id)

    Promise.all([getG, getP]).then(value => {
        // console.log(value);

        let msg = JSON.parse(row.message);
        msg.unshift({
            type: "text",
            text: `你捡到了来自群${row.group_id}(${value[0].group_name})的成员${row.account_id}(${value[1].nickname})扔下的漂流瓶：\n`
        })
        ctx.event.reply(msg)
    })


}

async function writePlp(uid, gid, msg) {
    const db = await getDatabase();
    return new Promise(resolve => {
        db.run('INSERT INTO plp(account_id, group_id, message) VALUES(?,?,?)', [uid, gid, msg], function () {
            resolve();
        })
    })
}

async function readPlp() {
    const db = await getDatabase();
    return new Promise(resolve => {
        db.all('select * from plp order by random() limit 1;', [], function (err, rows) {
            resolve(rows);
        })
    })
}

module.exports = {
    plp
}

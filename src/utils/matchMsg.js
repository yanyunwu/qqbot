
// 消息匹配机制
function mathchMsg(rowMsg, messageListers, event) {
    const allArgs = rowMsg.match(/[^\s]+/g);
    let command = allArgs.shift();
    for (let i of Object.keys(messageListers)) {
        try {
            let ii = i.split('|')[0]
            if (ii === '*') {
                continue;
            }
            let list = command.match(new RegExp(`${ii}([^\\s]+)`))
            if (list) {
                let arg1 = list[1];
                allArgs.unshift(arg1)
                command = ii
            }
        } catch (err) {
            console.log(err);
        }

    }


    let rowCommand = command;
    command = `${command}|${allArgs.length}`

    if (messageListers[command]) {
        return {
            rowCommand,
            listener: messageListers[command],
            args: allArgs
        };
    }

    // 通配符设置
    const aaa = `*|${allArgs.length}`;
    if (Object.keys(messageListers).includes(aaa)) {
        return {
            rowCommand: "*",
            listener: messageListers[aaa],
            args: allArgs
        };
    }

}


module.exports = mathchMsg;
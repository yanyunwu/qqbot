
// 消息匹配机制
function mathchMsg(rowMsg, messageListers, event) {
    const allArgs = rowMsg.split(' ');
    let command = allArgs.shift();
    let rowCommand = command;
    command = `${command}|${allArgs.length}`
    for (let msg in messageListers) {
        if (command === msg) {
            return {
                rowCommand,
                listener: messageListers[msg],
                args: allArgs
            };
        }
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
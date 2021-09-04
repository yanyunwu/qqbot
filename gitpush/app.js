const express = require('express');
const morgan = require('morgan');
const shell = require('shelljs');
const http = require('http');

const app = express();
const bot = require('../index');

app.use(morgan('dev'));

app.post('/pushEvent', (req, res) => {
    res.send("push请求");
    bot.logout();
    shell.exec('git pull')
    bot.logout();
});

http.createServer(app).listen(3000, () => console.log('已启动'));

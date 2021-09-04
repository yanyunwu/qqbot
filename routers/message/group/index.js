// 引入接口模块
const app = require('./create');

// 配置接口模块
require('./admin');
require('./api');
require('./master');
require('./menu');
require('./user');

//导出接口模块
module.exports = app;







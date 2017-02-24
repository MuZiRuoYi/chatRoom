/*
 * 定义所有全局变量
 */
global.BASE_DIR = __dirname;
global.CONF = BASE_DIR + '/Lib/conf/';
global.CACHE = [];
global.VIEW = BASE_DIR + '/public/view/pages/'

/*
 * 引入全局所需模块
 */
global.lead = {};
lead.http = require('http');
lead.fs = require('fs');
lead.path = require('path');
lead.sys = require('util');
lead.url = require('url');
lead.querystring = require('querystring');
lead.mysql = require('mysql');
lead.jade = require('jade');
lead.socketIo = require('socket.io');
lead.express = require('express');
// 引入自定义模块，同时实现文件路径管理
lead.httpBasic = require('./lib/control/http_basic');
lead.getConfig = require('./lib/control/get_config');
lead.router = require('./lib/router');
lead.staticModule = require('./lib/control/static_module');
lead.httpParam = require('./lib/control/http_param');
lead.sqlBasic = require('./lib/control/sql_basic');
lead.session = require('./lib/control/node_session');
// 操作SQL
lead.userSql = require('./lib/sql/user_sql');
lead.chatRoomSql = require('./lib/sql/chatRoom_sql');
lead.messageSql = require('./lib/sql/message_sql');
lead.chatUserSql = require('./lib/sql/chat_user_sql');
// 操作SQL函数引用
lead.user = require('./lib/model/user');
lead.chatRoom = require('./lib/model/chat_room');
lead.message = require('./lib/model/message');
lead.chatUser = require('./lib/model/chat_user');

/*
 * 创建HTTP服务器
 */
lead.server = lead.http.createServer(function(req, res) {
	// 初始化jade调用函数
	res.render = function(){
		var template = arguments[0];
		var options = arguments[1];
		var str = lead.fs.readFileSync(template, 'utf8');
		var fn = lead.jade.compile(str, { filename: template, pretty: true });
		var page = fn(options);
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(page);
	}
	// 所有请求路由处理
	lead.router.router(res, req);
}).listen(1337);

lead.server;
// console.log('Server is running at 127.0.0.1:1337');

global.IO = lead.socketIo.listen(lead.server);
require('././lib/model/socket.io');

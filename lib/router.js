/*
 * 全站路由处理
 */
exports.router = function(res, req) {
	var pathname = decodeURI(lead.url.parse(req.url).pathname);
	switch(pathname) {
		case '/favicon.ico':
		    break;
		case '/':  // 首页
		case '/index.html':
		    lead.httpBasic.writeHtml(res, 'index.html');
		    break;
		case '/userLogin':  // 登录
		    lead.user.login(res, req);
		    break; 
		case '/unAccount':
		    lead.httpBasic.writeHtml(res, 'regist.html');
		    break;
		case '/regist': 
		    lead.user.regist(res, req);
		    break;
		case '/checkUserAccount':
		    // lead.user.addChatRoomCheckUser(res, req);
		    break;
		default:  // 其他静态资源
		    lead.staticModule.getStaticFile(pathname, res, req, BASE_DIR + '/public/');
		    break;
	}
};



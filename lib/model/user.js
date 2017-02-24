/*
 * 关于用户的操作 | 数据库操作
 * 
 */
var _res, _req;

/*
 * 用户登录路由事件
 */
exports.login = function(res, req) {
    _res = res;
    _req = req;

    // 获取POST数据
    lead.httpParam.init(_res, _req);
    lead.httpParam.POST(['userName', 'userPass'], function(valArr){
        // 处理接收数据
        userLogin(valArr[0], valArr[1]);
    });
};

/*
 * 用户登录处理
 */
function userLogin(account, pass) {
    lead.userSql.getUserByLogin(account, pass, function(user) {
        if(user) {
            enterChatView(user, [], []);
        } else {
            lead.httpBasic.writeHtml(_res, 'index.html');
        }
    });
}

/*
 * 用户注册路由处理
 */
exports.regist = function(res, req) {
    _res = res;
    _req = req;

    // 获取POST数据
    lead.httpParam.init(_res, _req);
    lead.httpParam.POST(['account', 'userPass', 'name', 'age', 'nick', 'sex'], function(valArray){
        userRegist(valArray);
    });
};

/*
 * 用户注册处理
 */
function userRegist(userArray) {
    var user = {
        u_account: userArray[0],
        u_name: userArray[2],
        u_sex: userArray[5],
        u_age: userArray[3],
        u_pass: userArray[1],
        u_nick: userArray[4]
    };
    lead.userSql.insertUser(user, function(ret) {
        if(ret) {
            enterChatView(user, [], []);
        } else {
            lead.httpBasic.writeHtml(_res, 'regist.html');
        }
    });
}

/*
 * 用户进入聊天界面
 */
function enterChatView(user, myChatRoomArray, inChatRoomArray) {
    _res.render(VIEW + 'chat.jade', {
        title: '聊天',
        userName: user.u_nick || user.u_name || user.u_account,
        myChatRoom: myChatRoomArray,
        inChatRoom: inChatRoomArray,
        userAccound: user.u_account
    });
    CACHE.push(user.u_account);
}

/*
 * 新建聊天室Ajax验证用户存在性
 */
/*exports.addChatRoomCheckUser = function(res, req) {
    _res = res;
    _req = req;
    // 获取POST数据
    lead.httpParam.init(_res, _req);
    lead.httpParam.POST(['account'], function(valArr){
        // 处理接收数据
        // console.log(valArr[0]);
        lead.userSql.searchUser(valArr[0], function(ret) {
            if(ret == -1) {
                // _res.writeHead(200, { 'Content-Type': 'text/plain'});
                // _res.write()
                // _res.end('false');
                // _res.send('false');
            } else {
                // _res.writeHead(200, {"Content-Type": "text/plain"});
                // res.write();
                // _res.end();
                // _res.send('true');
            }
        });
    });
};*/


/*
 * 用户验证成功，开始进入聊天界面
 */
// function startChat(account) {
    // lead.chatRoom.getAllChatRoomByUserAccount(account, function(rooms) {
    //     lead.message.getUnReadMess(account, function(unReadMess) {
    //         // console.log(unReadMess);
    //         loadChat(account, rooms, unReadMess);
    //     });
    // });
// }

/*
 * 加载chat界面
 */
// function loadChat(account, rooms, unReadMess) {
    // console.log(rooms);
    // var chatRooms = new Array();
    // _res.render(VIEW + 'chat.jade', { 
    //     title: '聊天',
    //     chatRoom: getChatRooms(rooms, unReadMess),
    //     userAccound: account
    // });
// }

/*
 * 
 */
// function getChatRooms(rooms, unReadMess) {
    // var chatRooms = new Array();
    // var k = 0, flag = false;
    // for(var i = 0; i < rooms.length; i++) {
    //     for(var j = 0; j < unReadMess.length; j++) {
    //         if(rooms[i].chatRoomId == unReadMess[j].chatRoomId) {
    //             chatRooms[k] = {
    //                 name: rooms[i].chatRoomName,
    //                 unReadNum: unReadMess[j].unReadNum,
    //                 id: unReadMess[j].chatRoomId
    //             };
    //             k++;
    //             flag = true;
    //         }
    //     }
    //     if(!flag) {
    //         chatRooms[k] = {
    //             name: rooms[i].chatRoomName,
    //             unReadNum: 0,
    //             id: rooms[j].chatRoomId
    //         };
    //         k++;
    //     }
    //     flag = false;
    // }

    // return chatRooms;
// }


/*
 * 登录处理
 * 参数：{res: res, req: req}  对象
 * 参数：接收到数据[userName, userPass]  数组 
 */
// function isUser(valArr) {
	// var sqlModel = new lead.sqlBasic();
	// sqlModel.findOneById('user', {'u_account': valArr[0]}, function(ret){
	// 	handleLogin(conne, ret, valArr);
 //    });
    // _user = lead.userSql.searchByAccount(valArr[0]);
    // if(_user.u_pass == valArr[1]) {
    //     return ture;
    // }
// }

/*
 * 登录并进入聊天界面
 * 参数：{res: res, req: req}  对象
 * 参数：数据库查询到结果  对象
 * 参数：接收到数据[userName, userPass]  数组 
 */
// function handleLogin(ret, valArr) {
// 	if(valArr[1] == ret['u_pass']) {  // 密码正确
// 		CACHE[CACHE.length] = ret;
//         conne.res.render(VIEW + 'chat.jade', {
//             title: '聊天',
//             chatRoom: [
//                 {
//                     name: 'tom',
//                     unReadNum: '5',
//                     id: '123'
//                 },
//                 {
//                     name: 'Fom',
//                     unReadNum: '15',
//                     id: '13'
//                 }
//             ], 
//             chatCon: [
//                 {
//                     name: 'tom', 
//                     content: 'jhahah'
//                 },
//                 {
//                     name:'huhu', 
//                     content: 'hihihi'
//                 }
//             ],
//             userAccound: ret['u_account']
//         });
// 	} else {  // 密码错误
// 		lead.httpBasic.writeWord(_res, '登录失败！');
// 	}
// }

/*
 * 注册新用户
 */
// exports.regist = function(res, req) {
//     _res = res;
//     _req = req;
//     lead.httpParam.init(res, req);
//     lead.httpParam.POST(['account', 'userPass', 'name', 'nick', 'sex', 'age'], function(valArr){
//         if(valArr.length <= 0) {  // post数据为空。跳转到注册界面
//             lead.httpBasic.writeHtml(res, 'regist.html');
//             return;
//         }
//         // 处理接收数据
//         addUser(valArr);
//     });
// };

// function addUser(valArr) {
//     if(valArr[5] == '') {
//         valArr[5] = 0;
//     }
//     var sqlModel = new lead.sqlBasic();
//     sqlModel.insert('user', {
//         'u_account': valArr[0],
//         'u_name': valArr[2],
//         'u_sex': valArr[4],
//         'u_age': valArr[5],
//         'u_pass': valArr[1],
//         'u_nick': valArr[3]
//      }, function(ret){
//         if(!ret) {
//             lead.httpBasic.writeHtml(res, 'regist.html');
//         }
//         /// 进入聊天界面函数
//     });
// }

// function inChat(conne, user) {
//     //
// }

// function getChatRoom() {
//     //
// }

 // u_account char(10) primary key, -- 账号
 // u_name char(20),  -- 姓名
 // u_sex char(4) not null check(u_sex in ('未知','男','女')), -- 性别
 // u_age smallint, -- 年龄
 // u_pass char(16),  -- 密码
 // u_nick char(20),  -- 昵称


// function getUser(res, req) {
// 	// console.log(req);
// 	// var session = lead.session.start(res, req);
// 	// console.log(session);
// 	var flag = true;
// 	for(var i = 0; i < CACHE.length; i++) {
//     	if(CACHE[i].id == session.SESSID) {
//     		flag = false;
//     		return CACHE[i].user;
//     	}
//     }

//    if(flag) {
//     	return false;
//     }
// };

// function createCache(conne, user) {
	// var session = lead.session.start(conne.res, conne.req);
	// console.log(session);
	// return {
 //    	// id: session.SESSID,
 //    	user: user
 //    };
// }

// exports.getUser = getUser;




    	// var sqlModel = new lead.sqlBasic();
    	// sqlModel.findOneById('user', {'u_account': valArr[0]}, function(ret) {
    	// 	if(valArr[1] == ret['u_pass']) {
    	// 		var conne = {res: res, req: req};
    	// 		createCache(conne, ret);
    	// 		lead.httpBasic.writeWord(res, '登录成功！');
    	// 	} else {
    	// 		lead.httpBasic.writeHtml(res, 'index.html');
    	// 	}
     //    });


		// if(valArr[1] == ret['u_pass']) {
		// 	var conne = {res: res, req: req};
		// 	createCache(conne, ret);
		// 	return true;
		// } else {
		// 	return false;
		// }

// if(CACHE.class != null) {
    	// 	return;
    	// }
    	// if(valArr) {
    	// 	var sqlModel = new lead.sqlBasic();
    	// 	var tableName = 'user';
    	// 	var idJson = {'u_account': valArr[0]};
     //        sqlModel.findOneById(tableName, idJson, function(ret){
     //        	if(ret != undefined && valArr[1].toString() == ret['u_pass'].toString()) {
     //        		// lead.httpBasic.writeWord(res, '登录成功！');
     //        		// ret['u_pass'] = '';
     //        		// CACHE[CACHE.length] = {
     //        		// 	content: ret
     //        		// };
     //        		// var conn = { res: res, req: req };
     //        		var id = lead.session.start(res, req);
     //        		var flag = false;
     //        		for(var i = 0; i < CACHE.length; i++) {
     //        			if(CACHE[i].id == id.SESSID) {
     //        				lead.httpBasic.writeWord(res, '已经登录！');
     //        				flag = true;
     //        				return;
     //        			}
     //        		}
     //        		if(!flag) {
     //        			CACHE[CACHE.length] = {
     //        		    	id: id.SESSID,
     //        		    	user: ret
     //        		    };
     //        		    lead.httpBasic.writeWord(res, '登录成功！');
     //        		}
            		
     //        		// CACHE[CACHE.length] = {
     //        		// 	id: id,
     //        		// 	user: ret
     //        		// };
     //        		// lead.httpBasic.writeWord(res, '登录成功！');
            		
     //        	} else {
     //        		lead.httpBasic.writeHtml(res, 'index.html');
     //        		// setTimeout(lead.httpBasic.writeHtml(res, 'index.html'), 5000);
     //        	}
     //        });
    	// } else {
    	// 	lead.httpBasic.writeHtml(res, 'index.html');
    	// 	// setTimeout(lead.httpBasic.writeHtml(res, 'index.html'), 5000);
    	// }


// 	// function creatUser() {
// 	// 	var user = {
//  //        	account: '',
//  //        	name: '',
//  //        	sex: '',
//  //        	age: 0,
//  //        	pass: '',
//  //        	nick: '',
//  //        	registTime: new Date()
//  //        };
//  //        return user;
// 	// }
// };


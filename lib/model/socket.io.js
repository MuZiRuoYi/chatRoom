/*
 * sockets.io监听
 */
IO.sockets.on('connection', function(socket) {
    // 新建聊天室时判断用户账号是否正确
    socket.on('isUserAccount', function(account){
    	lead.userSql.searchUser(account.account, function(isUser) {
    		if(!isUser) {
    			// 发送用户判断存在结果
    			socket.emit('isNotUser', {account: account.account, isuser: false});
    		} else {
    			// 发送用户判断存在结果
    			socket.emit('isNotUser', {isUser: true});
    		}
    	});
    });

    // 添加聊天室
    socket.on('addChatRoom', function(data) {
    	var c_id = 0;
    	var chatRoomAndHasUser = {
    		createUser: data.createUser,
    		hasAccounts: data.hasAccounts,
    		chatRoomName: data.chatRoomName
    	}
    	// 添加聊天室
    	lead.chatRoom.addChatRoom(chatRoomAndHasUser, function(chatRoomId) {
    		if(chatRoomId) {
    			// 成功建立聊天室
    			socket.emit('creatChatRoomSuccessed', {
    				account: data.createUser, 
    				chatRoomId: chatRoomId, 
    				chatRoomName: data.chatRoomName
    			});

    			// 向被拉进聊天室用户广播进入消息
    			socket.broadcast.emit('enterChatRoom', {
    				createUser: data.createUser,
    				accounts: data.hasAccounts,
    				chatRoomId: chatRoomId,
    				chatRoomName: data.chatRoomName
    			});
    		}
    	});
    });

    // 接收获取所拥有聊天室请求
    socket.on('getOwnAllChatRooms', function(data) {
    	lead.chatRoom.getOwnAllChatRooms(data.account, function(ownChatRoomObjs) {
    		// 向客户端推送账号所拥有的聊天室信息
    		socket.emit('pushOwnAllChatRooms', ownChatRoomObjs);
    	});
    });

    // 接收获取所有所在聊天室请求
    socket.on('getInAllChatRooms', function(data) {
    	lead.chatRoom.getInAllChatRooms(data.account, function(inAllChatRoomObjs) {
    		socket.emit('pushInAllChatRooms', inAllChatRoomObjs);
    	});
    });

    // 监听客户端初始化首个聊天室消息，获取聊天室最近30条消息
    socket.on('chatLog', function(data) {
    	lead.message.getChatRoomEndNumberMessage(data.chatRoomId, [0, 30], function(messages) {
    		socket.emit('pushChatLog', messages);
    	});
    });

    // 监听获取客户端提交聊天内容
    socket.on('inlineChatingContent', function(data) {
		lead.message.insertMessage(data, function(ret) {
			// 向所有用户推送在线发送的消息
			if(ret) {
				// 获取聊天室所有用户
			    lead.chatUser.getChatRoomAllUserAccount(data.chatRoomId, function(accounts) {
//			    	console.log(accounts)
			    	socket.broadcast.emit('pushInlineMessage', {
						accounts: accounts,
						chatRoomId: data.chatRoomId
			    	});
				});
			}
		});
    });

    // 监听解散聊天室
    socket.on('dissolutChatRoom', function(data) {
        lead.chatRoom.deleteChatRoomByChatRoomId(data, function(ret){
        });
        lead.chatUser.deleteChatUserByChatRoomId(data, function(ret) {
        });
        lead.message.deleteMessageByChatRoomId(data, function(ret) {
        });
    });

    // 监听退出聊天室
    socket.on('exitChatRoom', function(data) {
        lead.message.deleteMessageByUserAccount(data, function(ret) {
        });
        lead.chatUser.deleteChatUserByUserAccount(data, function(ret) {
        });
    });

    // socket.io 错误处理
	// socket.on('error', function(err) {
	// 	console.log(err);
	// });
});

/*
 * 获取该聊天室最近messageNumber条消息
 */
exports.getChatRoomEndNumberMessage = function(chatRoomId, messageNumberArray, callback) {
	var sqlModel = new lead.sqlBasic();
	var whereJson = {
		'and': [{
			'key': 'message.u_account',
			'opts': '=',
			'value': 'user.u_account'
		},{
			'key': 'r_id',
			'opts': '=',
			'value': chatRoomId
		}],
		'or': []
	};
	var orderByJson = {'key': 'm_time', 'type': 'asc'};
	var limitArr = messageNumberArray;
	var fieldsArr = ['m_content', 'm_time', 'message.u_account', 'u_name', 'u_nick'];
	sqlModel.find(' message, user ', whereJson, orderByJson, limitArr, fieldsArr, function(messages) {
		callback(messages);
	});
};
// select m_content, m_time, message.u_account, u_name, u_nick
// from message, user
// where message.u_account = user.u_account and r_id = '1';

/*
 * 向数据库添加新消息
 */
exports.insertMessage = function(message, callback) {
	var sqlModel = new lead.sqlBasic();
	sqlModel.insert('message', {
		'm_content': message.content,
		'r_id': message.chatRoomId,
		'u_account': message.sendUser
	}, function(ret) {
		callback(ret);
	});
};
// insert into message(m_content, r_id, u_account) values('jihhjibvhyvbgb', 4, '1234567');

/*
 * 根据聊天室号删除消息
 */
exports.deleteMessageByChatRoomId = function(chatRoomId, callback) {
    var sqlModel = new lead.sqlBasic();
    sqlModel.remove('message', {
        'r_id': chatRoomId
    }, function(ret) {
        callback(ret);
    });
};

/*
 * 根据用户账号删除用户所发送消息
 */
exports.deleteMessageByUserAccount = function(data, callback) {
    var sqlModel = new lead.sqlBasic();
    sqlModel.removeByManyItem('message', [{
        'key': 'u_account',
        'value': data.userAccount
    }, {
        'key': 'r_id',
        'value': data.chatRoomId
    }], function(ret) {
        callback(ret);
    });
};

















/*
 * 根据账号获取未读信息状况
 */
// exports.getUnReadMessageInfo = function(account, callback) {
// 	// select r_id count(s_id) from mess_state where u_account = '1234567' and state = 0 group by r_id;
// 	var whereJson = {
// 		'and': [{
// 			'key': 'u_account', 
// 			'opts': '=', 
// 			'value': account + ' group by r_id '
// 		}], 
// 		'or': []
// 	}
// 	var fieldsArr = ['count(s_id)', 'r_id'];
// 	var sqlModel = new lead.sqlBasic();
// 	// console.log();
// 	sqlModel.find('unread_message', whereJson, null, [], fieldsArr, function(ret) {
// 		callback(ret);
// 	});
// };

/*
 * 根据账号和聊天室号得循环得到对应消息
 */
// exports.getUnReadMessage = function(account, chatRoomId, callback) {
// 	getUnReadMessageId(account, chatRoomId, function(messageIds) {
// 		for(var i = 0; i < messageIds.length; i++) {
// 			var sqlModel = new lead.sqlBasic();
// 			sqlModel.findOneById('message', {'m_id': messageIds[i]['m_id']}, function(message) {
// 				callback(message);
// 			});
// 		}
// 	});
// };

/*
 * 根据消息对象获取消息发送人与聊天室关系ID
 */
// exports.getMessageSendPerson = function(message, callback) {
// 	var sqlModel = new lead.sqlBasic();
// 	sqlModel.findOneById('')
// };

/*
 * 通过用户账号和聊天室号获取相应未读消息ID
 */
// exports.getUnReadMessage = function(account, chatRoomId, callback) {
// 	var whereJson = {
// 		'and': [{
// 			'key': 'unread_message.u_account',
// 			'opts': '=',
// 			'value': account
// 		}, {
// 			'key': 'unread_message.r_id',
// 			'opts': '=',
// 			'value': chatRoomId
// 		}, {
// 			'key': 'user.u_account',
// 			'opts': '=',
// 			'value': 'chat_user.u_account'
// 		}, {
// 			'key': 'chat_user.c_id',
// 			'opts': '=',
// 			'value': 'message.m_chat'
// 		}], 
// 		'or': []
// 	};
// 	var tables = ' unread_message, user, message, chat_user ';
// 	var fieldsArr = ['message.m_content', 'user.u_account', 'user.u_nick', 'unread_message.s_id', 'message.m_time'];
// 	var sqlModel = new lead.sqlBasic();
// 	sqlModel.find(tables, whereJson, null, [], fieldsArr, function(messages) {
// 		// 删除已阅读消息
// 		deleteMessageReaded(messages);
// 		callback(messages);
// 	});
// }

/*
 * 删除消息状态中已经阅读消息
 */
// function deleteMessageReaded(messages) {
// 	for(var i = 0; i < messages.length; i++) {
// 		var sqlModel = new lead.sqlBasic();
// 		sqlModel.remove('unread_message', {'s_id': messages[i]['s_id']}, function(ret) {
// 			//
// 		});
// 	}
// }

















// exports.getUnReadMessNumByUserAccount = function(account, chatRooms) {
// 	var unReadMessages = new Array();
//     var roomUserRelat = getRoomUserRelat(account, chatRooms);
//     var roomUserRelatId = new Array();
//     for(var i = 0; i < roomUserRelat.length; i++) {
//     	roomUserRelatId = roomUserRelat.c_id;
//     }
//     var messageId = getAllMessId(roomUserRelatId);
// };

// function getRoomUserRelat(account, chatRooms) {
// 	var roomUserRelat = new Array();
// 	var sqlModel = new lead.sqlBasic();
// 	for(var i = 0; i < chatRooms.length; i++) {
// 		var whereJson = {
// 			'and': [{
// 				'key': 'u_account', 
// 				'opts': '=', 
// 				'value': "'" + account + "'"
// 			}, {
// 				'key': 'r_id',
// 				'opts': '=',
// 				'value': "'" + chatRooms[i]['r_id'] + "'"
// 			}], 
// 			'or': [] 
// 		};
// 		var orderByJson = {'key': 'c_id', 'type': 'desc'};
// 		sqlModel.find('chat_user', whereJson, orderByJson, [], ['c_id'], function(ret) {
// 			roomUserRelat[i].c_id = ret['c_id'];
// 			roomUserRelat[i].r_name = chatRooms[i]['r_name'];
// 		});
// 	}
// 	return roomUserRelat;
// }

// function getAllMessId(roomUserRelatId) {
// 	var sqlModel = new lead.sqlBasic();
// 	var messageIds = [];
// 	for(var i = 0; i < roomUserRelatId.length; i++) {
// 		messageIds[i] = sqlModel.findOneById('message', {'m_chat': roomUserRelatId[i]}, function(ret) {
// 			messageIds[i] = ret['m_id'];
// 		});
// 	}
// 	return messageIds;
// }




//   @param tableName string 
// * @param whereJson json desc(and和or区别，其中的条件为key值、连接符大于小于还是等于、value值) 
// * @param orderByJson json desc({'key' : 'time', 'type':'desc'}) 
// * @param limitArr array desc（第一个元素是返回偏移量，第二个是返回数量，空返回全部）
// * @param fieldsArr array desc（返回哪些字段）
// * @param callback function
// * @return null
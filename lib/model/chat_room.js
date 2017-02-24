/*
 * 获取账号所拥有的聊天室信息
 */
exports.getOwnAllChatRooms = function(account, callback) {
	lead.chatRoomSql.getOwnAllChatRooms(account, function(ownChatRooms){
		var ownChatRoomObjs = new Array();
		for(var i = 0; i < ownChatRooms.length; i++) {
			ownChatRoomObjs[i] = {
				chatRoomId: ownChatRooms[i]['r_id'],
				chatRoomName: ownChatRooms[i]['r_name']
			};
		}
		callback(ownChatRoomObjs);
	});
};

/*
 * 获取账号所在的聊天室信息
 */
exports.getInAllChatRooms = function(account, callback) {
	lead.chatRoomSql.getInAllChatRooms(account, function(inAllChatRooms) {
		var inAllChatRoomObjs = new Array();
		for (var i = 0; i < inAllChatRooms.length; i++) {
			inAllChatRoomObjs[i] = {
				name: inAllChatRooms[i]['r_name'],
				id: inAllChatRooms[i]['r_id']
			};
		}
		callback(inAllChatRoomObjs);
	});
};


/*
 * 添加聊天室
 */
exports.addChatRoom = function(chatRoomAndHasUser, callback) {
	var chatRoom = {
		createUser: chatRoomAndHasUser.createUser,
		name: chatRoomAndHasUser.chatRoomName
	};
	lead.chatRoomSql.addChatRoom(chatRoom, function(ret){
		if(ret) {
			lead.chatUser.addChatUsers(ret.insertId, chatRoomAndHasUser.hasAccounts);
			callback(ret.insertId);
		}
	});
};
/*
 * 根据聊天室ID删除聊天室
 */
exports.deleteChatRoomByChatRoomId = function(chatRoomId, callback) {
    lead.chatRoomSql.deleteChatRoomByChatRoomId(chatRoomId, function(ret) {
        callback(ret);
    });
};






/*
 * 获取改账号所有在的所有聊天室，对对应SQL文件方法进行初步处理
 */
// exports.getAllChatRoomByUserAccount = function(account, callback) {
// 	lead.chatRoomSql.getAllChatRoomByUserAccount(account, function(rooms) {
// 		var result = [];
// 		for(var i = 0; i < rooms.length; i++) {
// 			result[i] = {
// 				chatRoomId: rooms[i]['r_id'],
// 				chatRoomName: rooms[i]['r_name']
// 			}
// 		}
// 		callback(result);
// 	});
// };

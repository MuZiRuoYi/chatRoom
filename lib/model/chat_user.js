/*
 * 为单个聊天室添加多条用户关系
 */
exports.addChatUsers = function(chatRoomId, accounts) {
	for (var i = 0; i < accounts.length; i++) {
		var chatUser = {
			chatRoomId: chatRoomId,
			userAccount: accounts[i]
		};
		lead.chatUserSql.addChatUser(chatUser, function(ret) {
		});
	}
};

/*
 * 获取该聊天室所有用户账号
 */
exports.getChatRoomAllUserAccount = function(chatRoomId, callback) {
	lead.chatUserSql.getChatRoomAllUserAccount(chatRoomId, function(ret) {
		var accounts = new Array();
		for(var i = 0; i < ret.length; i++) {
			accounts[i] = ret[i]['u_account'];
		}
		callback(accounts);
	});
};

/*
 * 根据聊天室号删除聊天室与用户对应关系
 */
exports.deleteChatUserByChatRoomId = function(chatRoomId, callback) {
    lead.chatUserSql.deleteChatUserByChatRoomId(chatRoomId, function (ret) {
        callback(ret);
    });
};

/*
 * 根据用户账号删除聊天室与用户关系
 */
exports.deleteChatUserByUserAccount = function(data, callback) {
    lead.chatUserSql.deleteChatUserByUserAccount(data, function(ret){
        callback(ret);
    });
};

/*
 * 数据库添加用户聊天室关系
 */
exports.addChatUser = function(chatUser, callback) {
	var sqlModel = new lead.sqlBasic();
	sqlModel.insert('chat_user', {
		'r_id':chatUser.chatRoomId, 
		'u_account': chatUser.userAccount 
	}, function(ret) {
		callback(ret);
	});
};

/*
 * 获取该聊天室所有用户账号
 */
exports.getChatRoomAllUserAccount = function(chatRoomId, callback) {
	var sqlModel = new lead.sqlBasic();
	sqlModel.find('chat_user', {
		'and': [{
			'key': 'r_id', 
			'opts': '=', 
			'value': chatRoomId
		}],
		'or': []
	},  null, [], ['u_account'], function(accounts) {
		callback(accounts);
	});
};
// select u_account from chat_user where r_id = 1;

/*
 * 根据聊天室号删除聊天室与用户对应关系
 */
exports.deleteChatUserByChatRoomId = function(chatRoomId, callback) {
    var sqlModel = new lead.sqlBasic();
    sqlModel.remove('chat_user', {
        'r_id': chatRoomId
    }, function(ret) {
        callback(ret);
    });
};

/*
 * 根据用户账号删除聊天室与用户关系
 */
exports.deleteChatUserByUserAccount = function(data, callback) {
    var sqlModel = new lead.sqlBasic();
    sqlModel.removeByManyItem('chat_user',[{
        'key': 'u_account',
        'value': data.userAccount
    }, {
        'key': 'r_id',
        'value': data.chatRoomId
    }], function(ret) {
        callback(ret);
    });
};

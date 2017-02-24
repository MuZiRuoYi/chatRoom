/*
 * 数据库添加聊天室
 */
exports.addChatRoom = function(chatRoom, callback) {
	var sqlModel = new lead.sqlBasic();
	sqlModel.insert('chat_room', {
		'r_name':chatRoom.name, 
		'r_creat_user':chatRoom.createUser
	}, function(ret) {
		// console.log(ret);
		callback(ret);
	});
};

/*
 * 数据库查询账号所拥有的聊天室信息
 */
exports.getOwnAllChatRooms = function(account, callback) {
	var sqlModel = new lead.sqlBasic();
	var whereJson = {'and': [{'key': 'r_creat_user', 'opts': '=', 'value': account}], 'or': []};
	var fieldsArr = ['r_id', 'r_name'];
	sqlModel.find('chat_room', whereJson, null, [], fieldsArr, function(ownChatRooms) {
		callback(ownChatRooms);
	});
};

/*
 * 获取账号所在的聊天室信息
 */
exports.getInAllChatRooms = function(account, callback) {
	var sqlModel = new lead.sqlBasic();
	var whereJson = {
		'and': [{
			'key': 'chat_user.r_id', 
			'opts': '=', 
			'value': 'chat_room.r_id '
		}, {
			'key': 'chat_room.r_creat_user',
			'opts': '<>',
			'value': account
		}, {
			'key': 'chat_user.u_account',
			'opts': '=',
			'value': account
		}], 
		'or': []
	};
	var fieldsArr = ['chat_room.r_id', 'chat_room.r_name'];
	sqlModel.find(' chat_user, chat_room ', whereJson, null, [], fieldsArr, function(inAllChatRooms) {
		callback(inAllChatRooms);
	});
};

/*
 * 根据聊天室ID删除聊天室
 */
exports.deleteChatRoomByChatRoomId = function(chatRoomId, callback) {
    var sqlModel = new lead.sqlBasic();
    sqlModel.remove('chat_room', {
        'r_id': chatRoomId
    }, function(ret){
        callback(ret);
    });
};










 
// exports.getAllChatRoomByUserAccount = function(account, RoomCallback) {
// 	getAllChatRoomIdByUserAccount(account, function(chatRoomIdsObjArr) {
// 		var sqlModel = new lead.sqlBasic();
// 		var orArr = new Array();
// 		for(var i = 0; i < chatRoomIdsObjArr.length; i++) {
// 			orArr[i] = {'key': 'r_id', 'opts': '=', 'value': chatRoomIdsObjArr[i]['r_id']}
// 		}
// 		var whereJson = {'and': [orArr[0]], 'or': orArr};
// 		sqlModel.find('chat_room', whereJson, null, [], ['r_name', 'r_id'], function(ret) {
// 			// console.log(ret);
// 		    RoomCallback(ret);
// 	    });
// 	});
// };

/*
 * 获取改账号所有在的所有聊天室ID对象数组
 */
// function getAllChatRoomIdByUserAccount(account, callback) {
// 	var sqlModel = new lead.sqlBasic();
// 	var whereJson = {'and': [{'key': 'u_account', 'opts': '=', 'value': "'" + account + "'"}], 'or': []};
// 	var orderByJson = {'key': 'c_id', 'type': 'desc'};
// 	var fieldsArr = ['c_id', 'r_id'];
// 	sqlModel.find('chat_user', whereJson, orderByJson, [], fieldsArr, function(ret) {
// 		if(ret) {
// 			// console.log(ret);
// 			callback(ret);
// 		}
// 	});
// }

























// function getChatRoomById(idArr) {
	// var chatRooms = new Array();
	// var sqlModel = new lead.sqlBasic();
	// for(var i = 0; i < idArr.length; i++) {
	// 	chatRooms[i] = sqlModel.findOneById(idArr[i]['c_id']);
	// }
	// return chatRooms;
// }

// * @param tableName string 
// * @param whereJson json desc(and和or区别，其中的条件为key值、连接符大于小于还是等于、value值) 
// * @param orderByJson json desc({'key' : 'time', 'type':'desc'}) 
// * @param limitArr array desc（第一个元素是返回偏移量，第二个是返回数量，空返回全部）
// * @param fieldsArr array desc（返回哪些字段）
// * @param callback function
// * @return null
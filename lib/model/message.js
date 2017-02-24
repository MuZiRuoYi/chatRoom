/*
 * 获取该聊天室最近messageNumber条消息
 */
exports.getChatRoomEndNumberMessage = function(chatRoomId, messageNumberArray, callback) {
	lead.messageSql.getChatRoomEndNumberMessage(chatRoomId, messageNumberArray, function(messages) {
		var endMessages = new Array();
		for(var i = 0; i < messages.length; i++) {
			var fullTime = messages[i]['m_time'];
			var stringTime = fullTime.getFullYear() + '年' + 
			                 (fullTime.getMonth() + 1) + '月' + 
			                 fullTime.getDate() + '日    ' + 
			                 fullTime.getHours() + ':' + 
			                 fullTime.getSeconds() + ':' + 
			                 fullTime.getSeconds();
			endMessages[i] = {
				content: messages[i]['m_content'],
				time: stringTime,
				sendUser: messages[i]['u_nick'] != '' ? messages[i]['u_nick'] :
				          messages[i]['u_name'] != '' ? messages[i]['u_name'] : messages[i]['u_account']
			}
		}
		callback(endMessages);
	});
};

/*
 * 添加新消息及其相关内容
 */
exports.insertMessage = function(message, callback) {
	// 向数据库添加新消息
	lead.messageSql.insertMessage(message, function(ret) {
		callback(ret);
	});
}

/*
 * 根据聊天室号删除消息
 */
exports.deleteMessageByChatRoomId = function(chatRoomId, callback) {
    lead.messageSql.deleteMessageByChatRoomId(chatRoomId, function (ret) {
        callback(ret);
    });
};

/*
 * 根据用户账号号删除消息
 */
exports.deleteMessageByUserAccount = function(data, callback) {
    lead.messageSql.deleteMessageByUserAccount(data, function (ret) {
        callback(ret);
    });
};




















/* 
 * 消息处理 | 数据库操作
 * 
 */
// exports.getUnReadMess = function(account, callback) {
// 	lead.messageSql.getUnReadMessageInfo(account, function(unReadMess) {
// 		var result = [];
//         for(var i = 0; i < unReadMess.length; i++) {
//         	result[i] = {
//         		unReadNum: unReadMess[i]['count(s_id)'],
//         	    chatRoomId: unReadMess[i]['r_id']
//             };
//         }
//         callback(result);
//    });
// };

/*
 * 根据账号及其聊天室编号获取消息
 */
// exports.getUnReadMessage = function(account, chatRoomId, callback) {
//     lead.messageSql.getUnReadMessage(account, chatRoomId, function(messages) {
//         var _messages = new Array();
//         for(var i = 0; i < messages.length; i++) {
//             _messages[i] = {
//                 messageContent: messages[i]['m_content'],
//                 messageSendPersonNick: messages[i]['u_nick'],
//                 messageSendPersonAccount: messages[i]['u_account'],
//                 messageSnedTime: messages[i]['m_time']
//             };
//         }
//         callback(_messages);
//     });
// };




















// * @param tableName string 
// * @param whereJson json desc(and和or区别，其中的条件为key值、连接符大于小于还是等于、value值) 
// * @param orderByJson json desc({'key' : 'time', 'type':'desc'}) 
// * @param limitArr array desc（第一个元素是返回偏移量，第二个是返回数量，空返回全部）
// * @param fieldsArr array desc（返回哪些字段）
// * @param callback function
// * @return null

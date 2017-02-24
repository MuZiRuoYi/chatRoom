/*
 * socket.io 监听处理
 */
// IO.sockets.on('connection', function(socket) {
// 	/*
// 	 * 向客户端推送当前账号、聊天室未阅读消息
// 	 */
// 	socket.on('getUnReadMessage', function(data) {
// 		// console.log(data);
// 		// console.log(data['account'] + '||' + data['chatRoomId']);
// 		lead.message.getUnReadMessage(data['account'], data['chatRoomId'], function(messages) {
// 			for(var i = 0; i < messages.length; i++) {
// 				var nick = '';
// 				if(messages[i].messageSendPersonNick == '') {
// 					nick = messages[i].messageSendPersonAccount;
// 				}
// 				socket.emit('unReadMessage', {
// 					chatRoomId: data['chatRoomId'], 
// 					snedPersonName: nick,
// 					message: messages[i].messageContent,
// 					time: messages[i].messageSnedTime
// 				});
// 			}
// 		});
// 	});
    
//     /*
//      * socket.io 错误处理
//      */
// 	socket.on('error', function(err) {
// 		console.log(err);
// 	});
// });


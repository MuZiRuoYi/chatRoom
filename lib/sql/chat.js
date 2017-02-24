/*
 * 判断是不是已有账号
 */
// IO.socket.on('isUserAccount', function(data) {
// 	//
// });





/*
 * sockets.io监听
 */
// IO.sockets.on('connection', function(socket) {
// 	// socket.on('send/:id', function(data) {
// 	// 	console.log(data);
// 	// });

//     // 新建聊天室时判断用户账号是否正确
//     socket.on('isUserAccount', function(account){
//     	lead.userSql.searchUser(account, function(isUser) {
//     		if(!isUser) {
//     			socket.emit()
//     		}
//     	});
//     });
// });





// // io.sockets.on('connection', function (socket) {
// //   //有新的连接,count加1,将现在的总连接数,广播给所有用户.
// //   count++;
// //   socket.emit('usernum',{number:count});
// //   socket.broadcast.emit('usernum',{number:count});
// //   //一旦有请求,连接到服务器,则监听message事件,读取信息,然后将这个信息广播给所有的连接,包括新的连接和老的连接.
// //   socket.on('message', function (data) {
// //     socket.emit('push message', data);
// //     socket.broadcast.emit('push message', data);
// //   });
// //   //监听断开连接,count减1,然后将总连接数发送给其他全部客户端
// //   socket.on('disconnect',function(){
// //     count--;
// //     socket.broadcast.emit('usernum',{number:count});
// //   });
// // }); 
$(function(){
	// 初始化全局变量 
    var socket = io.connect('http://127.0.0.1:1337');
    var userAccount = $('.userAccount').val().trim();
    
    // 请求所拥有聊天室
    socket.emit('getOwnAllChatRooms', {account: userAccount});

    // 请求所在聊天室
    socket.emit('getInAllChatRooms', {account: userAccount});

    // 接收到所有所拥有聊天室
    socket.on('pushOwnAllChatRooms', function(ownChatRoomObjs) {
    	for(var i = 0; i < ownChatRoomObjs.length; i++) {
    		var chatRoom = {
    			name: ownChatRoomObjs[i].chatRoomName,
    			id: ownChatRoomObjs[i].chatRoomId
    		};
    		addOwnChatRoomNode(chatRoom);
    	}

    	// 获取到聊天室，初始化首个聊天室样式
    	$('.chatRoomName').eq(0).addClass('isChating');
        // $('.chatRoomName').eq(0).css('background', '#DDDDDD');

        // 获取到聊天室，初始化首个聊天室聊天记录
        if(firstChatRoomId = $('.chatRoomName').eq(0).children('input').val()) {
            var firstChatRoomId = $('.chatRoomName').eq(0).children('input').val().trim();
            socket.emit('chatLog', {chatRoomId: firstChatRoomId});
        }
    });

    // 接收到所在所有聊天室
    socket.on('pushInAllChatRooms', function(inAllChatRoomObjs) {
    	for(var i = 0; i < inAllChatRoomObjs.length; i++) {
    		addInChatRoomNode(inAllChatRoomObjs[i]);
    	}
    });
    
    // 接收聊天室消息推送，接收单个聊天室消息，非在线聊天消息广播推送
    socket.on('pushChatLog', function(messages) {
    	$('.chatLog').html('');
    	showMessage(messages);
    });

    // 点击发送消息
    $('.chat').on('click', 'input', function() {
    	var messageContent = $('.chat textarea').val();
        $('.chat textarea').val('');
    	var chatRoomId = '';
    	$('.chatRoomName').each(function() {
    		if($(this).attr('class').split('isChating').length > 1) {
    			chatRoomId = $(this).children('input').val().trim();
    		}
    	});
    	// 向服务端提交消息内容
    	socket.emit('inlineChatingContent', {
    		content: messageContent, 
    		chatRoomId: chatRoomId, 
    		sendUser: userAccount
    	});
    });

    // 展示聊天记录
    function showMessage(messages) {
    	
    	for(var i = 0; i < messages.length; i++) {
    		var messageNode = '<p>' + messages[i].sendUser + '---' + messages[i].time + '</p>' +
    		                  '<p>' + messages[i].content + '</p>';
    		$('.chatLog').append(messageNode);
    	}
    }
    
    // 点击查看本聊天室聊天信息
    $('.chatRoom').on('click', '.chatRoomName', function() {
    	// 改变当前聊天室样式
    	$('.chatRoomName').removeClass('isChating');
    	// $(this).css('background', '#DDDDDD');
    	$(this).addClass('isChating');
    	// 请求聊天信息
    	var chatRoomId = $(this).children('input').val().trim();
    	socket.emit('chatLog', {chatRoomId: chatRoomId});
    });

    // 点击新建聊天室
	$('.addChatRoom').on('click', function() {
		$('.chatRoomMessage').css('display', 'block');
	});
    
    // 取消新建
	$('.cancleAdd').on('click', function() {
		$('.chatRoomMessage').css('display', 'none');
	});

	// 点击增加输入用户账号
	$('.addUser').on('click', function() {
		$('.newChatRoomUser'). before('<tr><td></td><td><input type="text" class="needUserAccount"></td><tr>');
	});
    
	// 增加聊天室时输入用户账号输入框时检查用户账号正确性
	$('.chatRoomMessage').on('blur', '.needUserAccount', function() {
		var account = $(this).val().trim();
		if(account != '') {
			// 判断是否是已注册用户
			socket.emit('isUserAccount', {account: account});
		}
	});
	
	// 监听到创建聊天室时用户账号输入错误
    socket.on('isNotUser', function(data) {
    	if(!data.isUser) {
    		$('.needUserAccount').parent().before('<p>' + data.account + ' is\'t a user.' + '</P>');
    	}
	});

	// 接收在线消息广播
	socket.on('pushInlineMessage', function(data) {
        for(var i = 0; i < data.accounts.length; i++) {
            if(data.accounts[i].toString() == userAccount.toString()) {
                $('.chatRoomName').each(function () {
                    if($(this).children('input').val().trim() == data.chatRoomId) {
                        // $(this).children('.red').html('1');
                        if($(this).children('.red')){
                        	var hasNum = parseInt($(this).children('.red').html());
                        	$(this).children('.red').html(++hasNum);
                        } else {
                        	// $(this).append('<span class="red">' + 0 + '</span>')
                        }
                    }
                });
            }
        }
	});
	
	// 确定创建聊天室
	$('.okAddChatRoom').on('click', function() {
		var hasAccounts = [];
		$('.needUserAccount').each(function() {
			hasAccounts.push($(this).val().trim());
		});
		var chatRoomName = $('.newchatRoomName input').val().trim();
		var createUser = $('.userAccount').val().trim();
		// 添加聊天室
		socket.emit('addChatRoom', {
			createUser: createUser, 
			chatRoomName: chatRoomName, 
			hasAccounts: hasAccounts
		});
	});
    
    // 监听到成功创建聊天室
	socket.on('creatChatRoomSuccessed', function(chatRoom) {
			$('.chatRoomMessage').css('display', 'none');
		    //$('.newChatRoomUser').html('');
		    addOwnChatRoomNode({
		    	name: chatRoom.chatRoomName,
		    	id: chatRoom.chatRoomId
		    });
		    alert('创建成功！')
	});

	// 被拉进某聊天室
	socket.on('enterChatRoom', function(data) {
		for(var i = 0; i <data.accounts.length; i++) {
			if(data.accounts[i] == userAccount) {
				alert('你被拉进' + data.createUser + '创建的' + data.chatRoomName + '聊天室！');
                addInChatRoomNode({
					name: data.chatRoomName,
					id: data.chatRoomId
				});
				break;
			}
		}
	});
    
    // 添加自己创建聊天室节点
	function addOwnChatRoomNode(chatRoom) {
		var node = '<tr>' + 
		        '<td class="chatRoomName">' + chatRoom.name + '<input type="hidden" value=" ' + chatRoom.id + '"/></td>' +
		        '<td><input type="button" value="解散" class="dissolut"></td>' +
		    '</tr>';
		$('.chatRoom table').eq(0).append(node);
	}

	// 添加所在聊天室节点
	function addInChatRoomNode(chatRoom) {
		var node = '<tr>' + 
		        '<td class="chatRoomName">' + chatRoom.name + '<input type="hidden" value=" ' + chatRoom.id + '"/></td>' +
		        '<td><input type="button" value="退出" class="exit"></td>' +
		    '</tr>';
		$('.chatRoom table').eq(1).append(node);
	}

    // 解散 聊天室
    $('.chatRoom').on('click', 'input.dissolut', function () {
        var chatRoomId = $(this).parent('td').parent('tr').children('.chatRoomName').children('input').val().trim();
        socket.emit('dissolutChatRoom', chatRoomId);
        $(this).parent('td').parent('tr').html('');
    });
    // 退出 聊天室
    $('.chatRoom').on('click', 'input.exit', function () {
        var chatRoomId = $(this).parent('td').parent('tr').children('.chatRoomName').children('input').val().trim();
        socket.emit('exitChatRoom', {
            chatRoomId: chatRoomId,
            userAccount: userAccount
        });
        $(this).parent('td').parent('tr').html('');
    });
});




// var 
		// socket.emit();

// socket.on('isNotUser', function(data) {
	// 	alert(data);
	// });


	// $('.chatRoom li').eq(0).css({'background': '#7DDD86', 'color': '#FFFFFF'});



		/*_this = $(this);
	    
         http://127.0.0.1:1337
	     $.ajax({
			type: 'POST',
			url: '/checkUserAccount',
			data: {'account': account},
			dataType: 'JSON',
			jsonpCallback: 'callback',
			success: function(data) {
			},
			error: function(err) {
			}
		});*/



		// alert(account);
		// $.ajax({
		// 	type: 'POST',
		// 	url: 'http://127.0.0.1:1337/checkUserAccount',
		// 	data: {'account': account},
		// 	dataType: 'JSON',
		// 	jsonpCallback: 'callback',
		// 	success: function(data) {
		// 		// alert(data);
		// 		if(!data) {
		// 			$(this).val('');
		// 		}
		// 	},
		// 	error: function(err) {
		// 		// alert(err);
		// 	}
		// });

    
    /*获取未阅读消息内容
    socket.on('unReadMessage', function(data) {
    	$('.chatCon h2').after('<p>' + data.snedPersonName + '----' + data.time + '</p>');
    	$('.chatCon h2').after('<p>      ' + data.message + '</p>');
    });
    
    点击查看聊天室消息
	$('.chatRoom li').on('click', function() {
		var chatRoomId = $(this).children('.chatId').val().trim();
		var account = $('.userAccount').val().trim();

		$('.chatRoom li').css({'background': '#DDDDDD', 'color': '#000000'});
		$(this).css({'background': '#7DDD86', 'color': '#FFFFFF'});
		$(this).children('.red').text('0');

		socket.emit('getUnReadMessage', {'account': account, 'chatRoomId': chatRoomId});
	});*/

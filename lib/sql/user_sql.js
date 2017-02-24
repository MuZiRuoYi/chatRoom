/*
 * 数据库插入新用户
 */
exports.insertUser = function(user, callback) {
    var sqlModel = new lead.sqlBasic();
    sqlModel.insert('user', {
        'u_account': user.u_account,
        'u_name'   : user.u_name,
        'u_sex'    : user.u_sex,
        'u_age'    : user.u_age,
        'u_pass'   : user.u_pass,
        'u_nick'   : user.u_nick
     }, function(ret){
        // console.log(ret);
       callback(ret);
    });
};

/*
 * 通过账号获得账号所有信息
 */
function getUserAllInforByAccount(account, callback) {
    // var result = {};
    // console.log(account);
	var sqlModel = new lead.sqlBasic();
    sqlModel.findOneById('user', {
        'u_account': account
    }, function(ret) {
        // console.log(ret);
        if(ret) {
            var result = {
                u_account: ret['u_account'],
                u_name: ret['u_name'],
                u_sex: ret['u_sex'],
                u_age: ret['u_age'],
                u_pass: ret['u_pass'],
                u_nick: ret['u_nick']
            };
        }
        // console.log(result);
        callback(result);
    });
}

/*
 * 通过账号密码判断时是否存在用户
 */
exports.getUserByLogin = function(account, pass, callback) {
    getUserAllInforByAccount(account, function(ret) {
        if(!ret) {
            callback(false);
        }
        if(ret.u_pass == pass) {
            callback(ret);
        } else {
            callback(false);
        }
    });
};

/*
 * 查找用户，返回无密码用户信息
 */
exports.searchUser = function(account, callback) {
    // console.log(account);
    getUserAllInforByAccount(account, function(result){
        // console.log(result);
        if(result == null) {
            callback(false); // 用户不存在
        } else {
            delete result.u_pass;
            callback(result);
        }
    });
};





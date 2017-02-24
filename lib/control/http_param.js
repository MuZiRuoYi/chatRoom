var _res, _req;
/*
 * 初始化res和req参量
 */
exports.init = function (res, req) {
    _res = res;
    _req = req;
};

/**
 * 获取GET参数方法
 */
exports.GET = function (key) {
    var paramStr = lead.url.parse(_req.url).query,
		param = lead.querystring.parse(paramStr);
    return param[key] ? param[key] : '';
};

/**
 * 获取POST参数方法
 */
exports.POST = function (keyArr, callback) {
    var postData = '';
    _req.addListener('data', function (postDataChunk) {
        postData += postDataChunk;
    });
    _req.addListener('end', function () {
        // 数据接收完毕，执行回调函数
        var param = lead.querystring.parse(postData);
        var valArr = new Array();
        if (keyArr) {
            for(var i = 0; i < keyArr.length; i++) {
                valArr[i] = param[keyArr[i]] ? param[keyArr[i]] : '';
            }
            callback(valArr);
        } else {
            callback(false);
        }
    });
};
/*
 * 响应字符串输出
 */
exports.writeWord = function(res, str) {
	res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
	res.end(str);
};

/*
 * 响应HTML界面
 */
exports.writeHtml = function(res, page) {
	var realPage = lead.fs.readFileSync(VIEW + page);
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(realPage);
}

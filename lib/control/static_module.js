var	CACHE_TIME = 60 * 60 * 24 * 365;
var mmieConf = lead.getConfig.get('http');

/**
 *
 * 响应静态资源请求
 * @param string pathname
 * @param object res
 * @return null
 */
exports.getStaticFile = function (pathname, res, req, staticPath) {
    var extname = lead.path.extname(pathname);
    extname = extname ? extname.slice(1) : '';
    var realPath = staticPath + pathname;
    var mmieType = mmieConf[extname] ? mmieConf[extname] : 'text/plain';
    lead.fs.exists(realPath, function (exists) {
        if (!exists) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            // res.write();
            res.end("This request URL " + pathname + " was not found on this server.");
        } else {
            var fileInfo = lead.fs.statSync(realPath);
            var lastModified = fileInfo.mtime.toUTCString();
            /* 设置缓存 */
            if (mmieConf[extname]) {
                var date = new Date();
                date.setTime(date.getTime() + CACHE_TIME * 1000);
                res.setHeader("Expires", date.toUTCString());
                res.setHeader("Cache-Control", "max-age=" + CACHE_TIME);
            }
            if (req.headers['if-modified-since'] && lastModified == req.headers['if-modified-since']) {
                res.writeHead(304, "Not Modified");
                res.end();
            } else {

                lead.fs.readFile(realPath, "binary", function (err, file) {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end(err.toString());
                    } else {
                        res.setHeader("Last-Modified", lastModified);
                        res.writeHead(200, { 'Content-Type': mmieType });
                        res.write(file, "binary");
                        res.end();
                    }
                });
            }
        }
    });
}

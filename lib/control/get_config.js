/*
 * 获取配置文件对象
 * 参数：配置对象名  字符串
 */
exports.get = function(key) {
	var configJson = {};
    try {
        var str = lead.fs.readFileSync(CONF + 'configure.json', 'utf8');
        configJson = JSON.parse(str);
    } catch(e) {
        lead.sys.debug("JSON parse fails");
    }
    return configJson[key];
};

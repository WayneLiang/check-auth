var qq = require('./lib/checkQq');
var wechat = require('./lib/checkWechat');
var weibo = require('./lib/checkWeibo');
module.exports = function(){
    return {
        qq: qq,
        wechat: wechat,
        weibo: weibo
    };
};
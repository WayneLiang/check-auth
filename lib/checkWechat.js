var request = require('superagent');
module.exports = {
    check : function (data,callback) {
        if(!data.uid || !data.token){
            callback('please input uid and token');
        }else{
            request.get('https://api.weixin.qq.com/sns/userinfo?access_token='+data.token+'&openid='+data.uid)
                .end(function (err, res) {
                    if(err || (res.text && res.text.errcode)){
                        return callback(err || res.text.errcode);
                    }
                    if(res.text && res.text.openid && res.text.openid == data.uid ){
                        callback(null,true);
                    }else{
                        callback(null,false);
                    }
                });
        }
    }
};
var request = require('superagent');
module.exports = {
    check : function (data,callback) {
        if(!data.uid || !data.token){
            callback('please input uid and token');
        }else{
            request.get('https://api.weibo.com/2/account/get_uid.json?access_token=' + data.token)
                .end(function (err, res) {
                    if(err){
                        return callback(err);
                    }
                    if(res.text && res.text.uid && res.text.uid == data.uid ){
                        callback(null,true);
                    }else{
                        callback(null,false);
                    }
                });
        }
    }
};
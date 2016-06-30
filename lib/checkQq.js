var request = require('superagent');
var crypto = require('crypto');
module.exports = {
    check : function (params,callback) {
        if(!params.type || !params.data || !params.appkey ||!params.uri){
            callback('please input type,data(),appkey,uri');
        }else{
            request.get('http://openapi.tencentyun.com'+params.uri+'?sig='+sign(params) + objectToSting(params.data))
                .end(function (err, res) {
                    if(err || !res.text ){
                        return callback(err || 'qq no response');
                    }
                    if( res.text.errcode ){
                        callback(null,false);
                    }else{
                        callback(null,true);
                    }
                });
        }
    }
};
function objectToSting(data) {
    var dataKeys = Object.keys(data).sort();
    var dataString = '';
    dataKeys.forEach(function (key) {
        dataString += key + '=' + data[key] + '&';
    });
    return dataString.substring(0,dataString.length-1);
}

function sign(params) {
    var encodeUrI =  encodeURIComponent(params.uri);
    var dataKeys = Object.keys(params.data).sort();
    var dataString = objectToSting(params.data);
    var encodeData = encodeURIComponent(dataString);
    var signSting = data.type + '&' + encodeUrI + '&' + encodeData;
    return crypto.createHmac('sha1', params.appkey + '&').update(signSting).digest().toString('base64');
}


var request = require("request");
var iconv = require('iconv-lite');
var Promise = require("bluebird");
function getProxyList() {
    _proxy_list_length = Math.floor(Math.random() * Math.floor(10));
    if (_proxy_list_length < 2) {
        _proxy_list_length = 3;
    }
    _proxy_list_length = 1000
    var apiURL = 'http://www.66ip.cn/mo.php?sxb=&tqsl=' + _proxy_list_length + '&port=&export=&ktip=&sxa=&submit=%CC%E1++%C8%A1&textarea=http%3A%2F%2Fwww.66ip.cn%2F%3Fsxb%3D%26tqsl%3D100%26ports%255B%255D2%3D%26ktip%3D%26sxa%3D%26radio%3Dradio%26submit%3D%25CC%25E1%2B%2B%25C8%25A1';
    return new Promise((resolve, reject) => {
        var options = {
            method: 'GET',
            url: apiURL,
            gzip: true,
            encoding: null,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
                'User-Agent': 'Mozilla/8.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36',
                'referer': 'http://www.66ip.cn/'
            },

        };
        request(options, function (error, response, body) {
            try {
                if (error) throw error;
                if (/meta.*charset=gb2312/.test(body)) {
                    body = iconv.decode(body, 'gbk');
                }
                var ret = body.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,4}/g);
                resolve(ret);
            } catch (e) {
                return reject(e);
            }


        });
    })
}
function execute() {
    getProxyList().then(function (proxyList) {
        let _headers = ["Mozilla/5.0 (Windows Phone 10.0; Android 4.2.1; Microsoft; Lumia 550) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Mobile Safari/537.36 Edge/14.14263", "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36", "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 10 Build/MOB31T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36", "Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; LGMS323 Build/KOT49I.MS32310c) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/65.0.3325.181 Mobile Safari/537.36", "Mozilla/5.0 (Linux; U; Android 4.0; en-us; GT-I9300 Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36", "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1", "Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36", "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1", "Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Mobile Safari/537.36"]
        let _headers_index = Math.floor(Math.random() * Math.floor(_headers.length));
        let request = require('request');
        let urls = proxyList;
        let async = require('async')
        let options = {
            method: 'POST',
            url: 'http://www.shcntect.com/apps/interact/toupiaoMax.htm',
            form: {
                'zstype': null,
                'id[]': '20e7661836e011e883be6c92bf43ba8e'
            },
            headers: { "User-Agent": _headers[_headers_index] }
        }
        function postUrl(url, _start_time, callback) {
            let delay = parseInt((Math.random() * 80000) % 10000, 10);
            options.proxy = 'http://' + url;
            request(options, function (error, response, body) {
                try {
                    _body = JSON.parse(body)
                    if ('success' in _body) {
                        body = body.toString();
                        console.log(body);
                    }
                } catch (e) {
                }
            });
            callback(null, url);
        }
        async.mapLimit(urls, 100, function (url, callback) {
            let _start_time = Date.now();
            postUrl(url, _start_time, callback);
        }, function (err, result) {
        })
    });
}
execute();
// var cron = require('node-cron');
// var task = cron.schedule('*/1 * * * *', function () {
//     execute();
// }, false);
// task.start();

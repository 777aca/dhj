'use strict';

var isTest = window.location.origin.indexOf('test') > -1;
// var defaultLink = 'https://www-test.worldqi.com';
var defaultLink = 'https://projectj-admin-website.worldqi.com';
var request = {
    // getToken() {
    //   return Tools.getUserInfo() ? Tools.getUserInfo().token : "";
    // },
    _get: function _get(url, callback, lang) {
        if (!url) {
            return;
        }
        var requestUrl = defaultLink + url;

        fetch(requestUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                language: lang || "en"
            }
        }).then(function (result) {
            // if (result.status == 401) {
            //   Tools.debounce(function () {
            //     alert("身份过期,请重新登录");
            //     window.location.replace("/index.html");
            //     localStorage.isLogin = 0;
            //     Tools.deleteUserInfo();
            //   }, 100);
            // }
            if (result.ok) {
                result.json().then(function (obj) {
                    if (obj.code === 200) {
                        if (obj) {
                            callback && callback(obj);
                        }
                    }
                })['catch'](function (error) {
                    // console.log(error);
                });
            }
        })['catch'](function (error) {
            // console.log(error);
        });
    },
    _post: function _post(url, data, callback, lang) {
        if (!url) {
            return;
        }
        var requestUrl = defaultLink + url;
        var formData = new FormData();
        if (data) {
            // console.log(data);
            for (var key in data) {
                if (data[key] || data[key] == 0) {
                    formData.append(key, data[key]);
                }
            }
        }

        fetch(requestUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                language: lang || "en"
            },
            body: JSON.stringify(data)
        }).then(function (result) {
            // if (result.status == 401) {
            //   Tools.debounce(function () {
            //     alert("身份过期,请重新登录");
            //     window.location.replace("/index.html");
            //     localStorage.isLogin = 0;
            //     Tools.deleteUserInfo();REQUEST_BASE_URL
            //   }, 100);
            // }
            if (result.ok) {
                result.json().then(function (obj) {
                    if (obj.code === 200) {
                        if (obj) {
                            callback && callback(obj);
                        } else {
                            alert(obj.msg);
                            callback && callback(obj);
                        }
                    } else {
                        callback && callback(obj);
                    }
                })['catch'](function (error) {
                    // console.log(error);
                });
            }
        })['catch'](function (error) {
            // console.log(error);
        });
    },
    _put: function _put(url, data, callback, lang) {
        if (!url) {
            return;
        }
        var requestUrl = defaultLink + url;
        var formData = new FormData();
        if (data) {
            // console.log(data);
            for (var key in data) {
                if (data[key] || data[key] == 0) {
                    formData.append(key, data[key]);
                }
            }
        }

        fetch(requestUrl, {
            method: "PUT",
            headers: {
                Authorization: requestUrl.indexOf("login") == -1 ? getToken() : "",
                "Content-Type": "application/json;charset=utf-8",
                language: lang || "en"
            },
            body: formData
        }).then(function (result) {
            if (result.ok) {
                result.json().then(function (obj) {
                    if (obj.code === 200) {
                        if (obj) {
                            callback && callback(obj);
                        }
                    }
                })['catch'](function (error) {
                    // console.log(error);
                });
            }
        })['catch'](function (error) {
            // console.log(error);
        });
    },

    // 发短信
    sendSmsCode: function sendSmsCode(data, callback) {
        this._post('/api/plugins/krp-plugins-ntes/f/dhj/generateCode', data, callback);
    },
    // 预约
    submit: function submit(data, callback) {
        this._post('/api/plugins/krp-plugins-ntes/f/dhj/appointment', data, callback);
    }
};
"use strict";

var timer = null; // 存储定时器

var Tools = {
    debounce: function debounce(func) {
        var wait = arguments.length <= 1 || arguments[1] === undefined ? 600 : arguments[1];

        return (function () {
            var _this = this; // 注意 this 指向
            var _arguments = arguments; // arguments中存着e

            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                func.apply(_this, _arguments);
            }, wait);
        })();
    },

    // 获取用户资料
    getLocalStorage: function getLocalStorage(name) {
        var info = localStorage.getItem(name);
        if (info) {
            info = JSON.parse(info);
        } else {
            return null;
        }

        return info;
    },

    // 写入用户资料
    setLocalStorage: function setLocalStorage(name, data) {
        if (data) {
            localStorage.setItem(name, JSON.stringify(data));
        }
    },
    // 删除用户资料
    deleteLocalStorage: function deleteLocalStorage(name) {
        localStorage.removeItem(name);
    },

    // 传入相对路径，返回完整链接
    getResourceUrl: function getResourceUrl(url) {
        if (!url || url.indexOf("http") >= 0) {
            return url;
        }
        return CONFIG["RESOURCE_BASE_URL"] + url;
    },
    // 传入完整链接，返回相对路径
    getResourceUrlRe: function getResourceUrlRe(url) {
        if (!url || url.indexOf("http") < 0) {
            return url;
        }
        return url.replace(CONFIG["RESOURCE_BASE_URL"], "");
    },

    //判读移动端是否是横屏
    isLandscapeScreen: function isLandscapeScreen() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        if (/ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) {
            return true;
        } else {
            return false;
        }
    },

    //判读移动端是否是横屏
    isLandscapeScreenNoIpad: function isLandscapeScreenNoIpad() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        if (/iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent)) {
            return true;
        } else {
            return false;
        }
    },
    isIpad: function isIpad() {
        var ua = navigator.userAgent.toLowerCase();
        if (/ipad/i.test(ua) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1) {
            return true;
        } else {
            return false;
        }
    },

    backOs: function backOs() {
        var ua = navigator.userAgent,
            isWindowsPhone = /(?:Windows Phone)/.test(ua),
            isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
            isAndroid = /(?:Android)/.test(ua),
            isFireFox = /(?:Firefox)/.test(ua),
            isChrome = /(?:Chrome|CriOS)/.test(ua),
            isTablet = /(?:iPad|PlayBook)/.test(ua) || isAndroid && !/(?:Mobile)/.test(ua) || isFireFox && /(?:Tablet)/.test(ua),
            isPhone = /(?:iPhone)/.test(ua) && !isTablet,
            isPc = !isPhone && !isAndroid && !isSymbian;
        return {
            isTablet: isTablet,
            isPhone: isPhone,
            isAndroid: isAndroid,
            isPc: isPc
        };
    },

    getFontScale: function getFontScale() {
        var fontScale = window.innerWidth / 750;

        if (fontScale > 1) {
            fontScale = 1;
        }
        return fontScale;
    },
    //验证字段是否存在，并且内容是否合法
    validate: function validate(fields) {
        if (!fields || fields.toString().replace(/\s+/g, "") == "" || fields == "null" || fields == "undefined" || fields == 0) {
            return false;
        } else {
            return true;
        }
    },

    // 从当前链接截取需要的参数
    getParameter: function getParameter(name, url) {
        var link = url || window.location.href;
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = link.split("?");
        if (r && r[1]) {
            r = r[1].substr(0).match(reg);
            if (r != null) return decodeURI(r[2]);
        }

        return null;
    },
    // 替换换行符
    replaceStringLine: function replaceStringLine(str) {
        var newStr = str.replace(/\r\n/g, "<br>");
        newStr = str.replace(/\n/g, "<br>");

        return newStr;
    },

    //获取链接中的文件名
    getFileName: function getFileName(str) {
        return str.replace(/.*(\/|\\)/, "");
    },

    //本地预览图片
    convertPreviewLocalUrl: function convertPreviewLocalUrl(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    },

    // 短信倒数
    smsCountdown: function smsCountdown(count, callback) {
        var InterValObj = window.setInterval(function () {
            if (count <= 0) {
                window.clearInterval(InterValObj);
            } else {
                count--;
            }
            if (callback) {
                callback(count);
            }
            return true;
        }, 1000);
    },

    //获取滚动条当前的位置
    getScrollTop: function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    },

    //获取当前可是范围的高度
    getClientHeight: function getClientHeight() {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        } else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
    },

    //获取文档完整的高度
    getScrollHeight: function getScrollHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    },

    //添加cookies
    setCookie: function setCookie(name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    //读取cookies
    getCookie: function getCookie(name) {
        var arr,
            reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
    },

    //删除cookies
    delCookie: function delCookie(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(name);
        if (cval != null) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    },

    // 回到顶部
    scrollToTop: function scrollToTop() {
        document.body.scrollTop = 0;
    },

    // 返回是否是h5
    changePx: function changePx() {
        if (window.innerWidth > 750) {
            return false;
        } else {
            return true;
        }
    },

    getOs: function getOs() {
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Win") > -1) {
            var version = "Windows";
            if (userAgent.indexOf("Windows NT 5.0") > -1) {
                version = "Windows 2000";
            } else if (userAgent.indexOf("Windows NT 5.1") > -1 || userAgent.indexOf("Windows NT 5.2") > -1) {
                version = "Windows XP";
            } else if (userAgent.indexOf("Windows NT 6.0") > -1) {
                version = "Windows Vista";
            } else if (userAgent.indexOf("Windows NT 6.1") > -1 || userAgent.indexOf("Windows 7") > -1) {
                version = "Windows 7";
            } else if (userAgent.indexOf("Windows NT 6.2") > -1 || userAgent.indexOf("Windows 8") > -1) {
                version = "Windows 8";
            } else if (userAgent.indexOf("Windows NT 6.3") > -1) {
                version = "Windows 8.1";
            } else if (userAgent.indexOf("Windows NT 6.2") > -1 || userAgent.indexOf("Windows NT 10.0") > -1) {
                version = "Windows 10";
            } else {
                version = "Unknown";
            }

            return version;
        } else if (userAgent.indexOf("iPhone") > -1) {
            return "Iphone";
        } else if (userAgent.indexOf("Mac") > -1) {
            return "Mac";
        } else if (userAgent.indexOf("x11") > -1 || userAgent.indexOf("unix") > -1 || userAgent.indexOf("sunname") > -1 || userAgent.indexOf("bsd") > -1) {
            return "Unix";
        } else if (userAgent.indexOf("Linux") > -1) {
            if (userAgent.indexOf("Android") > -1) {
                return "Android";
            } else {
                return "Linux";
            }
        } else {
            return "Unknown";
        }
    }
};
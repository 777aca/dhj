"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById("progressCanvas");
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "transparent";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var progress = 0;
    var bgImage = new Image();
    var fgImage = new Image();
    var os = Tools.backOs();
    var filePrefix = '';
    if (!os.isTablet && (os.isAndroid || os.isPhone)) {
        filePrefix = '../';
    }

    if (location.port == '8080') {
        bgImage.src = "../img/pc/loading_bg1.png";
        fgImage.src = "../img/pc/loading_fg1.png";
    } else {
        bgImage.src = filePrefix + "./file" + "/img/pc/loading_bg1.png";
        fgImage.src = filePrefix + "./file" + "/img/pc/loading_fg1.png";
    }

    // 更新进度条的函数
    function updateProgressBar(progress) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bgImage, 0, 0);
        // 计算前景图片的宽度
        var fgHeight = fgImage.height * progress / 100;

        ctx.drawImage(fgImage, 0, 0, fgImage.width, fgHeight, 0, 0, fgImage.width, fgHeight);
    }

    fgImage.onload = function () {
        var interval = setInterval(function () {
            if (progress < 80) {
                progress += 1;
                updateProgressBar(progress);
            } else {
                clearInterval(interval);
            }
        }, 50);
    };

    window.onload = function () {
        var timer = setInterval(function () {
            if (progress < 100) {
                progress += 1;
                updateProgressBar(progress);
            } else {
                clearInterval(timer);

                setTimeout(function () {
                    document.getElementById('progressCanvas').remove();
                    document.querySelector(".loading").classList.add("logout");
                }, 1000);
            }
        }, 50);
    };
});
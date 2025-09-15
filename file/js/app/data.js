"use strict";

var os = Tools.backOs();
var filePrefix = "./file";
if (!os.isTablet && (os.isAndroid || os.isPhone)) {
  filePrefix = "../file";
}
if (location.port == "8080") {
  filePrefix = "../../";
}

var pcNav = [
  {
    idx: 0,
    name: "首页",
    newslink: "index.html",
  },
  {
    idx: 1,
    name: "特色",
    newslink: "index.html?page=1",
  },
  {
    idx: 4,
    name: "资讯",
    newslink: "index.html?page=4",
  },
  {
    idx: 5,
    name: "视听",
    newslink: "index.html?page=5",
  },
];

// 首页弹窗视频
var homeVideo = filePrefix + "/img/pc/video/page-home.mp4";
// bgm
var bgmLink = filePrefix + "/data/bgm.mp3?1";

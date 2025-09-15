"use strict";

var channelObj = {
  PC: "ZZzZZKrp1834144183280078848f87b1",
  IOS: "ZZzZZKrp1834144115890196480f3654",
  Android: "ZZzZZKrp183414415398705971291cc4",
};

new Vue({
  el: "#jweb",
  data: {
    mySwiper: "",
    mySwiper3: "",
    swiper3Index: 0,
    signPopup: false, // 验证码预约弹窗
    xcxShow: false, // 小程序预约弹窗
    xcxQdCurIndex: 0,
    device_type: "Android",
    form: { channel: channelObj["Android"] },
    checked: false,
    timer: "",
    isMobile: false,
    videoPopup: false,
    showTips: false,
    tips: "",
    alerttips: "",
    countdown: 0,
    yesSubmit: false,
    swiperIndex: 0,
    pageList: {
      0: "首页",
      1: "特色",
      4: "资讯",
      5: "视听",
    },
    isFold: false,
    videoPopup: false,
    clickSubmit: false,
    requestYes: false,
    landscapePopup: false,
    homeVideo: null,
    slideVideo2: null,
    slideVideo3_1: null,
    slideVideo3_2: null,
    slideVideo3_3: null,
    slideVideo4: null,
    showCms: 0,
    newsBannerSw: null, // 新闻banner轮播
    videoOnIndex: 0, // 视听视频标记
    jtOnIndex: 0, // 视听截图标记
    tpOnIndex: 0, // 视听图片标记
    showMediaPop: false,
    showType: "", //视听展示模块标记
    showMediaVideo: false,
    mediaBigImgIndex: 0, //视听大图标记
    mediaData: "", // 视听展示数据存储
    isImg: false,
    bgmStatus: false,
  },

  // 音频状态
  mounted: function mounted() {
    var _this = this;

    var vueOs = Tools.backOs();
    if (vueOs.isAndroid || vueOs.isPhone) {
      this.isMobile = true;
      this.isFold = true;
    }

    this.initScreen(750);

    this.showTsVideo(0);

    document.addEventListener("gesturestart", function (e) {
      e.preventDefault();
    });

    this.listenLandscape(vueOs);
    window.addEventListener("resize", function () {
      _this.listenLandscape(vueOs);
    });
    this.mySwiper = new Swiper("#mySwiper", {
      direction: "vertical",
      slidesPerView: "auto",
      spaceBetween: 0,
      mousewheel: true,
      lazy: {
        loadPrevNext: true,
        loadOnTransitionStart: true,
      },
      autoHeight: false,
      watchSlidesProgress: true,
      watchSlidesVisibility: true,
      threshold: 0,
      on: {
        init: function init() {
          _this.handleAnimate("fadeInDown");
        },
        slideChange: function slideChange(_ref) {
          var realIndex = _ref.realIndex;

          _this.swiperIndex = realIndex;
          _this.handleAnimate("fadeInDown");

          _this.showTsVideo();

          if (realIndex == 0) {
            _this.showTsVideo(0);
          }
          if (realIndex == 1) {
            // this.slideVideo2.play();
            _this.showTsVideo(1);
          }
          if (realIndex == 2) {
            _this.showTsVideo(_this.swiper3Index + 2);
          }

          if (realIndex == 3) {
            _this.showTsVideo(5);
          }
        },
      },
    });

    this.mySwiper3 = new Swiper("#swiper3", {
      slidesPerView: 1,
      effect: "fade",
      lazy: {
        loadPrevNext: true,
        loadOnTransitionStart: true,
      },
      navigation: {
        nextEl: ".swiper_button-next",
        prevEl: ".swiper_button-prev",
      },
      // 如果需要分页器
      // pagination: {
      //     el: ".swiper3_pagination",
      // },
      on: {
        slideChange: function slideChange(_ref2) {
          var realIndex = _ref2.realIndex;

          if (_this.mySwiper.realIndex == 2) {
            _this.swiper3Index = realIndex;

            _this.showTsVideo(_this.swiper3Index + 2);
          }
        },
      },
    });

    this.newsBannerSw = new Swiper(".news-banner", {
      slidesPerView: 1,
      effect: "fade",
      autoplay: true, //等同于以下设置
      autoplay: {
        disableOnInteraction: false,
      },
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false,
      },
      lazy: {
        loadPrevNext: true,
        loadOnTransitionStart: true,
      },
      // 如果需要分页器
      pagination: {
        el: ".banner_pagination",
      },
    });

    setTimeout(function () {
      new Swiper(".slide6_scroll", {
        direction: "vertical",
        slidesPerView: "auto",
        spaceBetween: -1,
        nested: true,
        resistanceRatio: 0,
        freeMode: true,
        mousewheel: true,
        autoHeight: true,
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      });
    }, 200);
  },
  computed: {
    // 页面导航标记
    pageNavIndex: function pageNavIndex() {
      if (this.swiperIndex == 0) {
        return 0;
      } else if (this.swiperIndex >= 1 && this.swiperIndex < 4) {
        return 1;
      } else if (this.swiperIndex == 4) {
        return 4;
      } else if (this.swiperIndex == 5) {
        return 5;
      } else {
        return -1;
      }
    },
  },
  methods: {
    initScreen: function initScreen(designWidth) {
      var minWidth =
        arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var maxWidth =
        arguments.length <= 2 || arguments[2] === undefined
          ? Infinity
          : arguments[2];

      var width = computeWidth();
      if (width > 0) {
        document.documentElement.style.fontSize =
          (width / designWidth) * 100 + "px";
      }

      window.addEventListener("resize", function () {
        document.documentElement.style.fontSize =
          (computeWidth() / designWidth) * 100 + "px";
      });

      function computeWidth() {
        var width =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth ||
          window.screen.width;
        width = Math.max(width, minWidth);
        width = Math.min(width, maxWidth);
        return width;
      }
    },
    initVideo: function initVideo(key, url, id, loop, func) {
      var _this2 = this;

      if (document.querySelector("" + id).innerHTML) {
        if (this[key]) {
          this[key].seek(0);
          this[key].play();
        }
        return;
      }
      document.querySelectorAll(".hideBg").forEach(function (v, i) {
        v.classList.remove("hideBg");
      });
      document.querySelector("" + id).innerHTML =
        '<canvas id="' + id + '_can"></canvas>';

      this.$nextTick(function () {
        _this2[key] = new JSMpeg.Player(url, {
          muted: true,
          canvas: document.querySelector("" + id).querySelectorAll("canvas")[0],
          loop: loop,
          progressive: true,
          onEnded: function onEnded() {
            if (func) {
              _this2[func](key);
            }
          },
          onPlay: function onPlay() {
            document.querySelector("" + id).classList.add("hideBg");
            if (
              key == "homeVideo" &&
              !document.querySelector("" + id).style.opacity
            ) {
              document.querySelector("" + id).style.opacity = "1";
            }
          },
        });

        _this2[key].play();
      });
    },
    showTsVideo: function showTsVideo(index) {
      var _this3 = this;

      // ts视频初始化

      this.homeVideo && this.homeVideo.pause();
      this.slideVideo2 && this.slideVideo2.pause();
      this.slideVideo3_1 && this.slideVideo3_1.pause();
      this.slideVideo3_2 && this.slideVideo3_2.pause();
      this.slideVideo3_3 && this.slideVideo3_3.pause();
      this.slideVideo4 && this.slideVideo4.pause();

      // document.querySelector('#homeVideo').innerHTML = '';
      // document.querySelector('#slideVideo2').innerHTML = '';
      // document.querySelector('#slideVideo3_1').innerHTML = '';
      // document.querySelector('#slideVideo3_2').innerHTML = '';
      // document.querySelector('#slideVideo3_3').innerHTML = '';
      // document.querySelector('#slideVideo4').innerHTML = '';

      this.showModelVideo = index;
      this.$nextTick(function () {
        switch (index) {
          case 0:
            _this3.initVideo(
              "homeVideo",
              // "../../assets/ts/home_video_mob.ts",
              // "https://mihoyo.genshinnet.com/test/sp.ts",
              "../../file/img/m/ts/sp.ts",
              "#homeVideo",
              true
            );
            break;
          case 1:
            _this3.initVideo(
              "slideVideo2",
              // "../../assets/ts/slide_video2_mob.ts",
              // "https://mihoyo.genshinnet.com/test/zjwx.ts",
              "../../file/img/m/ts/zjwx.ts",
              "#slideVideo2",
              true
            );
            break;
          case 2:
            _this3.initVideo(
              "slideVideo3_1",
              // "../../assets/ts/slide_video3_mob_1.ts",
              // "https://mihoyo.genshinnet.com/test/zsqt1.ts",
              "../../file/img/m/ts/zsqt1.ts",
              "#slideVideo3_1",
              false,
              "slide3Video1TimeUpdate"
            );
            break;
          case 3:
            _this3.initVideo(
              "slideVideo3_2",
              // "../../assets/ts/slide_video3_mob_2.ts",
              // "https://mihoyo.genshinnet.com/test/zsqt2.ts",
              "../../file/img/m/ts/zsqt2.ts",
              "#slideVideo3_2",
              false,
              "slide3Video1TimeUpdate2"
            );
            break;
          case 4:
            _this3.initVideo(
              "slideVideo3_3",
              // "../../assets/ts/slide_video3_mob_3.ts",
              // "https://mihoyo.genshinnet.com/test/zsqt3.ts",
              "../../file/img/m/ts/zsqt3.ts",
              "#slideVideo3_3",
              false,
              "slide3Video1TimeUpdate3"
            );
            break;
          case 5:
            _this3.initVideo(
              "slideVideo4",
              // "../../assets/ts/slide_video4_mob.ts",
              // "https://mihoyo.genshinnet.com/test/qbwh.ts",
              // "https://mihoyo.genshinnet.com/test/qbwh_v1.ts",
              "../../file/img/m/ts/qbwh_v1.ts",
              "#slideVideo4",
              true
            );
            break;
          default:
            document
              .querySelectorAll(".slide_item_bg")
              .forEach(function (v, i) {
                console.log(111);
                v.innerHTML = "";
              });
            break;
        }
      });
    },
    bgmplay: function bgmplay() {
      if (!this.$refs.refAudio.src) {
        this.showTipsFun("敬请期待");
      } else {
        if (this.bgmStatus) {
          this.$refs.refAudio.pause();
        } else {
          this.$refs.refAudio.play();
        }
        this.bgmStatus = !this.bgmStatus;
      }
    },
    slide3Video1TimeUpdate: function slide3Video1TimeUpdate(key) {
      if (this.swiper3Index == 0) {
        this.showTsVideo(3);
        this.mySwiper3.slideNext();
      }
    },
    slide3Video1TimeUpdate2: function slide3Video1TimeUpdate2(key) {
      if (this.swiper3Index == 1) {
        this.showTsVideo(4);
        this.mySwiper3.slideNext();
      }
    },
    slide3Video1TimeUpdate3: function slide3Video1TimeUpdate3(key) {
      if (this.swiper3Index == 2) {
        this.showTsVideo(2);
        this.mySwiper3.slideTo(0);
      }
    },
    mediaInit: function mediaInit() {
      var _this4 = this;

      // 视听中心初始化
      this.mediaBigImgIndex = 0;
      if (this.mediaData[this.mediaBigImgIndex].mp4) {
        var big_sw = new Swiper(".big_sw", {
          initialSlide: 0,
          slidesPerView: "auto",
          observer: true,
          observeParents: true,
          loop:
            document
              .querySelector(".videoModel")
              .getElementsByClassName("swiper-slide").length >= 2,
          centeredSlides:
            document
              .querySelector(".videoModel")
              .getElementsByClassName("swiper-slide").length < 2,
          spaceBetween: 10,
          slideToClickedSlide: true,
          // slidesOffsetBefore: 150,
          navigation: {
            nextEl: ".big_prev",
            prevEl: ".big_next",
          },
          on: {
            slideChange: function slideChange(swiper) {
              _this4.mediaBigImgIndex = swiper.realIndex;
            },
          },
        });
      } else {
        var big_Imgsw = new Swiper(".big_Imgsw", {
          initialSlide: 0,
          slidesPerView: "auto",
          observer: true,
          observeParents: true,
          centeredSlides: true,
          loop: true,
          spaceBetween: 10,
          slideToClickedSlide: true,
          // slidesOffsetBefore: 150,
          navigation: {
            nextEl: ".big_ImgPrev",
            prevEl: ".big_ImgNext",
          },
          on: {
            slideChange: function slideChange(swiper) {
              _this4.mediaBigImgIndex = swiper.realIndex;
            },
          },
        });
      }
    },
    showModel: function showModel(index) {
      var _this5 = this;

      this.showMediaPop = true;
      this.showType = index;

      this.mediaData = shitingData[this.showType];

      setTimeout(function () {
        _this5.mediaInit();
      }, 50);
    },
    showVideoFunc: function showVideoFunc() {
      //视频
      this.showMediaVideo = true;
      var video = document.createElement("video");
      this.isImg = false;

      video.controls = true;
      video.loop = true;
      video.autoplay = true; // 不自动播放
      video.src = shitingData[this.showType][this.mediaBigImgIndex].mp4;
      document.getElementById("mediaPop").appendChild(video);
    },
    showBigImg: function showBigImg() {
      // 图片
      this.showMediaVideo = true;
      this.isImg = true;
      var img = document.createElement("img");
      img.src = shitingData[this.showType][this.mediaBigImgIndex].download;

      document.getElementById("mediaPop").appendChild(img);
    },
    hideFunc: function hideFunc() {
      document.getElementById("mediaPop").textContent = "";
      this.showMediaVideo = false;
    },

    listenLandscape: function listenLandscape(vueOs) {
      if (vueOs.isAndroid || vueOs.isPhone) {
        if (window.innerWidth > window.innerHeight) {
          this.landscapePopup = true;
          this.tips = "请竖屏访问";
        } else {
          this.landscapePopup = false;
          this.tips = "";
        }
      }
      if (vueOs.isTablet || vueOs.isPc) {
        if (window.innerWidth > window.innerHeight) {
          this.landscapePopup = false;
          this.tips = "";
        } else {
          this.landscapePopup = true;
          this.tips = "请横屏访问";
        }
      }
    },

    jumpQuest: function jumpQuest() {
      window.open("https://www.wjx.cn/vm/wWdqocY.aspx");
    },

    // 点击menu
    changeSwiper: function changeSwiper(index) {
      this.mySwiper.slideTo(index);
      this.isFold = !this.isFold;
    },

    playVideo: function playVideo() {
      this.videoPopup = true;
      setTimeout(function () {
        var video = document.querySelector(".video_player");
        video.play();
      }, 1000);
    },

    // 打开预约弹窗
    showSign: function showSign() {
      // this.signPopup = true;
      this.xcxShow = true;
    },

    // 关闭预约弹窗
    hideSign: function hideSign() {
      this.signPopup = false;
      this.yesSubmit = false;
      this.requestYes = false;
      this.form.phone = "";
      this.form.code = "";
    },
    // 修改类型
    changeType: function changeType(val) {
      this.device_type = val;
      this.form.channel = channelObj[this.device_type];
    },

    // 校验手机号
    phoneRegCheck: function phoneRegCheck(phone) {
      var phoneRegExp = new RegExp(
        "^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$"
      );
      return phoneRegExp.test(phone);
    },

    //  验证码
    getSmsCode: function getSmsCode() {
      var _this6 = this;

      if (this.countdown) {
        return;
      }
      var ok = this.phoneRegCheck(this.form.phone);
      if (!ok) {
        this.showTipsFun("请输入正确的手机号");
        return;
      }
      this.countdown = 60;
      this.timer = setInterval(function () {
        _this6.countdown--;
        if (_this6.countdown <= 0) {
          clearInterval(_this6.timer);
        }
      }, 1000);
      request.sendSmsCode({ phone: this.form.phone }, function (res) {
        if (res.code == 200) {
          _this6.showTipsFun(res.msg);
        } else {
          _this6.countdown = 0;
          _this6.showTipsFun(res.msg);
        }
      });
    },

    showTipsFun: function showTipsFun(tips) {
      var _this7 = this;

      this.showTips = true;
      this.alerttips = tips;
      setTimeout(function () {
        _this7.showTips = false;
      }, 2000);
    },

    phoneInput: function phoneInput() {
      this.form.phone = this.form.phone.replace(/\D/g, "");
      this.changeForm();
    },

    codeInput: function codeInput() {
      this.form.code = this.form.code.replace(/\D/g, "");
      this.changeForm();
    },

    changeForm: function changeForm() {
      if (this.form.phone && this.form.code && this.checked) {
        this.yesSubmit = true;
      } else {
        this.yesSubmit = false;
      }
    },

    submitForm: function submitForm() {
      var _this8 = this;

      if (!this.yesSubmit) return;
      if (this.clickSubmit) return;
      this.clickSubmit = true;
      request.submit(this.form, function (res) {
        _this8.clickSubmit = false;
        if (res.code == 200) {
          _this8.requestYes = true;
        } else {
          _this8.showTipsFun(res.msg);
        }
      });
    },

    handleAnimate: function handleAnimate() {
      document
        .querySelectorAll(".animate__fadeInDown_custom")
        .forEach(function (el) {
          el.classList.remove("animate__fadeInDown_custom");
          el.style.opacity = 0;

          setTimeout(function () {
            el.classList.add("animate__fadeInDown_custom");
            el.style.opacity = 1;
          }, 200);
        });
      document.querySelectorAll(".animate__fadeIn").forEach(function (el) {
        el.classList.remove("animate__fadeIn");
        el.style.opacity = 0;
        setTimeout(function () {
          el.classList.add("animate__fadeIn");
          el.style.opacity = 1;
        }, 200);
      });
    },
  },
});

'use strict';

var channelObj = {
    pc: 'ZZzZZKrp1834144183280078848f87b1',
    ios: 'ZZzZZKrp1834144115890196480f3654',
    android: 'ZZzZZKrp183414415398705971291cc4'
};

var queryString = function queryString(key, href) {
    href = href === undefined ? location.search : href;
    var m = new RegExp("(?:&|/?)" + key + "=([^&$]+)").exec(href);
    return m ? m[1] : '';
};

new Vue({
    el: "#jweb",
    data: {
        curPage: "gw",
        mySwiper: "",
        swpZsqt: "",
        newsSwp: null,
        swpZsqtIndex: 0,
        newsIndex: 0,
        signPopup: false,
        channelObj: channelObj,
        form: {
            channel: channelObj.android
        },
        checked: false,
        timer: "",
        videoPopup: false,
        showTips: false,
        tips: "",
        countdown: 0,
        yesSubmit: false,
        swiperIndex: 0,
        pageList: pcNav,
        videoPopup: false,
        clickSubmit: false,
        orderType: "xcx",
        requestYes: false,
        landscapePopup: false,
        // editLoop: false,
        isWheeling: false,
        shitingType: false,
        shitingIndex: 0,
        hoverIndex: "",
        stvideoStatus: false,
        curPlayVideo: "",
        bgmStatus: false,
        bgmLink: bgmLink,
        isEnd: false
    },
    computed: {
        lastSwpIndex: function lastSwpIndex() {
            return this.mySwiper ? this.mySwiper.slides.length - 1 : 0;
        },
        menuIndex: function menuIndex() {
            if (this.swiperIndex === 0) {
                return 0;
            }
            if (this.swiperIndex > 0 && this.swiperIndex < 4) {
                return 1;
            }
            if (this.swiperIndex == 4) {
                return 2;
            }
            if (this.swiperIndex == 5) {
                return 3;
            }
            return 4;
        },
        showLogo: function showLogo() {
            return this.menuIndex != 2 && this.menuIndex != 4 && !this.shitingType;
        },
        shitingData: (function(_shitingData) {
            function shitingData() {
                return _shitingData.apply(this, arguments);
            }

            shitingData.toString = function() {
                return _shitingData.toString();
            };

            return shitingData;
        })(function() {
            return this.shitingType ? shitingData[this.shitingType] : {};
        }),
        showShitingData: function showShitingData() {
            return this.shitingData[this.shitingIndex];
        }
    },
    // slidesPerView() {
    //     return this.shitingData.length >= 3? 3: 2
    // },
    watch: {
        swiperIndex: {
            handler: function handler(n, o) {
                this.indexChange(n);
            },
            deep: true
        }
    },
    mounted: function mounted() {
        var _this = this;

        this.initScreen();
        window.onresize = function() {
            _this.initScreen();
        };

        document.addEventListener("gesturestart", function(e) {
            e.preventDefault();
        });

        this.windowAddMouseWheel();

        // this.listenLandscape(vueOs);
        // window.addEventListener("resize", () => {
        //     this.listenLandscape(vueOs);
        // });
        this.$nextTick(function() {
            _this.mySwiper = new Swiper("#mySwiper", {
                direction: "vertical",
                slidesPerView: "auto",
                resistanceRatio: 0,
                observer: true,
                observeParents: true,
                allowTouchMove: false,
                lazy: {
                    loadPrevNext: true,
                    loadOnTransitionStart: true
                },
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                on: {
                    init: function init() {
                        _this.handleAnimate("fadeInDown");
                        var videoHome = document.querySelector("#videoHome");
                        videoHome.play();
                    },
                    slideChangeTransitionStart: function slideChangeTransitionStart(_ref) {
                        var realIndex = _ref.realIndex;
                        var snapIndex = _ref.snapIndex;

                        _this.swiperIndex = realIndex;
                        _this.handleAnimate("fadeInDown");

                        if (_this.swpZsqt) {
                            var video = _this.swpZsqt.slides[_this.swpZsqtIndex].querySelector("video");
                            if (realIndex !== 2) {
                                video.pause();
                            } else {
                                video.currentTime = 0;
                                video.play();
                            }
                        }
                        var videoHome = document.querySelector("#videoHome");
                        if (!realIndex) {
                            videoHome.play();
                        } else {
                            videoHome.pause();
                        }

                        var videoZjwx = document.querySelector("#videoZjwx");
                        if (realIndex == 1) {
                            videoZjwx.currentTime = 0;
                            videoZjwx.play();
                        } else {
                            videoZjwx.pause();
                        }

                        var videoQbwh = document.querySelector("#videoQbwh");
                        if (realIndex == 3) {
                            videoQbwh.currentTime = 0;
                            videoQbwh.play();
                        } else {
                            videoQbwh.pause();
                        }
                    },
                    transitionEnd: function transitionEnd(swiper) {
                        // console.log('swiper.progress',swiper.progress)
                        // console.log('swiper.snapIndex',swiper.snapIndex)
                        _this.swiperIndex = swiper.snapIndex;
                        if (swiper.progress == 1) {
                            _this.isEnd = true;
                            // swiper.activeIndex = swiper.slides.length - 1
                            // this.swiperIndex = swiper.slides.length - 1;
                        } else {
                            _this.isEnd = false;
                        }
                    }
                }
            });

            window.SWP = _this.mySwiper;

            _this.swpZsqt = new Swiper("#swpZsqt", {
                slidesPerView: 1,
                effect: "fade",
                lazy: {
                    loadPrevNext: true,
                    loadOnTransitionStart: true
                },
                // 如果需要分页器
                pagination: {
                    el: ".swpZsqt_pagination",
                    clickable: true
                },
                on: {
                    slideChangeTransitionStart: function slideChangeTransitionStart(_ref2) {
                        var realIndex = _ref2.realIndex;

                        if (_this.mySwiper.realIndex == 2) {
                            _this.swpZsqtIndex = realIndex;
                            var video = _this.swpZsqt.slides[realIndex].querySelector("video");
                            video.currentTime = 0;
                            video.play();
                        }
                    }
                }
            });

            _this.newsSwp = new Swiper("#newsSwp", {
                slidesPerView: 1,
                autoplay: {
                    delay: 3000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false
                },
                lazy: {
                    loadPrevNext: true,
                    loadOnTransitionStart: true
                },
                // 如果需要分页器
                pagination: {
                    el: ".newsSwp_pagination",
                    clickable: true
                },
                on: {
                    slideChangeTransitionStart: function slideChangeTransitionStart(_ref3) {
                        var realIndex = _ref3.realIndex;
                    }
                }
            });

            var pageMd = queryString('page');
            if (pageMd && Number(pageMd) != NaN) {
                _this.mySwiper.slideTo(pageMd, 0);
                if (pageMd >= 4) {
                    _this.swpZsqtIndex = 2;
                } else {
                    _this.swpZsqtIndex = 0;
                }
                _this.swpZsqt.slideTo(_this.swpZsqtIndex);
            }

            $('#jweb').on('click', '.btn-download', function() {
                var src = $(this).attr('data-download');
                if (src) window.open(src, '_blank');
            });
        });
    },
    methods: {
        // addEventVideo() {
        //     let video = document.querySelector("#homeVideo");
        //     video.addEventListener("ended", (e) => {
        //         this.editLoop = true;
        //     });
        // },
        bgmPlay: function bgmPlay() {
            if (!bgmLink) {
                this.showTipsFun("敬请期待");
                return;
            }
            if (this.bgmStatus) {
                this.$refs.refAudio.pause();
            } else {
                this.$refs.refAudio.play();
            }
            this.bgmStatus = !this.bgmStatus;
        },
        playStVideo: function playStVideo() {
            // this.$refs.stvideo.currentTime = 0;
            // this.$refs.stvideo.play();
            // this.stvideoStatus = true;
            this.playVideoPop(this.showShitingData.mp4);
        },
        prevFn: function prevFn() {
            this.shitingIndex = this.shitingIndex == 0 ? 1 : 0;
        },
        nextFn: function nextFn() {
            this.shitingIndex = this.shitingIndex == 0 ? 1 : 0;
        },
        chooseItem: function chooseItem(index) {
            this.shitingIndex = index;
        },
        indexChange: function indexChange(realIndex) {
            // console.log('indexChange', realIndex)
        },
        // 鼠标移入
        handleMouseOver: function handleMouseOver(index) {
            this.hoverIndex = index;
        },
        // 鼠标移出
        handleMouseOut: function handleMouseOut() {
            this.hoverIndex = "";
        },
        showStDetail: function showStDetail(type) {
            var _this2 = this;

            if (this.isEnd) {
                return;
            }
            this.mySwiper.disable();
            this.shitingType = type;
            this.shitingIndex = 0;

            this.$nextTick(function() {
                new Swiper("#stSwp", {
                    observer: true,
                    observeParents: true,
                    slidesPerView: 3,
                    centeredSlides: true,
                    loop: true,
                    slideToClickedSlide: true,
                    lazy: {
                        loadPrevNext: true,
                        loadOnTransitionStart: true
                    },
                    navigation: {
                        nextEl: '.stSwp-next',
                        prevEl: '.stSwp-prev'
                    },
                    on: {
                        slideChangeTransitionStart: function slideChangeTransitionStart(_ref4) {
                            var realIndex = _ref4.realIndex;

                            _this2.shitingIndex = realIndex;
                        }
                    }
                });
            });
        },
        initScreen: function initScreen() {
            var fontsize = 625;
            // if (document.documentElement.clientWidth < 1400) {
            //   fontsize = (1400 / 1920) * 625;
            // } else if ( document.documentElement.clientWidth / document.documentElement.clientHeight > 3 ) {
            //   fontsize = ((document.documentElement.clientHeight * 3) / 1920) * 625;
            // } else {
            //   fontsize = (document.documentElement.clientWidth / 1920) * 625;
            // }
            fontsize = document.documentElement.clientWidth / 1920 * 625;
            $('html').css('font-size', fontsize + '%');
        },
        slide3Video1TimeUpdate: function slide3Video1TimeUpdate(e) {
            var video = document.querySelector("#videoZsqt1");

            if (this.swpZsqtIndex) {
                video.pause();
            }
            if (e.target.currentTime >= video.duration) {
                this.swpZsqt.slideNext();
            }
        },
        slide3Video1TimeUpdate2: function slide3Video1TimeUpdate2(e) {
            var video = document.querySelector("#videoZsqt2");
            if (this.swpZsqtIndex != 1) {
                video.pause();
            }
            if (e.target.currentTime >= video.duration) {
                this.swpZsqt.slideNext();
            }
        },
        slide3Video1TimeUpdate3: function slide3Video1TimeUpdate3(e) {
            var video = document.querySelector("#videoZsqt3");
            if (this.swpZsqtIndex != 2) {
                video.pause();
            }
            if (e.target.currentTime >= video.duration) {
                this.swpZsqt.slideTo(0);
            }
        },
        windowAddMouseWheel: function windowAddMouseWheel() {
            var _this3 = this;

            var scrollFunc = function scrollFunc(e) {
                if (_this3.isWheeling) return;

                if (_this3.signPopup) return;
                if (_this3.shitingType) return;
                _this3.isWheeling = true;
                e = e || window.event;
                var wheelDelta = e.wheelDelta ? e.wheelDelta : -e.detail * 50;

                // 往上
                if (wheelDelta > 30) {
                    if (_this3.swiperIndex === 0) {
                        _this3.isWheeling = false;
                        return;
                    }
                    if (_this3.swiperIndex == 2) {
                        if (_this3.swpZsqtIndex == 0) {
                            _this3.mySwiper.slideTo(1);
                        } else {
                            _this3.swpZsqt.slideTo(_this3.swpZsqtIndex - 1);
                        }
                    } else {
                        _this3.mySwiper.slideTo(_this3.swiperIndex - 1);
                    }
                }
                // 往下
                if (wheelDelta < 0) {
                    if (_this3.swiperIndex == 2) {
                        if (_this3.swiperIndex === _this3.mySwiper.slides.length - 1) {
                            _this3.isWheeling = false;
                            return;
                        }
                        if (_this3.swpZsqtIndex !== 2) {
                            _this3.swpZsqt.slideTo(_this3.swpZsqtIndex + 1);
                        } else {
                            _this3.mySwiper.slideTo(3);
                        }
                    } else {
                        _this3.mySwiper.slideTo(_this3.swiperIndex + 1);
                    }
                }
                var Timer = setTimeout(function() {
                    _this3.isWheeling = false;
                }, 500);
            };
            //给页面绑定滑轮滚动事件
            if (document.addEventListener) {
                //火狐使用DOMMouseScroll绑定
                document.addEventListener("DOMMouseScroll", scrollFunc, false);
            }
            //其他浏览器直接绑定滚动事件
            window.onmousewheel = document.onmousewheel = scrollFunc; //IE/Opera/Chrome
        },

        jumpQuest: function jumpQuest() {
            window.open("https://www.wjx.cn/vm/wWdqocY.aspx");
        },

        changeSwiper: function changeSwiper(index) {
            if (!this.mySwiper.enabled) {
                this.mySwiper.enable();
                this.shitingIndex = 0;
            }
            this.shitingType = false;
            this.mySwiper.slideTo(index);
        },
        // 从试听页返回
        backStpage: function backStpage() {
            this.shitingType = false;
            this.mySwiper.enable();
            this.shitingIndex = 0;
            // if(this.stvideoStatus) {
            //     this.$refs.stvideo.pause();
            //     this.stvideoStatus = false;
            // }
        },
        playVideo: function playVideo() {
            var mp4 = homeVideo;
            this.playVideoPop(mp4);
        },
        // 视频弹窗
        playVideoPop: function playVideoPop(mp4) {
            this.curPlayVideo = mp4;
            this.videoPopup = true;
            setTimeout(function() {
                var video = document.querySelector(".video_player");
                video.play();
            }, 1000);
        },

        hideVideo: function hideVideo() {},

        showSign: function showSign() {
            this.signPopup = true;
        },
        hideSign: function hideSign() {
            this.signPopup = false;
            this.yesSubmit = false;
            this.form.phone = "";
            this.form.code = "";
            this.orderType = "xcx";
        },
        changeType: function changeType(val) {
            this.form.channel = this.channelObj[val];
        },

        phoneRegCheck: function phoneRegCheck(phone) {
            var phoneRegExp = new RegExp("^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$");
            return phoneRegExp.test(phone);
        },

        //  验证码
        getSmsCode: function getSmsCode() {
            var _this4 = this;

            if (this.countdown) {
                return;
            }
            var ok = this.phoneRegCheck(this.form.phone);
            if (!ok) {
                this.showTipsFun("请输入正确的手机号");
                return;
            }
            this.countdown = 60;
            request.sendSmsCode({
                phone: this.form.phone
            }, function(res) {
                if (res.code == 200) {
                    _this4.showTipsFun(res.msg);
                    _this4.timer = setInterval(function() {
                        _this4.countdown--;
                        if (_this4.countdown <= 0) {
                            clearInterval(_this4.timer);
                        }
                    }, 1000);
                } else {
                    _this4.countdown = 0;
                    _this4.showTipsFun(res.msg);
                }
            });
        },

        showTipsFun: function showTipsFun(tips) {
            var _this5 = this;

            this.showTips = true;
            this.tips = tips;
            setTimeout(function() {
                _this5.showTips = false;
            }, 2000);
        },
        inputPhone: function inputPhone() {
            this.form.phone = this.form.phone.replace(/\D/g, '');
            this.changeForm();
        },
        inputCode: function inputCode() {
            this.form.code = this.form.code.replace(/\D/g, '');
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
            var _this6 = this;

            if (!this.yesSubmit) return;
            if (this.clickSubmit) return;
            this.clickSubmit = true;
            request.submit(this.form, function(res) {
                _this6.clickSubmit = false;
                if (res.code == 200) {
                    // this.showTipsFun("预约成功");
                    _this6.requestYes = true;
                } else {
                    _this6.showTipsFun(res.msg);
                }
            });
        },
        handleAnimate: function handleAnimate() {
            document.querySelectorAll('.animate__fadeInDown_custom').forEach(function(el) {
                el.classList.remove("animate__fadeInDown_custom");
                el.style.opacity = 0;

                setTimeout(function() {
                    el.classList.add("animate__fadeInDown_custom");
                    el.style.opacity = 1;
                }, 200);
            });
            document.querySelectorAll('.animate__fadeIn').forEach(function(el) {
                el.classList.remove("animate__fadeIn");
                el.style.opacity = 0;

                setTimeout(function() {
                    el.classList.add("animate__fadeIn");
                    el.style.opacity = 1;
                }, 200);
            });
        }
    }
});
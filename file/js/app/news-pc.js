"use strict";

new Vue({
    el: "#jweb",
    data: {
        curPage: "news",
        tips: "",
        pageList: pcNav,
        isFold: false,
        landscapePopup: false,
        menuIndex: 2,
        tips: "",
        bgmLink: bgmLink,
        bgmStatus: false,
        showTips: false,
        tips: ""
    },
    computed: {},
    watch: {},
    mounted: function mounted() {
        var _this = this;

        this.initScreen();
        window.onresize = function () {
            _this.initScreen();
        };

        var vueOs = Tools.backOs();
        if (vueOs.isAndroid || vueOs.isPhone) {
            this.isFold = true;
        }

        document.addEventListener("gesturestart", function (e) {
            e.preventDefault();
        });
    },
    methods: {
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
        showTipsFun: function showTipsFun(tips) {
            var _this2 = this;

            this.showTips = true;
            this.tips = tips;
            setTimeout(function () {
                _this2.showTips = false;
            }, 2000);
        },
        initScreen: function initScreen() {
            var fontsize = 625;
            var w = document.documentElement.clientWidth;
            if ($('html').hasClass('newsDetail')) {
                w = w <= 1400 ? 1400 : w;
            }
            // if (document.documentElement.clientWidth < 1400) {
            //   fontsize = (1400 / 1920) * 625;
            // } else if ( document.documentElement.clientWidth / document.documentElement.clientHeight > 3 ) {
            //   fontsize = ((document.documentElement.clientHeight * 3) / 1920) * 625;
            // } else {
            //   fontsize = (document.documentElement.clientWidth / 1920) * 625;
            // }
            fontsize = w / 1920 * 625;
            $('html').css('font-size', fontsize + "%");
        }
    }
});
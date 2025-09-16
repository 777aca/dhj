"use strict";

new Vue({
    el: "#jweb",
    data: {
        landscapePopup: false,
        tips: "",
        pageSize: 7, // 列表页每次展示数量
        pageNum: 1 },
    // 当前页
    computed: {},

    mounted: function mounted() {
        var _this = this;

        var vueOs = Tools.backOs();
        if (vueOs.isAndroid || vueOs.isPhone) {
            this.isMobile = true;
            this.isFold = true;
        }

        this.initScreen(750);

        document.addEventListener("gesturestart", function (e) {
            e.preventDefault();
        });

        this.listenLandscape(vueOs);
        window.addEventListener("resize", function () {
            _this.listenLandscape(vueOs);
        });
    },
    methods: {
        initScreen: function initScreen(designWidth) {
            var minWidth = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var maxWidth = arguments.length <= 2 || arguments[2] === undefined ? Infinity : arguments[2];

            var width = computeWidth();
            if (width > 0) {
                document.documentElement.style.fontSize = width / designWidth * 100 + 'px';
            }

            window.addEventListener('resize', function () {
                document.documentElement.style.fontSize = computeWidth() / designWidth * 100 + 'px';
            });

            function computeWidth() {
                var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || window.screen.width;
                width = Math.max(width, minWidth);
                width = Math.min(width, maxWidth);
                return width;
            }
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
        cutPage: function cutPage(index) {
            // 列表页翻页
            this.pageNum++;
        }
    }
});
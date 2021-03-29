<template>
    <div
        ref="scrollDiv"
        class="scroll-div"
        :class="{'is-scroll-native': isSurportNative, 'is-native-div': !needCustom, [viewClass]: !needCustom}"
        :style="viewStyle">
        <div
            v-if="needCustom"
            ref="scrollDivView"
            class="scroll-div-view"
            :class="{[viewClass]: needCustom}"
            :style="divStyle">
            <slot></slot>
            <div v-if="!needOptimize" class="scroll-view__padding" :style="{height: paddingBottom}"></div>
        </div>
        <div v-if="needCustom" ref="scrollY" class="scroll-div-y">
            <div ref="scrollYBar" class="scroll-div-y-bar" :class="{'is-show': showScrollY}"></div>
        </div>
        <div v-if="needCustom" ref="scrollX" class="scroll-div-x">
            <div ref="scrollXBar" class="scroll-div-x-bar" :class="{'is-show': showScrollX}"></div>
        </div>
        <slot v-if="!needCustom"></slot>
    </div>
</template>

<script>
export default {
    name: 'ScrollDiv',
    props: {
        height: {
            type: [Number, String],
            default: ''
        },
        width: {
            type: [Number, String],
            default: ''
        },
        padding: {
            type: String,
            default: ''
        },
        useNative: {
            type: Boolean,
            default: true
        },
        viewClass: {
            type: String,
            default: ''
        },
        optimize: {
            type: Boolean,
            default: true
        },
        scroll: {
            type: Function,
            default: () => {}
        },
        awaysShowScroll: {
            type: Boolean,
            default: false
        }
    },
    data () {
        const disabledOptimize = navigator.userAgent.indexOf('Firefox') > -1 || "ActiveXObject" in window || window.navigator.userAgent.indexOf("MSIE") > -1
        return {
            needCustom: false,
            isSurportNative: false,
            customScrollContainer: null,
            scrollContainer: null,
            scrollYBar: null,
            scrollXBar: null,
            scrollY: null,
            scrollX: null,
            showScrollY: false,
            showScrollX: false,
            startY: 0,
            startX: 0,
            distanceY: 0,
            distanceX: 0,
            timerY: null,
            timerX: null,
            scrollTop: 0,
            scrollLeft: 0,
            gutterWidth: 0,
            paddingBottom: 0,
            disabledOptimize
        }
    },
    computed: {
        needOptimize () {
            return this.optimize && !this.disabledOptimize
        },
        viewHeight () {
            return this.formatValue(this.height);
        },
        viewWidth () {
            return this.formatValue(this.width);
        },
        viewStyle () {
            const style = {};
            this.width && (style.width = this.viewWidth);
            this.height && (style.height = this.viewHeight);
            if (!this.needCustom && this.padding) {
                style.padding = this.padding;
            }
            return style;
        },
        divStyle () {
            const style = {};
            this.height ? (style.height = `calc(${this.viewHeight} + ${this.gutterWidth}px)`) : style['overflow-x'] = 'hidden';
            style.width = `calc(${this.width ? this.viewWidth : '100%'} + ${this.gutterWidth}px)`;
            if (this.padding) {
                style.padding = this.padding;
                if (!this.needOptimize) {
                    style['padding-bottom'] = 0;
                    this.calcPaddingBottom();
                }
            }
            return style;
        },
        barStyle () {
            return this.awaysShowScroll ? {
                opacity: 1
            } : {}
        }
    },
    methods: {
        formatValue (value) {
            return typeof value === 'number' ? `${value}px` : value;
        },
        calcPaddingBottom () {
            const ele = document.createElement('div')
            ele.style.padding = this.padding
            document.body.appendChild(ele)
            this.paddingBottom = ele.style.paddingBottom
            document.body.removeChild(ele)
        },
        handleScroll (el) {
            const e = el || event;
            const target = e.target || e.srcElement;
            let scroll, showScroll, scrollArea, clientArea, timer, scrollBar, isVertical, transform;
            if (target.scrollTop !== this.scrollTop) {
                scroll = 'scrollTop';
                showScroll = 'showScrollY';
                scrollArea = 'scrollHeight';
                clientArea = 'clientHeight';
                timer = 'timerY';
                scrollBar = 'scrollYBar';
                isVertical = true;
                transform = 'translateY';
            }
            if (target.scrollLeft !== this.scrollLeft) {
                scroll = 'scrollLeft';
                showScroll = 'showScrollX';
                scrollArea = 'scrollWidth';
                clientArea = 'clientWidth';
                timer = 'timerX';
                scrollBar = 'scrollXBar';
                isVertical = false;
                transform = 'translateX';
            }
            const scrollAreaValue = this.customScrollContainer[scrollArea];
            const clientAreaValue = this.customScrollContainer[clientArea];
            const scrollValue = this.customScrollContainer[scroll];
            this[showScroll] = true;
            this[timer] && clearTimeout(this[timer]);
            this.calcSize(isVertical);
            const distance = scrollValue * clientAreaValue / scrollAreaValue;
            this[scrollBar].style.transform = `${transform}(${distance}px)`;
            if (!this.awaysShowScroll) {
                this[timer] = setTimeout(() => {
                    this[showScroll] = false;
                }, 800);
            }
            this[scroll] = target[scroll];
        },
        clickStart (el) {
            const e = el || event;
            const target = e.target || e.srcElement;
            if (/scroll-div-y-bar/.test(target.className)) {
                this.startY = e.pageY;
                this.distanceY = this.customScrollContainer.scrollTop;
                this.scrollY.removeEventListener('mouseout', this.hoverOutSroll);
                document.addEventListener('mousemove', this.moveScrollYBar);
            } else {
                this.startX = e.pageX;
                this.distanceX = this.customScrollContainer.scrollLeft;
                this.scrollX.removeEventListener('mouseout', this.hoverOutSroll);
                document.addEventListener('mousemove', this.moveScrollXBar);
            }
            document.addEventListener('mouseup', this.clickEnd);
        },
        clickEnd () {
            document.removeEventListener('mousemove', this.moveScrollYBar);
            document.removeEventListener('mousemove', this.moveScrollXBar);
            document.removeEventListener('mouseup', this.clickEnd);
            if (!this.awaysShowScroll) {
                this.scrollY.addEventListener('mouseout', this.hoverOutSroll);
                this.scrollX.addEventListener('mouseout', this.hoverOutSroll);
            }
        },
        moveScrollYBar (el) {
            this.moveScrollBar(el, 'pageY', 'startY', 'scrollHeight', 'clientHeight', 'distanceY', 'scrollTop');
        },
        moveScrollXBar (el) {
            this.moveScrollBar(el, 'pageX', 'startX', 'scrollWidth', 'clientWidth', 'distanceX', 'scrollLeft');
        },
        moveScrollBar (el, pageOffset, start, scrollArea, clientArea, distance, scroll) {
            const e = el || event;
            const delta = e[pageOffset] - this[start];
            const scrollAreaValue = this.customScrollContainer[scrollArea];
            const clientAreaValue = this.customScrollContainer[clientArea];
            let change = scrollAreaValue * delta / clientAreaValue;
            change += this[distance];
            if (change < 0) {
                this.customScrollContainer[scroll] = 0;
                return;
            }
            if (change + clientAreaValue >= scrollAreaValue) {
                this.customScrollContainer[scroll] = scrollAreaValue - clientAreaValue;
                return;
            }
            this.customScrollContainer[scroll] = change;
        },
        hoverSrollYBar () {
            this.hoverScrollBar('scrollHeight', 'clientHeight', 'showScrollY', 'scrollYBar', 'scrollY', 'height');
        },
        hoverSrollXBar () {
            this.hoverScrollBar('scrollWidth', 'clientWidth', 'showScrollX', 'scrollXBar', 'scrollX', 'width');
        },
        hoverScrollBar (scrollArea, clientArea, showScroll, scrollBar, scrollBarArea, style) {
            const sA = this.customScrollContainer[scrollArea];
            const cA = this.customScrollContainer[clientArea];
            if (sA > cA) {
                this[scrollBar].style[style] = cA * cA / sA + 'px';
                this[showScroll] = true;
                this[scrollBar].addEventListener('mousedown', this.clickStart);
                this[scrollBarArea].addEventListener('mouseout', this.hoverOutSroll);
            }
        },
        hoverOutSroll (el) {
            const e = el || event;
            const target = e.target || e.srcElement;
            if (/(scroll-div-y)|(scroll-div-y-bar)/.test(target.className)) {
                this.showScrollY = false;
                this.scrollYBar.removeEventListener('mousedown', this.clickStart);
                this.scrollY.removeEventListener('mouseout', this.hoverOutSroll);
            } else {
                this.showScrollX = false;
                this.scrollXBar.removeEventListener('mousedown', this.clickStart);
                this.scrollX.removeEventListener('mouseout', this.hoverOutSroll);
            }
        },
        getOriginScrollWidth () {
            const box = document.createElement('div');
            box.style.cssText = 'width:100px;height:100px;overflow:scroll;';
            document.body.appendChild(box);
            this.gutterWidth = box.offsetHeight - box.clientHeight;
            this.needCustom = this.gutterWidth > 0;
            document.body.removeChild(box);
        },
        checkWebkit () {
            this.needCustom = navigator.userAgent.toLowerCase().indexOf('applewebkit') === -1;
            this.isSurportNative = !this.needCustom;
            return this.isSurportNative;
        },
        calcSize (isHeight) {
            let scrollBar,sizeKey,clientArea,scrollArea;
            if (isHeight) {
                scrollBar = 'scrollYBar';
                sizeKey = 'height';
                clientArea = 'clientHeight';
                scrollArea = 'scrollHeight';
            } else {
                scrollBar = 'scrollXBar';
                sizeKey = 'width';
                clientArea = 'clientWidth';
                scrollArea = 'scrollWidth';
            }
            const clientAreaValue = this.customScrollContainer[clientArea];
            this[scrollBar].style[sizeKey] = clientAreaValue * clientAreaValue / this.customScrollContainer[scrollArea] + 'px';
        },
        scrollTo (yPosition, xPosition) {
            const { scrollContainer } = this;
            if (yPosition === 'top') {
                scrollContainer.scrollTop = 0;
            } else if (!isNaN(+yPosition)) {
                scrollContainer.scrollTop = +yPosition;
            }
            if (xPosition === 'left') {
                scrollContainer.scrollLeft = 0;
            } else if (!isNaN(+xPosition)) {
                scrollContainer.scrollLeft = +xPosition;
            }
        },
        updateScrollBar () {
            const {clientHeight, clientWidth, scrollHeight, scrollWidth} = this.customScrollContainer
            const showScrollY = scrollHeight > clientHeight
            const showScrollX = scrollWidth > clientWidth
            this.scrollYBar.style.opacity = showScrollY ? 1 : 0
            this.scrollXBar.style.opacity = showScrollX ? 1 : 0
            showScrollY && this.calcSize(true)
            showScrollX && this.calcSize()
        }
    },
    created () {
        this.getOriginScrollWidth();
        this.needCustom && this.useNative && this.checkWebkit();
    },
    mounted () {
        if (this.scroll) {
            this.scrollContainer = this.needCustom ? this.$refs.scrollDivView : this.$refs.scrollDiv;
            this.scrollContainer.addEventListener('scroll', this.scroll);
        }
        if (!this.needCustom) { return; }
        this.customScrollContainer = this.$refs.scrollDivView;
        this.scrollY = this.$refs.scrollY;
        this.scrollX = this.$refs.scrollX;
        this.scrollYBar = this.$refs.scrollYBar;
        this.scrollXBar = this.$refs.scrollXBar;
        this.customScrollContainer.addEventListener('scroll', this.handleScroll);
        if (this.awaysShowScroll) {
            this.updateScrollBar()
            this.scrollYBar.addEventListener('mousedown', this.clickStart);
            this.scrollXBar.addEventListener('mousedown', this.clickStart);
        } else {
            this.calcSize(true);
            this.calcSize();
            this.scrollY.addEventListener('mouseover', this.hoverSrollYBar);
            this.scrollX.addEventListener('mouseover', this.hoverSrollXBar);
        }
    },
    destroyed () {
        if (!this.needCustom) { return; }
        this.customScrollContainer.removeEventListener('scroll', this.handleScroll);
        if (!this.awaysShowScroll) {
            this.scrollY.removeEventListener('mouseover', this.hoverSrollYBar);
            this.scrollX.removeEventListener('mouseover', this.hoverSrollXBar);
        }
    }
}
</script>

<style lang="scss">
@import 'index';
</style>
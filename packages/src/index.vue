<template>
    <div
        class="scroll-div"
        :class="{'is-scroll-native': isSurportNative, 'is-native-div': !needCustom, [viewClass]: !needCustom}"
        :style="divStyle">
        <div
            v-if="needCustom"
            ref="scrollDivView"
            class="scroll-div-view"
            :class="{[viewClass]: needCustom}"
            :style="viewStyle">
            <slot></slot>
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
        }
    },
    data () {
        return {
            needCustom: false,
            isSurportNative: false,
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
            gutterWidth: 0
        }
    },
    computed: {
        viewHeight () {
            return this.formatValue(this.height);
        },
        viewWidth () {
            return this.formatValue(this.width);
        },
        divStyle () {
            if (this.needCustom) {
                return {};
            } else {
                const style = {};
                this.width && (style.width = this.viewWidth);
                this.height && (style.height = this.viewHeight);
                this.padding && (style.padding = this.padding);
                return style;
            }
        },
        viewStyle () {
            const style = {};
            this.width && (style.width = this.viewWidth);
            this.height && (style.height = this.viewHeight);
            this.padding && (style.padding = this.padding);
            return style;
        }
    },
    methods: {
        formatValue (value) {
            return typeof value === 'number' ? `${value}px` : value;
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
            const scrollAreaValue = this.scrollContainer[scrollArea];
            const clientAreaValue = this.scrollContainer[clientArea];
            const scrollValue = this.scrollContainer[scroll];
            this[showScroll] = true;
            this[timer] && clearTimeout(this[timer]);
            this.calcSize(isVertical);
            const distance = scrollValue * clientAreaValue / scrollAreaValue;
            this[scrollBar].style.transform = `${transform}(${distance}px)`;
            this[timer] = setTimeout(() => {
                this[showScroll] = false;
            }, 800);
            this[scroll] = target[scroll];
        },
        clickStart (el) {
            const e = el || event;
            const target = e.target || e.srcElement;
            if (/scroll-div-y-bar/.test(target.className)) {
                this.startY = e.pageY;
                this.distanceY = this.scrollContainer.scrollTop;
                this.scrollY.removeEventListener('mouseout', this.hoverOutSroll);
                document.addEventListener('mousemove', this.moveScrollYBar);
            } else {
                this.startX = e.pageX;
                this.distanceX = this.scrollContainer.scrollLeft;
                this.scrollX.removeEventListener('mouseout', this.hoverOutSroll);
                document.addEventListener('mousemove', this.moveScrollXBar);
            }
            document.addEventListener('mouseup', this.clickEnd);
        },
        clickEnd () {
            document.removeEventListener('mousemove', this.moveScrollYBar);
            document.removeEventListener('mousemove', this.moveScrollXBar);
            document.removeEventListener('mouseup', this.clickEnd);
            this.scrollY.addEventListener('mouseout', this.hoverOutSroll);
            this.scrollX.addEventListener('mouseout', this.hoverOutSroll);
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
            const scrollAreaValue = this.scrollContainer[scrollArea];
            const clientAreaValue = this.scrollContainer[clientArea];
            let change = scrollAreaValue * delta / clientAreaValue;
            change += this[distance];
            if (change < 0) {
                this.scrollContainer[scroll] = 0;
                return;
            }
            if (change + clientAreaValue >= scrollAreaValue) {
                this.scrollContainer[scroll] = scrollAreaValue - clientAreaValue;
                return;
            }
            this.scrollContainer[scroll] = change;
        },
        hoverSrollYBar () {
            this.hoverScrollBar('scrollHeight', 'clientHeight', 'showScrollY', 'scrollYBar', 'scrollY', 'height');
        },
        hoverSrollXBar () {
            this.hoverScrollBar('scrollWidth', 'clientWidth', 'showScrollX', 'scrollXBar', 'scrollX', 'width');
        },
        hoverScrollBar (scrollArea, clientArea, showScroll, scrollBar, scrollBarArea, style) {
            const sA = this.scrollContainer[scrollArea];
            const cA = this.scrollContainer[clientArea];
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
            const clientAreaValue = this.scrollContainer[clientArea];
            this[scrollBar].style[sizeKey] = clientAreaValue * clientAreaValue / this.scrollContainer[scrollArea] + 'px';
        }
    },
    created () {
        this.getOriginScrollWidth();
        this.needCustom && this.useNative && this.checkWebkit();
    },
    mounted () {
        if (!this.needCustom) { return; }
        this.scrollContainer = this.$refs.scrollDivView;
        this.scrollY = this.$refs.scrollY;
        this.scrollX = this.$refs.scrollX;
        this.scrollYBar = this.$refs.scrollYBar;
        this.scrollXBar = this.$refs.scrollXBar;
        this.scrollContainer.style.cssText += `margin-right:-${this.gutterWidth}px;margin-bottom:-${this.gutterWidth}px;`
        this.calcSize(true);
        this.calcSize();
        this.scrollContainer.addEventListener('scroll', this.handleScroll);
        this.scrollY.addEventListener('mouseover', this.hoverSrollYBar);
        this.scrollX.addEventListener('mouseover', this.hoverSrollXBar);
        
    },
    destroyed () {
        if (!this.needCustom) { return; }
        this.scrollContainer.removeEventListener('scroll', this.handleScroll);
        this.scrollY.removeEventListener('mouseover', this.hoverSrollYBar);
        this.scrollX.removeEventListener('mouseover', this.hoverSrollXBar);
    }
}
</script>

<style lang="scss">
@import 'index';
</style>
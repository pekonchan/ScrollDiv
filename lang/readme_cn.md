# vue-scroll-div

[Change Log](https://github.com/pekonchan/ScrollDiv/wiki/Change-Log)

## 描述
此为`vue.js`版滚动容器组件，当需要展示滚动条是，实现与`mac os`浏览器上相类似的滚动条样式和效果，主要原因是`windows`系统上的浏览器原生滚动条样式比较丑陋

可用该组件替代类似`div`等容器使用，该组件的滚动条样式是类`mac os`风格。

## 特点
- 针对滚动条区域不占用内容本身空间，影响尺寸的浏览器滚动条，采用原生滚动条，组件最终也只会渲染成一个`div`标签。
    - 如`mac`系统上的绝大部分浏览器（暂时没遇到不是的），它的原生滚动条本身交互效果还是挺好且好看的，不需要自定义滚动条
    - 除上述`MAC`的情况外，由于方案的实现问题，对这类浏览器的滚动条不做自定义处理，如window系统上的浏览器，这种情况比较少见（暂时没遇到）。所以不为这种少数的情况做处理，增加方案复杂度。
    - 自定义滚动条会渲染成几个嵌套结构，增加DOM，所以能不用就不用了
- 针对非上述两种情况下的浏览器，一般为`window`系统的浏览器，如果是`webkit`内核的浏览器，组件就会利用`-webkit-scrollbar`等css方式自定义原生滚动条样式，最终渲染成一个`div`标签。——这个选择是用户可选的，可以不用这个效果。
- 除了上述情况，都会采用自定义滚动条方式，这样分情况来渲染不同的结果，可以最大程度上采用最简单的方式，来满足好看的滚动条样式。
- 弥补火狐和IE浏览器,对于`padding-bottom`设置"不起作用"的问题,行为跟chrome等浏览器保持一致性
- 能自动适应不同浏览器不同滚动条宽度,而不是写死常见的`17px`
- 组件是包含横向和垂直滚动条

简而言之，组件会采取“最优”的方案，在满足滚动条样式可观的情况下，采用渲染结构最简单，组件性能最好的方案。

想了解其中的自定义核心思路，可阅读我的文章[自定义滚动条全面方案详解](https://juejin.im/post/5e93d6736fb9a03c320bb36e)

## 安装
** 该插件不包含`vue.js`的引入，请你自行引入`vue.js` **

`<script>`方式直接引入`lib/vue-scroll-nav.umd.min.js`，如：
```js
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="node_modules/vue-scroll-nav/lib/vue-scroll-nav.umd.min.js"></script>
```
这样就可以在`Vue`应用里直接使用`<Scroll-Div>`标签了。

npm方式：
```
npm i vue-scroll-div
```
引入该插件之后，得注册组件
```js
import Vue from 'vue';
import ScrollDiv from 'vue-scroll-div';

Vue.use(ScrollDiv);
```

## 使用介绍
这是一个简单的使用情况
```html
<Scroll-Div width="400px" height="100px" view-class="yourclassname">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</Scroll-Div>
```
考虑到该组件会根据浏览器的环境来渲染出两个不同的`html`结构, 设置样式请遵循一下原则:

1. 设置宽高内边距请使用组件提供的`width`,`height`,`padding`属性，而不是自己在css中重新改样式；

2. 如果想要添加其他样式，请使用组件提供的`view-class`属性添加类名，然后通过类名添加样式。

如果你实在不想要通过以上两种方式的话，那么你在添加样式时请留意组件渲染出来的结构情况，视情况而定。

全局设置所有组件的一些`prop`属性，如设置自定义滚动条的一些样式：

```js
import Vue from 'vue'
import ScrollDiv from 'vue-scroll-div'

Vue.use(ScrollDiv, {
  barStyle: {
    backgroundColor: 'pink', // 滚动条的颜色
  },
  size: 6, // 滚动条的大小
  offset: 2 // 滚动条距离边界的偏移量
})
```

## Props
插件提供了足够的属性，让你针对不同的复杂情况来自定义它的行为。
- `height`：选填。设置容器的高度，值为`Number` or `String`类型，传入数字类型时，单位是`px`。该值默认不设置。
- `width`：选填。设置容器的宽度，值为`Number` or `String`类型，传入数字类型时，单位是`px`。该值默认不设置。
- `padding`：选填。设置容器的内边距，值为`String`类型，跟设置`css`的`padding`属性一样。该值默认不设置。
- `useNative`：选填。针对滚动条区域占用内容本身空间的浏览器（如window系统上绝大多数浏览器），如果浏览器是`webkit`内核，则可以用`css`样式改变原生滚动条样式。如果该值设置为`true`，则启用`css`改变滚动条样式，否则，用自定义滚动条。建议开启该项，能改善性能和减少dom结构。
- `viewClass`：选填。设置内容容器设置类名。除`width`,`height`,`padding`属性外，使用该值指定类名进行样式修改。
- `optimize`: 选填。优化在Firefox或IE浏览器下，自定义滚动条容器里，padding-bottom不起效的问题,会多渲染了一个无用的元素，故新增了该属性，默认值是`true`，即仅针对Firefox或IE浏览器才这么处理. 但是有一种情况,如果`Scroll-Div`容器内有一个容器设定了高度,内容过多溢出,但是未设置`overflow`,这种情况,`padding-bottom`的修复效果可能会欠佳存在不足.
- `scroll`: 选填。`Function`类型,传递一个函数,用作为滚动容器绑定滚动事件监听,函数的第一个形参是表示触发事件的`event`对象

注意以下属性只对自定义滚动条才生效，不是针对原生滚动条的设置

- `barStyle`：选填。`Object`类型，设置自定义滚动条的各种样式，传入css的各种属性组成的对象，值的形式跟在vue里的标签上使用:style一样。常见的设置滚动条的颜色，则值为`{backgroundColor: 'pink'}`
- `size`：选填。设置滚动条的大小，值为`Number` or `String`类型，传入数字类型时，单位是`px`。该值默认不设置。如传入8，则垂直滚动条宽度为8px，横向滚动条高度为8px。一般情况下，该属性值也会影响到滚动条的`border-radius`值，等同该值。如果用户有特别需求，可以另外设置`border-radius`样式进行覆盖，也可以用上述`barStyle`
- `offset`：选填。滚动条距离页面边界的偏移值，值为`Number` or `String`类型，传入数字类型时，单位是`px`。该值默认不设置。如传入2，则垂直滚动条距离页面右边边界2px，横向滚动条距离页面底部边界2px
- `awaysShowScroll`：设置滚动条是否一直显示，不消失（除没得滚动的情况下），值为`Boolean`类型，该值默认为`false`。由于以前只有滚动的时候滚动条才出现，出现的时候会重新基于容器的各种高度指标计算滚动条的长度比例，所以是没问题的。但是现在变成常驻的话，由于内容会发生改变，进而会影响滚动条的长度比例，目前暂时只能提供一个方法`updateScrollBar`暴露给使用者，使用者在内容发生变化或改变页面大小时需要主动调用这个方法以及时更改滚动条长度比例或是否展示。后续可优化这个如何监听变化机制。

## Methods
### scrollTo
可以指定滚动容器滚动到什么位置,接受两个入参
- `yPosition`: Number / String.  指定垂直滚动的位置,相当于设置`scrollTop`,当为String类型时,只有等于`top`,才起效,会滚动到顶部
- `xPosition`: Number / String.  指定横向滚动的位置,相当于设置`scrollLeft`,当为String类型时,只有等于`left`,才起效,会滚动到最左边

### updateScrollBar
当设置了`awaysShowScroll: true`，自定义滚动条常驻的场景下，使用者在内容发生变化或改变页面大小时需要主动调用这个方法以及时更改滚动条长度比例或是否展示。后续可优化这个如何监听变化机制。

## Support us
该组件或许还存在不足之处，或者你的使用场景更广阔，如果你有兴趣的话，可以一起努力完善这个组件。期待你的加入

[github](https://github.com/pekonchan/ScrollDiv)

有问题，也欢迎提出。

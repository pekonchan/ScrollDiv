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
- 自定义滚动条是悬浮内容上方的，不会挤兑容器空间
- 组件是包含横向和垂直滚动条

简而言之，组件会采取“最优”的方案，在满足滚动条样式可观的情况下，采用渲染结构最简单，组件性能最好的方案。


## demo
### 智能选择
不做滚动条显示模式设定的默认情况下，会根据您所在浏览器的特性而选择不同的方案
- macos 原生滚动条
- webkit内核使用css来美化原生滚动条
- 其他浏览器采用HTML元素模拟滚动条

![chrome默认情况](https://user-images.githubusercontent.com/38689834/121340123-cf287080-c951-11eb-8a9b-c17e8ebadf90.gif)

(chrome)

![火狐默认情况](https://user-images.githubusercontent.com/38689834/121340147-d94a6f00-c951-11eb-9e9f-d31609c64b0d.gif)

(firefox)

### 二次自定义
你可进一步自定义滚动条样式

![改变滚动条样式](https://user-images.githubusercontent.com/38689834/121340523-4eb63f80-c952-11eb-8eb6-935b53f1ed09.gif)

### more demo

- [github.io](https://pekonchan.github.io/common-ui/#/main/scroll-div)

- [codeopen](https://codepen.io/pekonchan/pen/bGqjjQV)

## 安装
**该插件不包含`vue.js`的引入，请你自行引入`vue.js`**

`<script>`方式直接引入，如：
```js
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/vue-scroll-div/lib/vue-scroll-div.umd.min.js"></script>
```
这样就可以在`Vue`应用里直接使用`<Scroll-Div>`标签了。

npm方式：

#### vue2版本：
```
npm i vue-scroll-div
```
引入该插件之后，得注册组件
```js
import Vue from 'vue';
import ScrollDiv from 'vue-scroll-div';

Vue.use(ScrollDiv);
```

#### vue3版本
```
npm i vue-scroll-div@vue3
```
安装后使用
```js
import ScrollDiv from 'vue-scroll-div'
import { createApp } from 'vue'

const app = createApp(App)
app.use(ScrollDiv)
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

> 注意: 当你使用的过程中发现隐藏的原生滚动出现了，请检查你是否设置或正确设置了容器的宽高


### 默认情况

![chrome默认情况](https://user-images.githubusercontent.com/38689834/121332966-eca60c00-c94a-11eb-941a-e15009940ae6.gif)

设置容器的宽高，请直接传值到props属性的`width`和`height`，以及你要设置`padding`。

可以直接传入`calc(100% - 10px)`这种字符串，支持数字类型和字符串。

`view-class`是为滚动容器添加类名，用于设置一些额外的样式，因为受到不同的自定义滚动条模式的影响，具体的滚动容器可能不一样。

> 注意view-class属性仅用来设置具体的滚动容器的一些样式，与滚动容器滚动无关的属性，直接请使用class。

不做滚动条显示模式设定的默认情况下，会根据您所在浏览器的特性而选择不同的方案
- macos 原生滚动条
- webkit内核使用css来美化原生滚动条
- 其他浏览器采用HTML元素模拟滚动条

```html
<scroll-div
    width="400px"
    height="100px"
    padding="5px"
    view-class="yourclassname">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</scroll-div>

<style>
    .yourclassname {
        margin: auto;
    }
</style>
```

### 仿MacOS效果

![仿macos](https://user-images.githubusercontent.com/38689834/121333438-650ccd00-c94b-11eb-8987-a32125a9e1e3.gif)


默认情况下`useNative`值为`true`，表示开启智能选择模式，即上述的默认情况，原生能支持就用原生的意思。

这里设置`useNative="false"`，关闭智能选择，固定采用仿MacOS的效果，即window系统下的所有浏览器都会采用自定义滚动条模拟

该模式能够很好地响应屏幕变化或内容变化引起的滚动容器滚动条长度的问题。

```html
<scroll-div height="100px" :use-native="false">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</scroll-div>
```

### 常驻滚动条模式

![火狐常驻情况](https://user-images.githubusercontent.com/38689834/121333477-6d650800-c94b-11eb-935a-83da9326df6f.gif)

Windows上的火狐IE等这些非webkit内核的浏览器上，会采用HTML元素模仿滚动条，默认是仿MacOS效果的滚动条，即只有滚动了才会出现。

如果你不想这样，可以开启常驻滚动条模式，只需要设置`awaysShowScroll="true"`

同样可以结合`useNative`来使用，来更加自由的定制所需模式

> 本示例最好在火狐或IE上体验

```html
<scroll-div height="100px" :aways-show-scroll="true">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</
scroll-div>
```

需要注意，开启了常驻模式且是自定义HTML滚动条的，目前暂时有个缺陷，就是当滚动容器尺寸或内容发生变化时，需要手动调用一下下述的`updateScrollBar`方法及时更新滚动条长度。 仿MacOS模式就没有这个缺陷

### 自定义滚动条样式

![改变滚动条样式](https://user-images.githubusercontent.com/38689834/121334775-8de19200-c94c-11eb-9349-837a9c359a14.gif)

组件本身已经自定义了相对大众美观一点的滚动条了，当然，你仍然有更好的自定义能力，可以通过`barStyle, size, offset`等参数进一步打造属于你的滚动条效果。

当然，这是针对用HTML元素模拟滚动条效果的情况下，才能生效的，即你得设置`useNative=false`

> 如果你仍然想要维持高性能的`:use-native="true"`智能选择模式下，在chrome这种webkit内核的浏览器上改变样式，你得自己在项目中写全局样式覆盖`-webkit-scrollbar`等样式。

```html
<scroll-div
    height="100px"
    :use-native="false"
    :bar-style="{backgroundColor: 'pink', borderRadius: '6px'}">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</scroll-div>
```

```html
<scroll-div
    height="100px"
    :use-native="false"
    :bar-style="{backgroundColor: 'rgba(255, 192, 203, .5)'}"
    size="10px"
    offset="6px"
    :aways-show-scroll="true">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</scroll-div>
```

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 | 是否必填 |
| ---- | -------------- | ------ |------- | -------- | --- |
| height | 容器高度 | String, Number. 传入数字类型时，单位是`px` | — | — | no |
| width | 容器宽度 | String, Number. 传入数字类型时，单位是`px` | — | — | no |
| padding | 容器的内边距 | String | — | — | no |
| useNative | 针对滚动条区域占用内容本身空间的浏览器（如window系统上绝大多数浏览器），<br>如果浏览器是webkit内核，则可以用css样式改变原生滚动条样式。<br>如果该值设置为true，则启用css改变滚动条样式，否则，用自定义滚动条。建议开启该项，能改善性能和减少dom结构。 | Boolan | true/false | true | no |
| viewClass | 内容容器设置类名。除width,height,padding属性外，使用该值指定类名进行对**滚动容器**样式修改。 | String | — | — | no |
| optimize | 优化在Firefox或IE浏览器下，自定义滚动条容器里，padding-bottom不起效的问题,会多渲染了一个无用的元素，故新增了该属性，默认值是true，即仅针对Firefox或IE浏览器才这么处理. 但是有一种情况,如果Scroll-Div容器内有一个容器设定了高度,内容过多溢出,但是未设置overflow,这种情况,padding-bottom的修复效果可能会欠佳存在不足 | Boolean | — | true | no |
| scroll | 传递一个函数,用作为滚动容器绑定滚动事件监听,函数的第一个形参是表示触发事件的`event`对象 | Function | — | — | no |
| barStyle | 设置自定义滚动条的各种样式，传入css的各种属性组成的对象，值的形式跟在vue里的标签上使用:style一样。 | Object | — | — | no |
| size | 设置滚动条的大小，如传入8，则垂直滚动条宽度为8px，横向滚动条高度为8px。一般情况下，该属性值也会影响到滚动条的border-radius值，等同该值。如果用户有特别需求，可以另外设置border-radius样式进行覆盖 | String, Number | — | — | no |
| offset | 滚动条距离页面边界的偏移值,该值默认不设置。如传入2，则垂直滚动条距离页面右边边界2px，横向滚动条距离页面底部边界2px | String, Number | — | — | no |
| awaysShowScroll | 设置滚动条是否一直显示，不消失（除没得滚动的情况下），变成常驻的话，由于内容会发生改变，进而会影响滚动条的长度比例，目前暂时只能提供一个方法updateScrollBar暴露给使用者，使用者在内容发生变化或改变页面大小时需要主动调用这个方法以及时更改滚动条长度比例或是否展示 | Boolean | — | false | no |
| zIndex | 设置滚动条的css样式`z-index`，默认情况下会有组件自身计算的一个层级值，如果你觉得不合适，可以手动传这个值用以控制。 | Number | — | — | no |

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

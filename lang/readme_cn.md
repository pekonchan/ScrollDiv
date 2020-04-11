# vue-scroll-div

## 描述
This is the scroll container component based on `vue.js`. This component is designed for, when the container need to show the scrollbar, it will show the scrollbar like that in mac os. Because of the scrollbar in Windows broswers is ugly.
此为`vue.js`版滚动容器组件，当需要展示滚动条是，实现与`mac os`浏览器上相类似的滚动条样式和效果，主要原因是`windows`系统上的浏览器原生滚动条样式比较丑陋

可用该组件替代类似`div`等容器使用，该组件的滚动条样式是类`mac os`风格。
You can use this component instead of the html like `div`.

### 特点
- 针对如`mac`系统上绝大多数浏览器，会采用原生的滚动条，组件最终也只会渲染成一个`div`标签。理由：
    - mac的原生滚动条本身交互效果还是挺好且好看的，不需要自定义滚动条
    - 自定义滚动条会渲染成几个嵌套结构，增加DOM，所以能不用就不用了
- 针对滚动条区域不占用内容本身空间，影响尺寸的浏览器滚动条（如mac系统浏览器，其实这是个特例），所以方案并不是简单地判断所在系统是否为`mac`。由于方案的实现问题，对这类浏览器的滚动条不做自定义处理，基本这类浏览器在window系统上比较少（暂时没遇到）。所以不为这种少数的情况做处理，增加方案复杂度。同样最终渲染成一个`div`标签。
- 针对非上述两种情况下的浏览器，一般为`window`系统的浏览器，如果是`webkit`内核的浏览器，组件就会利用`-webkit-scrollbar`等css方式自定义原生滚动条样式，最终渲染成一个`div`标签。——这个选择是用户可选的，可以不用这个效果。
- 除了上述情况，都会采用自定义滚动条方式，这样分情况来渲染不同的结果，可以最大程度上采用最简单的方式，来满足好看的滚动条样式。
- 组件是包含横向和垂直滚动条

简而言之，组件会采取“最优”的方案，在满足滚动条样式可观的情况下，采用渲染结构最简单，组件性能最好的方案。

## 安装
** 该插件不包含`vue.js`的引入，请你自行引入`vue.js` **

`<script>`方式直接引入`lib/vue-scroll-nav.umd.min.js`，如：
```
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
```
<Scroll-Div width="400px" height="100px" view-class="yourclassname">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</Scroll-Div>
```
设置宽高内边距最好使用组件提供的`width`,`height`,`padding`属性，而不是自己在css中重新改样式；

若如果真的要在`css`中覆盖样式或添加其他样式，请使用组件提供的`view-class`属性添加类名，然后通过类名添加样式。

如果你实在不想要通过以上两种方式的话，那么你在添加样式时请留意组件渲染出来的结构情况，视情况而定。因为该组件会根据浏览器的环境来渲染出两个不同的`html`结构。

## Props
插件提供了足够的属性，让你针对不同的复杂情况来自定义它的行为。
- `height`：选填。设置容器的高度，值为`Number` or `String`类型，传入数字类型时，单位是`px`。该值默认不设置。
- `width`：选填。设置容器的宽度，值为`Number` or `String`类型，传入数字类型时，单位是`px`。该值默认不设置。
- `padding`：选填。设置容器的内边距，值为`String`类型，跟设置`css`的`padding`属性一样。该值默认不设置。
- `useNative`：选填。针对滚动条区域占用内容本身空间的浏览器（如window系统上绝大多数浏览器），如果浏览器是`webkit`内核，则可以用`css`样式改变原生滚动条样式。如果该值设置为`true`，则启用`css`改变滚动条样式，否则，用自定义滚动条。建议开启该项，能改善性能和减少dom结构。
- `viewClass`：选填。设置内容容器设置类名。建议除`width`,`height`,`padding`属性外，使用该值指定类名进行样式修改。

## Support us
该组件或许还存在不足之处，或者你的使用场景更广阔，如果你有兴趣的话，可以一起努力完善这个组件。期待你的加入

[github](https://github.com/pekonchan/scrollNav)

有问题，也欢迎提出。
# vue-scroll-div

[Change Log](https://github.com/pekonchan/ScrollDiv/wiki/Change-Log)

[中文版说明](https://github.com/pekonchan/ScrollDiv/blob/master/lang/readme_cn.md)

## Description
This is the scroll container component based on `vue.js`. This component is designed for, when the container need to show the scrollbar, it will show the scrollbar like that in mac os. Because of the scrollbar in Windows broswers is ugly.

You can use this component instead of the html like `div`.

## Feature
- The scrollbar area does not occupy the content itself space, which affects the size of the browser scrollbar. We will use the native scrollbar, and components end up being rendered as a `div` tag.
    - The MAC's native scrollbar itself is nice and interactive, and doesn't require a custom scrollbar
    - In addition to the case of 'MAC' mentioned above, due to the implementation problems of the scheme, the scrollbar of this type of browser is not customized, and this type of browser is relatively rare in the window system (not encountered yet). So don't add to the complexity of the solution by dealing with these few cases.
    - Custom scrollbars render several nested structures, it will adding DOM, so it's no neccessary to use them.
- For browsers other than the above two cases, the browser is generally the 'window' system browser, if it is the 'webkit' kernel browser, the component will use the '-webkit-scrollbar' and other CSS methods to customize the native scrollbar style, the final rendering as a 'div' tag. This option is optional for the user.
- In addition to the above, custom scrollbar methods are used to render different results in different cases, which can be the most simple way to satisfy the beautiful scrollbar style.
- Fix firefox and Internet Explorer, the 'padding-bottom' setting doesn't work, act the same as chrome and other browsers
- Can automatically adapt to different browser scroll bar width, rather than write the usual '17px'
- Custom scrollbars are above suspended content and do not crowd container space
- The component contains horizontal and vertical scroll bars

In short, the component takes the "best" approach, with the simplest rendering structure and the best component performance, provided the scrollbar style is significant.

## demo
### auto chose mode
By default, no scrollbar mode will be set, depending on the features of your browser
- MacOS native scrollbars
- The WebKit kernel uses CSS to beautify the native scrollbars
- Other browsers use HTML elements to simulate scrollbars

![chrome默认情况](https://user-images.githubusercontent.com/38689834/121340123-cf287080-c951-11eb-8a9b-c17e8ebadf90.gif)

(chrome)

![火狐默认情况](https://user-images.githubusercontent.com/38689834/121340147-d94a6f00-c951-11eb-9e9f-d31609c64b0d.gif)

(firefox)

### deep custom
You can second custom the scrollbars use the props

![改变滚动条样式](https://user-images.githubusercontent.com/38689834/121340523-4eb63f80-c952-11eb-8eb6-935b53f1ed09.gif)

### more demo

- [github.io](https://pekonchan.github.io/common-ui/#/main/scroll-div)

- [codeopen](https://codepen.io/pekonchan/pen/bGqjjQV)

## Install
**This plug-in does not include the introduction of `vue.js`, please import `vue.js` yourself**

### script tag
Use the `<script>` to import `lib/vue-scroll-div.umd.min.js`
```js
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/vue-scroll-div/lib/vue-scroll-div.umd.min.js"></script>
```
so you can use the `<Scroll-Div>` tag directly in the 'Vue' application.

### npm：
#### vue2 version：
```
npm i vue-scroll-div
```
After the plug-in is introduced, the component must be registered.
```js
import Vue from 'vue';
import ScrollDiv from 'vue-scroll-div';

Vue.use(ScrollDiv);
```

#### vue3 version
```
npm i vue-scroll-div@vue3
```
After install
```js
import ScrollDiv from 'vue-scroll-div'
import { createApp } from 'vue'

const app = createApp(App)
app.use(ScrollDiv)
```

## Usage
This is a simple usage
```html
<Scroll-Div width="400px" height="100px" view-class="yourclassname">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</Scroll-Div>
```
Considering that this component renders two different 'HTML' structures based on the browser's environment, follow these guidelines for styling:

1. Use the `width`, `height`, `padding` properties provided by the component instead of changing the style in CSS.

2. If you want to add additional styles, add the class name using the `view-class` property provided by the component, and then add the style through the class name.

If you really don't want to go either way, keep an eye on the structure rendered by the component when you add styles, as the case may be.

Set some 'prop' properties globally for all components, such as setting some styles for custom scrollbars:

```js
import Vue from 'vue'
import ScrollDiv from 'vue-scroll-div'

Vue.use(ScrollDiv, {
  barStyle: {
    backgroundColor: 'pink', // scrollbar color
  },
  size: 6, // scrollbar size
  offset: 2 // scrollbar offset
})
```

> Note: when you find hidden native scrolling appearing during use, please check that you have set or correctly set the container width and height

## Props
The plug-in provides several props
- `height`：Optional. Set the height of the container to 'Number' or 'String' type, in 'px' units when a numeric type is passed in. This value is not set by default.
- `width`：Optional. Set the width of the container to 'Number' or 'String' type, in 'px' units when a numeric type is passed in. This value is not set by default.
- `padding`：Optional. Set the padding of the container to 'String' type, just like the 'padding' property of 'CSS'. This value is not set by default.
- `useNative`：Optional. For browsers whose scrollbar area occupies the space of the content itself (such as most browsers on the window system), if the browser is' webkit 'kernel, you can use the' CSS 'style to change the native scrollbar style. If this value is set to 'true', then 'CSS' is enabled to change the scrollbar style; otherwise, a custom scrollbar is used. It is recommended that this item be enabled to improve performance and reduce dom structure.
- `viewClass`：Optional. Set the content container class name. In addition to 'width', 'height', 'padding' properties, it is recommended to use this value to specify the class name for style modification.
- `optimize`: Optional. `Boolean` type. The problem that padding-bottom doesn't work in a custom scrollbar container in Firefox or Internet Explorer renders an extra element, so the default is' true ', which only works for Firefox or Internet Explorer.However, there is a case that if there is a container inside the 'scroll-div' container with the height set, the content overflows but 'overflow' is not set. In this case, the repair effect of 'padding-bottom' may not be good enough.
- `scroll`: Optional. `Function` type. Pass a function that binds the scroll event listener as a scroll container, the first parameter of which is the 'event' object that represents the triggering event

Note that the following properties only apply to custom scrollbars, not to native scrollbars

- `barStyle`：Optional. `Object` type, Set the various styles of the custom scrollbar, pass in the CSS properties of the object, the value of the form is used in the Vue tag `:style`. It is common to set the color of the scroll bar, so the value is `{backgroundColor: 'pink'}`.
- `size`：Optional. Set the size of the scroll bar, 'Number' or 'String' type, in 'px' units when a numeric type is passed in. This value is not set by default. If you pass 8 in, the vertical scroll bar width is 8px and the horizontal scroll bar height is 8px.In general, the value of this property will also affect the `border-radius` value of the scroll bar, which is equivalent to this value.If the user has special requirements, you can set another `border-radius` style for overwriting, or you can use the above  `barStyle`
- `offset`：Optional. The offset value of the scroll bar from the page boundary, 'Number' or 'String' type, in 'px' units when a numeric type is passed in. This value is not set by default. If 2 is passed in, the vertical scroll bar is 2px from the right edge of the page, and the horizontal scroll bar is 2px from the bottom edge of the page
- `awaysShowScroll`：Sets whether the scroll bar is always displayed and does not disappear (except in the case of no scroll), `Boolean` type，default value is `false`. Since the scroll bar used to appear only when scrolling, the length ratio of the scroll bar was re-calculated based on various height indicators of the container, so this is not a problem.But now become permanent, because of the content will change, which affect the ratio of the length of the scroll bar, for the moment, the method can only provide a ` updateScrollBar ` exposed to the user, the user in the content change or change the page size need to take the initiative to call this method as well as changes to the scroll bar length scale or whether the display.This mechanism of how to listen for changes can be optimized later.
- `zIndex`：Set the `z-index` css style of the scrollbar. `Number` type. By default, there is a hierarchy value calculated by the component itself, which you can manually pass for control if you feel it is not appropriate.
## Methods
### scrollTo
You can specify where the scroll container should scroll to, and accept two params:
- `yPosition`: Number / String. Specifying the vertical scrolling position is equivalent to setting 'scrollTop', which only works if it is equal to 'top' when it is of String type and will scroll to the top
- `xPosition`: Number / String. Specifying the position of horizontal scrolling is equivalent to setting 'scrollLeft', which only works if it is equal to 'left' when it is of String type, and will scroll to the far left

### updateScrollBar
When set the `awaysShowScroll: true`, in the custom scrollbar resident scenario, the user needs to actively call this method when the content changes or the page size changes and change the scrollbar length ratio or whether to display.This mechanism of how to listen for changes can be optimized later.

## Support us
The component may still be lacking, or you may be using it in a broader context, and if you are interested, you can work together to improve the component. Looking forward to your joining us

[github](https://github.com/pekonchan/ScrollDiv)

Any questions are welcome.

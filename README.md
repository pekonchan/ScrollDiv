# vue-scroll-div

[中文版说明](https://github.com/pekonchan/ScrollDiv/blob/master/lang/readme_cn.md)

## Description
This is the scroll container component based on `vue.js`. This component is designed for, when the container need to show the scrollbar, it will show the scrollbar like that in mac os. Because of the scrollbar in Windows broswers is ugly.

You can use this component instead of the html like `div`.

## Feature
- For most browsers on `MAC` systems, native scrollbars are used, and components end up being rendered as a 'div' tag. Reason:
    - The MAC's native scrollbar itself is nice and interactive, and doesn't require a custom scrollbar
    - Custom scrollbars render several nested structures, it will adding DOM, so it's no neccessary to use them.
- The scrollbar area does not occupy the space of the content itself (such as the browser of the MAC system, which is a special case), so the scheme is not simply to determine whether the system is' MAC '. Due to the implementation problems of the scheme, the scrollbar of this type of browser is not customized, and this type of browser is relatively rare in the window system (not encountered yet). So don't add to the complexity of the solution by dealing with these few cases. Also rendered as a 'div' tag.
- For browsers other than the above two cases, the browser is generally the 'window' system browser, if it is the 'webkit' kernel browser, the component will use the '-webkit-scrollbar' and other CSS methods to customize the native scrollbar style, the final rendering as a 'div' tag. This option is optional for the user.
- In addition to the above, custom scrollbar methods are used to render different results in different cases, which can be the most simple way to satisfy the beautiful scrollbar style.
- The component contains horizontal and vertical scroll bars

In short, the component takes the "best" approach, with the simplest rendering structure and the best component performance, provided the scrollbar style is significant.

## Install
** This plug-in does not include the introduction of `vue.js`, please import `vue.js` yourself **

### script tag
Use the `<script>` to import `lib/vue-scroll-nav.umd.min.js`
```js
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="node_modules/vue-scroll-nav/lib/vue-scroll-nav.umd.min.js"></script>
```
so you can use the '<Scroll-Div>' tag directly in the 'Vue' application.

### npm：
```
npm i vue-scroll-div
```
After the plug-in is introduced, the component must be registered.
```js
import Vue from 'vue';
import ScrollDiv from 'vue-scroll-div';

Vue.use(ScrollDiv);
```

## Usage
This is a simple usage
```html
<Scroll-Div width="400px" height="100px" view-class="yourclassname">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!
</Scroll-Div>
```
It is best to use the props of `width`, `height`, `padding` provided by the component to set the width, height and padding, rather than restyle the CSS yourself；

If you really want to override styles or add other styles in `CSS`, add the class name using the `view-class` prop provided by the component, and then add styles by class name.

If you really don't want to go either way, keep an eye on the structure of the component rendering as you add styles, depending on the situation. Because this component renders two different 'HTML' structures depending on the browser's environment.

## Props
The plug-in provides several props
- `height`：Optional. Set the height of the container to 'Number' or 'String' type, in 'px' units when a numeric type is passed in. This value is not set by default.
- `width`：Optional. Set the width of the container to 'Number' or 'String' type, in 'px' units when a numeric type is passed in. This value is not set by default.
- `padding`：Optional. Set the padding of the container to 'String' type, just like the 'padding' property of 'CSS'. This value is not set by default.
- `useNative`：Optional. For browsers whose scrollbar area occupies the space of the content itself (such as most browsers on the window system), if the browser is' webkit 'kernel, you can use the' CSS 'style to change the native scrollbar style. If this value is set to 'true', then 'CSS' is enabled to change the scrollbar style; otherwise, a custom scrollbar is used. It is recommended that this item be enabled to improve performance and reduce dom structure.
- `viewClass`：Optional. Set the content container class name. In addition to 'width', 'height', 'padding' properties, it is recommended to use this value to specify the class name for style modification.

## Support us
The component may still be lacking, or you may be using it in a broader context, and if you are interested, you can work together to improve the component. Looking forward to your joining us

[github](https://github.com/pekonchan/scrollNav)

Any questions are welcome.
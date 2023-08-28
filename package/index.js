import ScrollDiv from './src/index.vue';

ScrollDiv.install = (Vue, opts) => {
    for (const key in opts) {
        if (Object.prototype.hasOwnProperty.call(opts, key)) {
            ScrollDiv.props[key].default = () => opts[key]
        }
    }
    Vue.component(ScrollDiv.name, ScrollDiv);
};

if (window && window.Vue) {
    ScrollDiv.install(window.Vue);
}

console.log('🚀 ~ file: index.js:17 ~ ScrollDiv:', ScrollDiv);
export default ScrollDiv

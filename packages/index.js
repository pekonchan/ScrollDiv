import ScrollDiv from './src';

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

export default ScrollDiv
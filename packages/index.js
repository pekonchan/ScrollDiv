import ScrollDiv from './src';

ScrollDiv.install = (Vue) => {
    Vue.component(ScrollDiv.name, ScrollDiv);
};

if (window && window.Vue) {
    ScrollDiv.install(window.Vue);
}

export default ScrollDiv
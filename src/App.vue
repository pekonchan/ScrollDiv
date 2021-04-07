<template>
  <div id="app">
    <!-- <Scroll-Div width="500px" class="my-scroll-div" view-class="myview" :scroll="handleScroll" awaysShowScroll>
      <div style="width: 1000px;height: 30px;background: pink"></div>
      <div v-for="(item, index) in contents" :key="index">{{item.label}}</div>
    </Scroll-Div>

    <Scroll-Div class="my-scroll-div" view-class="myview">
      <div style="width: 1000px;height: 30px;background: pink"></div>
      <div v-for="(item, index) in contents" :key="index">{{item.label}}</div>
    </Scroll-Div>

    <Scroll-Div ref="scrollTopExam" height="200px" class="my-scroll-div" view-class="myview" :useNative="false" :awaysShowScroll="true" :scroll="handleScroll">
      <div style="width: 1000px;height: 30px;background: pink"></div>
      <div v-for="(item, index) in contents" :key="index">{{item.label}}</div>
    </Scroll-Div>
    <button @click="scrollToTop">scroll to top</button>

    <Scroll-Div width="500px" height="200px" class="my-scroll-div" view-class="myview">
      <div style="width: 1000px;height: 30px;background: pink"></div>
      <div v-for="(item, index) in contents" :key="index">{{item.label}}</div>
    </Scroll-Div>

    <Scroll-Div padding="30px" class="my-scroll-div" view-class="myview">
      <div style="width: 1000px;height: 30px;background: pink"></div>
      <div v-for="(item, index) in contents" :key="index">{{item.label}}</div>
    </Scroll-Div>

    <Scroll-Div width="500px" padding="30px" class="my-scroll-div" view-class="myview">
      <div style="width: 1000px;height: 30px;background: pink"></div>
      <div v-for="(item, index) in contents" :key="index">{{item.label}}</div>
    </Scroll-Div>

    <Scroll-Div height="200px" padding="30px" class="my-scroll-div" view-class="myview">
      <div style="width: 100px;height: 30px;background: pink"></div>
      <div v-for="(item, index) in contents" :key="index">{{item.label}}</div>
    </Scroll-Div> -->

    <Scroll-Div :useNative="false" :awaysShowScroll="false" :barStyle="{backgroundColor: 'gray'}">
      <Scroll-Div ref="test" height="200px" padding="30px" view-class="myview" :useNative="false" :awaysShowScroll="false">
        <span v-for="(item, index) in 300" :key="index">{{item}}</span>
      </Scroll-Div>
    </Scroll-Div>
    
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      contents: [
        {
          label: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis quas nobis praesentium nisi deserunt, fuga libero, error quia vero nulla corporis odio fugit atque et accusamus numquam. Tempora, qui numquam!'
        },
        {
          label: '导航2'
        },
        {
          label: '导航3'
        },
        {
          label: '导航2'
        },
        {
          label: '导航3'
        },
        {
          label: '导航2'
        },
        {
          label: '导航3'
        },
        {
          label: '导航2'
        },
        {
          label: '导航3'
        },
        {
          label: '导航2'
        },
        {
          label: '导航3'
        },
        {
          label: '导航2'
        },
        {
          label: '导航3'
        }
      ]
    };
  },
  methods: {
    handleScroll () {
      // console.log('handleScroll -> target', el.target);
      // console.log('scrolling')
    },
    scrollToTop () {
      this.$refs.scrollTopExam.scrollTo('top')
    }
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.$nextTick(() => {
        this.$refs.test.updateScrollBar()
      })
    })
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    padding-top: 24px;
    background-color: #f5f6fa;
  }
  .my-scroll-div {
    margin-bottom: 24px;
  }
  .myview {
    background-color: #fff;
    word-break: break-all;
  }
</style>
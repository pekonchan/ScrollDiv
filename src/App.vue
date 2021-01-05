<template>
  <div id="app">
    <Scroll-Div width="500px" class="my-scroll-div" view-class="myview">
      <div style="width: 1000px;height: 30px;background: pink"></div>
      <div v-for="(item, index) in contents" :key="index">{{item.label}}</div>
    </Scroll-Div>

    <Scroll-Div class="my-scroll-div" view-class="myview">
      <div style="width: 1000px;height: 30px;background: pink"></div>
      <div v-for="(item, index) in contents" :key="index">{{item.label}}</div>
    </Scroll-Div>

    <Scroll-Div height="200px" class="my-scroll-div" view-class="myview">
      <div style="width: 1000px;height: 30px;background: pink"></div>
      <div v-for="(item, index) in contents" :key="index">{{item.label}}</div>
    </Scroll-Div>

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
    </Scroll-Div>
  </div>
</template>

<script>
import ScrollDiv from '../packages';

export default {
  name: 'App',
  components: {
    ScrollDiv
  },
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
  }
</style>
<template>
  <div id="app">
    <Scroll-Div width="400px" height="100px" padding="20px" view-class="myview">
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
  .myview {
    background-color: #fff;
  }
</style>
<template>
  <transition name="log">
      <p class="mine-log" v-text="content"></p>
  </transition>
</template>

<script>
  export default {
    name: 'MeLog',
    props: {
      content: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .mine-log {
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -75px;
    margin-top: -25px;
    width: 150px;
    height: 50px;
    border-radius: 5px;
    background: rgba(0,0,0,.8);
    color: #fff;
    @include flex-center();
    z-index: 99;
    font-size: 14px;
  }
  .log{
    &-enter-active,
    &-leave-active {
      transition:  opacity .5s;
    }
    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }

</style>

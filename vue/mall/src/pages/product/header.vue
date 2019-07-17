<template>
  <me-navbar title="商品详情" class="header">
    <i class="iconfont icon-back" slot="left" @click="goBack"></i>
    <i class="iconfont icon-cart" slot="right" @click="goToCart"></i>
  </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  export default {
    name: 'ProductHeader',
    components: {
      MeNavbar
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      goToCart() {
        this.$router.push('/cart');
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .header {
    &.mine-navbar {
      background: $header-bgc-translucent;
      color: #fff;
    }
  }
</style>

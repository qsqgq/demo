<template>
  <transition name="product">
    <div class="product">
      <header class="g-header-container">
        <product-header></product-header>
      </header>
      <me-scroll ref="scroll">
          <product-slider></product-slider>
          <product-details @loaded="updateScroll"></product-details>
        </me-scroll>
      <div class="g-footer-container">
        <product-tabbar></product-tabbar>
      </div>
    </div>
  </transition>
</template>

<script>
  import MeScroll from 'base/scroll';
  import ProductHeader from './header';
  import ProductSlider from './slider';
  import ProductDetails from './details';
  import ProductTabbar from './tabbar';

  export default {
    name: 'Product',
    components: {
      MeScroll,
      ProductHeader,
      ProductSlider,
      ProductDetails,
      ProductTabbar
    },
    methods: {
      getCurrentId(id) {
        this.curId = id;
      },
      updateScroll() {
        this.$refs.scroll && this.$refs.scroll.update();
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .product {
    overflow: hidden;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $product-z-index;
    background: $bgc-theme;
  }
  .product-enter-active,
  .product-leave-active {
    transition: all .3s;
  }
  .product-enter,
  .product-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>

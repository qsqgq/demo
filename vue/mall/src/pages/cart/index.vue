<template>
    <div class="cart">
      <header class="g-header-container">
        <cart-header></cart-header>
      </header>
      <div class="g-content-container">
          <me-scroll ref="scroll">
            <cart-content @remove-item="updateScroll"></cart-content>
          </me-scroll>
      </div>
    </div>
</template>

<script>
  import MeScroll from 'base/scroll';
  import CartHeader from './header';
  import CartContent from './content';
  export default {
    name: 'Cart',
    components: {
      MeScroll,
      CartHeader,
      CartContent
    },
    methods: {
      updateScroll() {
        this.$refs.scroll && this.$refs.scroll.update();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .cart{
    overflow: hidden;
    width: 100%;
    height:100%;
    position: relative;
  }
  .tips{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 100px;
    border-radius: 5px;
    background: rgba(0, 0, 0, .5);
    color: #fff;
    font-size: 16px;
  }
  .reduce-enter-active,
  .reduce-leave-active {
    transition: opacity  0.5s;
  }
  .reduce-enter,
  .reduce-leave-to{
    opacity: 0;
  }

</style>

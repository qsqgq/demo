<template>
    <me-navbar class="header" title="购物车">
      <i class="iconfont icon-msg" slot="right"></i>
    </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  export default {
    name: 'CartHeader',
    components: {
      MeNavbar
    }
  };
</script>

<style lang="scss" scoped>
  .header {
    &.mine-navbar{
      border-bottom: 1px solid #eee;
    }
  }
</style>

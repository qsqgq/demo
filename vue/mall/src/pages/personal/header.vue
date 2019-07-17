<template>
    <me-navbar class="header" title="我的慕淘">
      <div class="iconWrap" slot="right">
        <i class="iconfont icon-setting"></i>
        <i class="iconfont icon-msg"></i>
      </div>
    </me-navbar>
</template>

<script>
  import MeNavbar from 'base/navbar';
  export default {
    name: 'PersonalHeader',
    components: {
      MeNavbar
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .header{
   &.mine-navbar {
     background: $header-bgc-translucent;
     color: $icon-color-default;
    }
  }

</style>

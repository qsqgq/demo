<template>
    <div class="personal">
      <header class="g-header-container">
        <personal-header></personal-header>
      </header>
      <div class="g-content-container">
        <me-scroll>
          <personal-signin></personal-signin>
          <personal-order></personal-order>
          <personal-assets></personal-assets>
          <personal-service></personal-service>
          <p class="personal-text">客服热线400-123-8888（8:00-22:00）</p>
          <p class="personal-content">拨打前请记录您的UID 0</p>
        </me-scroll>
      </div>
    </div>
</template>

<script>
  import PersonalHeader from './header';
  import PersonalSignin from './signin';
  import PersonalOrder from './order';
  import MeScroll from 'base/scroll';
  import PersonalAssets from './assets';
  import PersonalService from './service';
  export default {
    name: 'Personal',
    components: {
      PersonalHeader,
      PersonalSignin,
      MeScroll,
      PersonalOrder,
      PersonalAssets,
      PersonalService
    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .personal {
    overflow:hidden;
    width:100%;
    height:100%;
    background-color: $bgc-theme;
    padding-bottom: 10px;
  }
  .personal-text {
    margin-top: 25px;
    margin-bottom: 5px;
  }
  .personal-text,
  .personal-content {
    text-indent: 20px;
    font-size: 14px;
    color: $icon-color;
  }
</style>

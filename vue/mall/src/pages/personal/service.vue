<template>
  <div class="service">
    <ul class="service-list">
      <li class="service-item">
        <div class="service-wrap">
          <i class="iconfont icon-service"></i>
          售后服务
        </div>
        <i class="iconfont icon-back"></i>
      </li>
      <li class="service-item">
        <div class="service-wrap">
          <i class="iconfont icon-msg"></i>
          意见反馈
        </div>
        <i class="iconfont icon-back"></i>
      </li>
      <li class="service-item">
        <div class="service-wrap">
          <i class="iconfont icon-search"></i>
          收货地址
        </div>
        <i class="iconfont icon-back"></i>
      </li>
      <li class="service-item">
        <div class="service-wrap">
          <i class="iconfont icon-close"></i>
          退出登录
        </div>
        <i class="iconfont icon-back"></i>
      </li>
      <li class="service-item">
        <div class="service-wrap">
          <i class="iconfont icon-clear"></i>
          400-123-8888
        </div>
        <i class="iconfont icon-back"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'PersonalService'
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .service {
    width: 100%;
    height: 280px;
    background: #fff;
    margin-top: 20px;
    &-item {
      width: 100%;
      height: 56px;
      display: flex;
      @include flex-between();
      font-size: 16px;
      color: #000;
      border-bottom: 1px solid $border-color;
      .iconfont {
        font-size: 26px;
        margin: 0 10px 0 15px;
        color: $icon-color;
      }
    }
  }
</style>

<template>
    <div class="assets">
      <div class="mine-assets">
        <i class="iconfont icon-home"></i>
        我的资产
      </div>
      <div class="assets-item">
        <span>现金券</span>
        <span>红包</span>
        <span>余额</span>
        <span>礼品卡</span>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'PersonalAssets'
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .assets {
    margin-top: 20px;
    width: 100%;
    height: 100px;
    background: #fff;
    .mine-assets {
      width: 100%;
      height: 44px;
      border-bottom: 1px solid $border-color;
      font-size: 16px;
      font-weight: bold;
      color: #000;
      line-height: 44px;
      .iconfont {
        margin: 0 10px 0 15px;
        color: $icon-color;
        font-size: 20px;
      }
    }
    .assets-item{
      width: 100%;
      height: 55px;
      display: flex;
      @include flex-center();
      justify-content: space-around;
      font-size: 16px;
    }
  }
</style>

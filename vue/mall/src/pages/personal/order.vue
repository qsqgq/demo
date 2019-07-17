<template>
    <div class="order">
      <div class="mine-order-wrap">
        <div class="mine-order">
          <i class="iconfont icon-category"></i>
          我的订单
        </div>
        <div class="all-order">
          查看我的全部订单
          <i class="iconfont icon-back"></i>
        </div>
      </div>
      <div class="order-list">
        <div class="order-item">
          <i class="iconfont icon-delete"></i>
          <span>待付款</span>
        </div>
        <div class="order-item">
          <i class="iconfont icon-setting"></i>
          <span>待收款</span>
        </div>
        <div class="order-item">
          <i class="iconfont icon-msg"></i>
          <span>待评价</span>
        </div>
        <div class="order-item">
          <i class="iconfont icon-shop"></i>
          <span>退款/退货</span>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'PersonalOrder'
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .order {
    margin-top: 20px;
    background: #fff;
    height: 150px;
    width: 100%;
    .mine-order-wrap {
      width: 100%;
      height: 44px;
      border-bottom: 1px solid $border-color;
      @include flex-between();
      .mine-order {
        margin-left: 15px;
        font-size: 16px;
        font-weight: bold;
        color: #000;
        .iconfont {
          font-size: 20px;
          font-weight: normal;
          color: $icon-color;
          margin-right: 10px;
        }
      }
      .all-order {
        margin-right: 15px;
        font-size: 14px;
        color: $icon-color;
      }
    }
    &-list {
      width: 100%;
      height: 105px;
      display: flex;
      justify-content: space-around;
      .order-item {
        display: flex;
        @include flex-center(column);
        font-size: 16px;
        .iconfont {
          font-size: 22px;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>

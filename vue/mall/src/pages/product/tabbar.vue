<template>
    <div class="tabbar">
      <ul class="tabbar-list">
        <li class="tabbar-item">
          <i class="iconfont icon-shop"></i>
          <span>店铺</span>
        </li>
        <li class="tabbar-item">
          <i class="iconfont icon-service"></i>
          <span>客服</span>
        </li>
        <li class="tabbar-item">
          <i class="iconfont icon-scan"></i>
          <span>收藏</span>
        </li>
      </ul>
      <div class="tabbar-cart" @click="addCart">加入购物车</div>
      <div class="tabbar-buy">马上抢</div>
      <me-log v-if="added" content="宝贝已加入购物车"></me-log>
    </div>
</template>

<script>
  import MeLog from 'base/log';
  export default {
    name: 'ProductTabbar',
    components: {
      MeLog
    },
    data() {
      return {
        added: false
      };
    },
    methods: {
      addCart() {
        this.added = true;
        setTimeout(() => {
          this.added = !this.added;
        }, 1000);
      }

    }
  };
</script>

<style lang="scss" scoped>
  @import "~assets/scss/mixins";
  .tabbar{
    width: 100%;
    background: #fff;
    display: flex;
    height: $tabbar-height;
    &-list {
      display: flex;
      flex: 1.5;
      justify-content: space-around;
    }
    &-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 12px;
      .iconfont {
        font-size: 22px;
      }
    }
    &-buy,
    &-cart {
      color: #fff;
      flex: 1;
      text-align: center;
      line-height: 50px;
      font-size: 14px;
    }
    &-cart{
      background: #ffc52c;
    }
    &-buy {
      background: #ff076f;
    }
  }
</style>
